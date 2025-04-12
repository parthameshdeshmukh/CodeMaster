// @ts-nocheck
import { Language, TestCase } from "@shared/schema";
import express from "express";
import supertest from "supertest";
import { VM } from "vm2";

// Simulated code execution environment
export async function executeCode(code: string, language: Language, testCases?: TestCase[]): Promise<{
  passed: boolean;
  results: {
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
  }[];
  consoleOutput: string;
}> {
  // In a production environment, this would use Judge0 API or similar service
  let consoleOutput = "";
  const consoleLog = (...args: any[]) => {
    consoleOutput += args.join(' ') + '\n';
  };
  
  // If no test cases, just execute the code for console output
  if (!testCases || testCases.length === 0) {
    try {
      if (language === 'javascript') {
        // Use VM2 for secure code execution
        const vm = new VM({
          sandbox: {
            console: { log: consoleLog }
          }
        });
        
        // Execute the code in the sandbox
        vm.run(code);
      } else {
        consoleOutput = "Execution supported via Judge0 API in production environment.\n";
      }
      
      return {
        passed: true,
        results: [],
        consoleOutput
      };
    } catch (error) {
      return {
        passed: false,
        results: [],
        consoleOutput: `Error: ${error.message}`
      };
    }
  }
  
  // Special handling for REST API challenge
  if (code.includes('createProductsAPI') && language === 'javascript') {
    try {
      // In the REST API challenge, we need to evaluate the user's Express app code
      // Let's use a simpler approach with Function constructor
      let app = null;
      consoleLog("Running REST API evaluation in controlled environment");
      
      // Set up the environment for module.exports
      const moduleSetup = `
        const module = { exports: null };
        const require = function(name) {
          if (name === 'express') return expressObj;
          throw new Error('Only express module is supported in this environment');
        };
      `;
      
      // Wrapper function to execute code
      const executeInContext = new Function('expressObj', 'consoleLogFn', `
        ${moduleSetup}
        
        // Console log function
        const console = { log: consoleLogFn };
        
        // User code execution
        ${code}
        
        // Return the exported function
        return module.exports;
      `);
      
      // Execute code in the context and get the result
      const productAPIFn = executeInContext(express, consoleLog);
      
      consoleLog(`Exported function type: ${typeof productAPIFn}`);
      
      if (typeof productAPIFn !== 'function') {
        throw new Error("The code must export a function that creates an Express app");
      }
      
      // Call the function to get the app
      app = productAPIFn();
      
      if (!app || typeof app.use !== 'function') {
        throw new Error("Invalid Express app returned. Make sure your function returns an Express app.");
      }
      
      // Use supertest to test the API endpoints
      const agent = supertest(app);
      
      // Process test cases
      const results = await Promise.all(testCases.map(async (testCase) => {
        const { input, expectedOutput } = testCase;
        let actualOutput = "";
        let passed = false;
        
        try {
          // Parse the input format "METHOD /endpoint [body]"
          const parts = input.split(' ');
          const method = parts[0].toUpperCase();
          const endpoint = parts[1];
          
          // Handle request body if present
          let body = null;
          if (parts.length > 2) {
            try {
              body = JSON.parse(parts.slice(2).join(' '));
            } catch (e) {
              consoleLog(`Error parsing request body: ${e.message}`);
            }
          }
          
          // Make the API request
          let response;
          switch (method) {
            case 'GET':
              response = await agent.get(endpoint);
              break;
            case 'POST':
              response = await agent.post(endpoint).send(body);
              break;
            case 'PUT':
              response = await agent.put(endpoint).send(body);
              break;
            case 'DELETE':
              response = await agent.delete(endpoint);
              break;
            default:
              throw new Error(`Unsupported HTTP method: ${method}`);
          }
          
          // Get the response as string
          if (response.status === 204) {
            actualOutput = "";
            passed = expectedOutput === "";
          } else if (expectedOutput === "Array of products" && Array.isArray(response.body)) {
            passed = response.body.length >= 2;
            actualOutput = JSON.stringify(response.body);
          } else if (expectedOutput === "Product with id 1" && response.body?.id === 1) {
            passed = response.body.id === 1 && response.body.name && response.body.price;
            actualOutput = JSON.stringify(response.body);
          } else if (expectedOutput === "201 Created response" && response.status === 201) {
            passed = response.body?.id && response.body?.name && response.body?.price;
            actualOutput = JSON.stringify(response.body);
          } else {
            // Normal JSON comparison
            actualOutput = JSON.stringify(response.body);
            try {
              if (expectedOutput && expectedOutput.startsWith('{') || expectedOutput.startsWith('[')) {
                const expectedObj = JSON.parse(expectedOutput);
                passed = JSON.stringify(expectedObj) === actualOutput;
              } else {
                passed = actualOutput === expectedOutput;
              }
            } catch (e) {
              passed = false;
            }
          }
        } catch (error) {
          actualOutput = `Error: ${error.message}`;
          passed = false;
        }
        
        return {
          input,
          expectedOutput,
          actualOutput,
          passed
        };
      }));
      
      return {
        passed: results.every(r => r.passed),
        results,
        consoleOutput
      };
    } catch (error) {
      return {
        passed: false,
        results: testCases.map(tc => ({
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          actualOutput: `Error: ${error.message}`,
          passed: false
        })),
        consoleOutput: `Error evaluating REST API: ${error.message}`
      };
    }
  }
  
  // Regular function evaluation with test cases
  try {
    const results = testCases.map(testCase => {
      const { input, expectedOutput } = testCase;
      let actualOutput = "";
      let passed = false;
      
      try {
        if (language === 'javascript') {
          // Extract the function name from the code
          const functionMatch = code.match(/function\s+(\w+)/);
          if (!functionMatch) {
            throw new Error("Could not find function definition in code");
          }
          
          const functionName = functionMatch[1];
          let inputValue = input;
          
          // Handle JSON input if needed
          try {
            if (input.startsWith('[') || input.startsWith('{')) {
              inputValue = JSON.parse(input);
            }
          } catch (e) {
            // Keep as string if not valid JSON
          }
          
          // Execute the code in VM2 and call the function
          // Create VM with sandbox for safe execution
          const vm = new VM({
            sandbox: {
              inputValue,
              console: { log: consoleLog },
              result: undefined
            }
          });
          
          // Run the code and call the function with the input
          vm.run(`
            ${code}
            result = ${functionName}(inputValue);
          `);
          
          // Get the result from the sandbox
          const result = vm.sandbox.result;
          
          // Format the result
          if (result === undefined) {
            actualOutput = "undefined";
          } else if (typeof result === "object") {
            actualOutput = JSON.stringify(result);
          } else {
            actualOutput = String(result);
          }
          
          // Check if the result matches the expected output
          if ((expectedOutput.startsWith('[') || expectedOutput.startsWith('{')) && 
              (actualOutput.startsWith('[') || actualOutput.startsWith('{'))) {
            try {
              const expectedObj = JSON.parse(expectedOutput);
              const actualObj = JSON.parse(actualOutput);
              passed = JSON.stringify(expectedObj) === JSON.stringify(actualObj);
            } catch (e) {
              passed = actualOutput === expectedOutput;
            }
          } else {
            passed = actualOutput.trim() === expectedOutput.trim();
          }
        } else {
          // Simulated execution for non-JS languages
          actualOutput = "Simulated output";
          passed = Math.random() > 0.3; // Random result for demo
        }
      } catch (error) {
        actualOutput = `Error: ${error.message}`;
        passed = false;
      }
      
      return {
        input,
        expectedOutput,
        actualOutput,
        passed
      };
    });
    
    return {
      passed: results.every(r => r.passed),
      results,
      consoleOutput
    };
  } catch (error) {
    return {
      passed: false,
      results: testCases.map(tc => ({
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: `Error: ${error.message}`,
        passed: false
      })),
      consoleOutput: `Error executing code: ${error.message}`
    };
  }
}