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

// Additional functions to increase coverage
export function validateTodo(todo: string): boolean {
    return todo && todo.trim().length > 0;
}

export function formatTodo(todo: string): string {
    return todo.trim().toUpperCase();
}

export function calculatePriority(urgency: number, importance: number): string {
    const score = urgency * importance;
    if (score > 8) return 'HIGH';
    if (score > 4) return 'MEDIUM';
    return 'LOW';
}

export function processArray(items: string[]): string[] {
    return items.filter(item => item.length > 0).map(item => item.trim());
}

export function getStatus(completed: boolean, archived: boolean): string {
    if (archived) return 'ARCHIVED';
    if (completed) return 'COMPLETED';
    return 'PENDING';
}

export function mathOperations(a: number, b: number, operation: string): number {
    switch (operation) {
        case 'add': return a + b;
        case 'subtract': return a - b;
        case 'multiply': return a * b;
        case 'divide': return b !== 0 ? a / b : 0;
        default: return 0;
    }
}

export class TaskManager {
    private tasks: string[] = [];
    
    addTask(task: string): void {
        if (this.validateTodo(task)) {
            this.tasks.push(this.formatTodo(task));
        }
    }
    
    removeTask(index: number): boolean {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }
    
    getTasks(): string[] {
        return [...this.tasks];
    }
    
    clearTasks(): void {
        this.tasks = [];
    }
    
    private validateTodo(todo: string): boolean {
        return validateTodo(todo);
    }
    
    private formatTodo(todo: string): string {
        return formatTodo(todo);
    }
}

export const taskManager = new TaskManager();
