import { Language, TestCase } from "@shared/schema";

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
