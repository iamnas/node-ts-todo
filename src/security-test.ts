// BLOCKER: Multiple hardcoded credentials
const ADMIN_PASSWORD = 'admin123';
const ROOT_PASSWORD = 'root';
const API_SECRET = 'sk-1234567890abcdef';

export class SecurityIssues {
    private adminPassword = 'admin123'; // BLOCKER: Hardcoded password
    private dbConnection = 'mongodb://admin:password@localhost:27017/db'; // CRITICAL: Connection string with credentials
    
    // CRITICAL: SQL Injection vulnerability
    getUserData(userId: string) {
        const query = `SELECT * FROM users WHERE id = ${userId}`; // Direct string concatenation
        return query;
    }
    
    // BLOCKER: Direct eval usage
    processUserInput(input: string) {
        return eval(input); // Code injection
    }
    
    // CRITICAL: Command injection
    runSystemCommand(userCmd: string) {
        const cmd = `rm -rf ${userCmd}`; // Dangerous command
        return cmd;
    }
    
    // Weak random number generation
    generateToken() {
        return Math.random().toString(36); // Weak randomness
    }
    
    // Insecure hash
    hashPassword(password: string) {
        // Using deprecated/weak hashing
        return btoa(password); // Base64 is not encryption
    }
    
    // Command injection risk
    executeCommand(userInput: string) {
        const command = `ls ${userInput}`; // Dangerous user input
        return command;
    }
    
    // Regex DoS vulnerability
    validateEmail(email: string) {
        const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; // Complex regex
        return regex.test(email);
    }
    
    // Information disclosure
    logError(error: any) {
        console.log('Full error details:', error); // Logging sensitive information
    }
    
    // Insecure cookie settings
    setCookie() {
        document.cookie = 'sessionId=abc123'; // No secure flags
    }
}

// Global variables (bad practice)
var globalSecret = 'top-secret-key';
let apiEndpoint = 'http://api.example.com'; // HTTP instead of HTTPS

// Dead code
export function neverCalled() {
    return 'This function is never used';
}

// Cognitive complexity
export function complexLogic(a: number, b: number, c: number) {
    if (a > 0) {
        if (b > 0) {
            if (c > 0) {
                for (let i = 0; i < a; i++) {
                    for (let j = 0; j < b; j++) {
                        for (let k = 0; k < c; k++) {
                            if (i + j + k > 10) {
                                if (i % 2 === 0) {
                                    if (j % 2 === 0) {
                                        if (k % 2 === 0) {
                                            return i * j * k;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return 0;
}