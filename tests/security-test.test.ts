import { SecurityIssues, neverCalled, complexLogic } from '../src/security-test';

// Mock document for browser APIs
Object.defineProperty(global, 'document', {
    value: {
        cookie: ''
    },
    writable: true
});

// Mock btoa for base64 encoding
Object.defineProperty(global, 'btoa', {
    value: (str: string) => Buffer.from(str).toString('base64'),
    writable: true
});

describe('SecurityIssues', () => {
    let securityIssues: SecurityIssues;
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    beforeEach(() => {
        securityIssues = new SecurityIssues();
        consoleSpy.mockClear();
    });

    afterAll(() => {
        consoleSpy.mockRestore();
    });

    describe('getUserData', () => {
        it('should create SQL query with user input', () => {
            const result = securityIssues.getUserData('123');
            expect(result).toBe('SELECT * FROM users WHERE id = 123');
        });
    });

    describe('processUserInput', () => {
        it('should execute user input using eval', () => {
            const result = securityIssues.processUserInput('2 + 3');
            expect(result).toBe(5);
        });
    });

    describe('runSystemCommand', () => {
        it('should create dangerous system command', () => {
            const result = securityIssues.runSystemCommand('/tmp');
            expect(result).toBe('rm -rf /tmp');
        });
    });

    describe('generateToken', () => {
        it('should generate token using weak randomness', () => {
            const token = securityIssues.generateToken();
            expect(typeof token).toBe('string');
            expect(token.length).toBeGreaterThan(0);
        });
    });

    describe('hashPassword', () => {
        it('should hash password using weak base64', () => {
            const hashed = securityIssues.hashPassword('password123');
            expect(hashed).toBe(btoa('password123'));
        });
    });

    describe('executeCommand', () => {
        it('should create command with user input', () => {
            const result = securityIssues.executeCommand('/home');
            expect(result).toBe('ls /home');
        });
    });

    describe('validateEmail', () => {
        it('should validate email with complex regex', () => {
            expect(securityIssues.validateEmail('test@example.com')).toBe(true);
            expect(securityIssues.validateEmail('invalid-email')).toBe(false);
        });
    });

    describe('logError', () => {
        it('should log full error details', () => {
            const error = { message: 'test error', stack: 'stack trace' };
            securityIssues.logError(error);
            expect(consoleSpy).toHaveBeenCalledWith('Full error details:', error);
        });
    });

    describe('setCookie', () => {
        it('should set insecure cookie', () => {
            securityIssues.setCookie();
            expect(document.cookie).toBe('sessionId=abc123');
        });
    });
});

describe('Global functions', () => {
    describe('neverCalled', () => {
        it('should return expected string', () => {
            expect(neverCalled()).toBe('This function is never used');
        });
    });

    describe('complexLogic', () => {
        it('should handle complex nested logic', () => {
            expect(complexLogic(0, 0, 0)).toBe(0);
            expect(complexLogic(1, 1, 1)).toBe(0);
            // Just test that it returns 0 for most cases
            expect(complexLogic(2, 2, 2)).toBe(0);
        });
    });
});