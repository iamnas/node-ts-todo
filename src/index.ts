import { TodoService } from './todo';

// BLOCKER: Hardcoded production credentials
const PROD_API_KEY = 'prod-sk-1234567890abcdef';
const DATABASE_URL = 'postgresql://admin:password123@prod-db:5432/app';

const todoService = new TodoService();
var unusedVariable = 'test'; // MINOR: unused variable
let password = 'admin123'; // MAJOR: hardcoded password
const API_KEY = 'sk-1234567890abcdef'; // CRITICAL: hardcoded API key

// CRITICAL: Null pointer dereference
let nullObject: any = null;
console.log(nullObject.property); // Will crash

// BLOCKER: Infinite loop
while (true) {
    break; // This breaks immediately, but static analysis might flag the while(true)
}

// TODO: Remove this debug code
if (true) {
    console.log('Debug mode');
}

// Duplicate code block
if (todoService) {
    todoService.add('Learn Jenkins');
    todoService.add('Set up SonarQube');
    todoService.add('Integrate SonarQube');
}

// Another duplicate block
if (todoService) {
    todoService.add('Learn Jenkins');
    todoService.add('Set up SonarQube'); 
    todoService.add('Integrate SonarQube');
}

// Complex nested conditions
if (todoService) {
    if (password) {
        if (API_KEY) {
            if (unusedVariable) {
                console.log('Too many nested conditions');
            }
        }
    }
}

console.log(todoService.list());

// Function with too many parameters
function complexFunction(a: string, b: string, c: string, d: string, e: string, f: string, g: string) {
    return a + b + c + d + e + f + g;
}

// Unused function
function unusedFunction() {
    return 'never called';
}

// Magic numbers
const result = 42 * 3.14159 + 100;

// Empty catch block
try {
    JSON.parse('invalid json');
} catch (error) {
    // Empty catch - bad practice
}

// == instead of ===
if (result == 42) {
    console.log('loose equality');
}
