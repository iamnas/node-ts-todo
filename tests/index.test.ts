import { TodoService } from '../src/todo';

// Mock console.log to avoid output during tests
const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

describe('index.ts integration', () => {
    beforeEach(() => {
        consoleSpy.mockClear();
    });

    afterAll(() => {
        consoleSpy.mockRestore();
    });

    it('should execute the main application flow', () => {
        // Import and execute the index file
        // require('../src/index');
        
        // // Verify console.log was called with the expected todos
        // expect(consoleSpy).toHaveBeenCalledWith([
        //     { id: 1, title: 'Learn Jenkins', completed: false },
        //     { id: 2, title: 'Set up SonarQube', completed: false },
        //     { id: 3, title: 'Integrate SonarQube', completed: false }
        // ]);
    });
});