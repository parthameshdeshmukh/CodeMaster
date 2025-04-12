import { Language, TestCase } from "@shared/schema";
import express, { Request, Response } from "express";
import supertest from "supertest";

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
  // Here we're doing a simplified simulation for demonstration purposes
  
  let consoleOutput = "";
  const consoleLog = (...args: any[]) => {
    consoleOutput += args.join(' ') + '\n';
  };
  
  // If no test cases, just execute the code for console output
  if (!testCases || testCases.length === 0) {
    try {
      // For JavaScript, we can actually evaluate in Node.js
      if (language === 'javascript') {
        // Create a sandboxed environment with console.log
        const sandbox = {
          console: { log: consoleLog }
        };
        
        // Simple sandbox eval (Note: this is NOT secure for production)
        // In a real app, use VM modules or external sandbox services
        const modifiedCode = `
          (function(console) {
            ${code}
          })(sandbox.console);
        `;
        
        eval(modifiedCode.replace('sandbox.console', 'console'));
      } else {
        // For other languages, we'd need to use Judge0 API or similar
        consoleOutput = "Execution supported via Judge0 API in production environment.\n";
        consoleOutput += "Sample output for demonstration purposes.\n";
      }
      
      return {
        passed: true,
        results: [],
        consoleOutput
      };
    } catch (error: any) {
      return {
        passed: false,
        results: [],
        consoleOutput: `Error: ${error.message}`
      };
    }
  }
  
  // Special handling for REST API challenge
  if (code.includes('createProductsAPI') && language === 'javascript') {
    return await evaluateRESTAPI(code, testCases, consoleLog);
  }
  
  // For testing, execute against test cases
  const results = testCases.map(testCase => {
    const { input, expectedOutput } = testCase;
    let actualOutput = "";
    let passed = false;
    
    try {
      // For JavaScript, evaluate the function with input
      if (language === 'javascript') {
        // Prepare input data - convert string arrays/objects to actual JavaScript objects if needed
        let processedInput = input;
        try {
          // If the input looks like a JSON array or object, parse it
          if (input.startsWith('[') || input.startsWith('{')) {
            processedInput = JSON.parse(input);
          }
        } catch (e) {
          // If parsing fails, use the original input string
          processedInput = input;
        }
        
        // Extract function name from code (simple regex approach)
        const funcNameMatch = code.match(/function\s+(\w+)/);
        if (!funcNameMatch) {
          throw new Error("Could not find function in code");
        }
        
        const funcName = funcNameMatch[1];
        
        // Create a sandboxed environment
        const sandbox = {
          console: { log: consoleLog },
          result: null
        };
        
        // Evaluate code in sandbox and call function with input
        const modifiedCode = `
          (function(console) {
            ${code}
            try {
              // Handle different types of inputs
              const processedInput = ${JSON.stringify(processedInput)};
              const inputValue = typeof processedInput === 'string' && 
                (processedInput.startsWith('[') || processedInput.startsWith('{')) ? 
                JSON.parse(processedInput) : processedInput;
              
              sandbox.result = ${funcName}(inputValue);
            } catch (err) {
              sandbox.result = 'Error: ' + err.message;
            }
          })(sandbox.console);
        `;
        
        let result;
        eval(modifiedCode.replace('sandbox.result', 'result').replace('sandbox.console', 'console'));
        
        // Get result
        if (result === undefined) {
          actualOutput = 'Error: result is not defined';
        } else if (typeof result === 'object') {
          // Handle array or object results
          actualOutput = JSON.stringify(result);
        } else {
          actualOutput = String(result);
        }
        
        // Compare with expected output - Handle JSON comparison for arrays/objects
        try {
          // If expected output looks like JSON, do a structured comparison
          if ((expectedOutput.startsWith('[') || expectedOutput.startsWith('{')) &&
              (actualOutput.startsWith('[') || actualOutput.startsWith('{'))) {
            const expectedObj = JSON.parse(expectedOutput);
            const actualObj = JSON.parse(actualOutput);
            passed = JSON.stringify(expectedObj) === JSON.stringify(actualObj);
          } else {
            // Otherwise do a simple string comparison
            passed = actualOutput.trim() === expectedOutput.trim();
          }
        } catch (e) {
          // If JSON parsing fails, fall back to simple string comparison
          passed = actualOutput.trim() === expectedOutput.trim();
        }
      } else {
        // Simulate execution for other languages
        actualOutput = "Simulated output";
        consoleOutput += `Executing ${language} code with input: ${input}\n`;
        passed = Math.random() > 0.3; // Random pass/fail for demonstration
      }
    } catch (error: any) {
      actualOutput = `Error: ${error.message}`;
    }
    
    return {
      input,
      expectedOutput,
      actualOutput,
      passed
    };
  });
  
  // Overall test passed only if all individual tests passed
  const passed = results.every(r => r.passed);
  
  return {
    passed,
    results,
    consoleOutput
  };
}

/**
 * Special evaluation function for the REST API challenge
 */
async function evaluateRESTAPI(code: string, testCases: TestCase[], consoleLog: (...args: any[]) => void): Promise<{
  passed: boolean;
  results: {
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
  }[];
  consoleOutput: string;
}> {
  let consoleOutput = "Testing REST API implementation...\n";
  
  try {
    // Create a sandbox environment with necessary modules
    const sandbox = {
      require: require,
      console: { log: consoleLog, error: consoleLog },
      express: express,
      module: { exports: null }
    };
    
    // Execute the code to get the Express app instance
    const modifiedCode = `
      (function(require, console, express, module) {
        ${code}
      })(sandbox.require, sandbox.console, sandbox.express, sandbox.module);
    `;
    
    // Evaluate the code in our sandbox
    eval(modifiedCode
      .replace('sandbox.require', 'require')
      .replace('sandbox.console', '{log: consoleLog, error: consoleLog}')
      .replace('sandbox.express', 'express')
      .replace('sandbox.module', 'module')
    );
    
    // Get the app instance exported by the module
    const app = typeof module.exports === 'function' ? module.exports() : null;
    
    if (!app || typeof app.use !== 'function') {
      throw new Error("The code did not return a valid Express app instance");
    }
    
    // Create a test agent
    const request = supertest(app);
    
    // Process test cases
    const results = await Promise.all(testCases.map(async (testCase) => {
      const { input, expectedOutput } = testCase;
      let actualOutput = "";
      let passed = false;
      
      // Parse the input to determine what API call to make
      const [method, endpoint, ...restParts] = input.split(' ');
      let body = null;
      
      // If there's a request body, parse it
      if (restParts.length > 0) {
        try {
          body = JSON.parse(restParts.join(' '));
        } catch (e) {
          consoleLog(`Error parsing request body: ${e.message}`);
        }
      }
      
      try {
        // Make the API call based on the method
        let response;
        switch (method) {
          case 'GET':
            response = await request.get(endpoint);
            break;
          case 'POST':
            response = await request.post(endpoint).send(body);
            break;
          case 'PUT':
            response = await request.put(endpoint).send(body);
            break;
          case 'DELETE':
            response = await request.delete(endpoint);
            break;
          default:
            throw new Error(`Unsupported HTTP method: ${method}`);
        }
        
        // Get the response body as JSON string
        actualOutput = response.status === 204 ? "" : JSON.stringify(response.body);
        
        // Check if the response matches the expected output
        if (expectedOutput === "" && response.status === 204) {
          // Special case for DELETE (204 No Content)
          passed = true;
        } else if (expectedOutput === "Array of products" && Array.isArray(response.body)) {
          // Special case for validating array response
          passed = Array.isArray(response.body) && response.body.length >= 2;
          actualOutput = JSON.stringify(response.body);
        } else if (expectedOutput === "Product with id 1" && response.body.id === 1) {
          // Special case for validating product by id
          passed = response.body.id === 1 && response.body.name && response.body.price;
          actualOutput = JSON.stringify(response.body);
        } else if (expectedOutput === "201 Created response" && response.status === 201) {
          // Special case for validating created response
          passed = response.status === 201 && response.body.id && response.body.name && response.body.price;
          actualOutput = JSON.stringify(response.body);
        } else {
          // Standard JSON comparison
          try {
            if (expectedOutput && (expectedOutput.startsWith('[') || expectedOutput.startsWith('{'))) {
              const expectedObj = JSON.parse(expectedOutput);
              passed = JSON.stringify(expectedObj) === actualOutput;
            } else {
              passed = actualOutput === expectedOutput;
            }
          } catch (e) {
            consoleLog(`Error comparing outputs: ${e.message}`);
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
    
    // Overall test passed only if all individual tests passed
    const passed = results.every(r => r.passed);
    
    return {
      passed,
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
