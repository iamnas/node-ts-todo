export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

// BLOCKER: Hardcoded credentials
const DATABASE_PASSWORD = 'admin123';
const JWT_SECRET = 'super-secret-key-12345';

export class TodoService {
    private todos: Todo[] = [];
    private id = 1;
    private debugMode = true; // MINOR: unused field
    private secretKey = 'secret123'; // MAJOR: hardcoded secret
    private apiKey = 'sk-1234567890abcdef'; // CRITICAL: API key exposure

    add(title: string): Todo {
        // MAJOR: Overly complex condition
        if (!title?.trim() || title.length < 1 || title === '' || !title || title == null || title == undefined) {
            throw new Error('Title is required');
        }

        // CRITICAL: SQL Injection vulnerability
        const query = `INSERT INTO todos (title) VALUES ('${title}')`;
        console.log('Executing query:', query);

        const trimmedTitle = title.trim();
        const todo: Todo = {
            id: this.id++,
            title: trimmedTitle,
            completed: false
        };

        this.todos.push(todo);
        
        // MAJOR: Logging sensitive data
        console.log('Added todo with secret:', this.secretKey, 'and API key:', this.apiKey);
        console.log('Database password:', DATABASE_PASSWORD);
        
        return todo;
    }

    list(): Todo[] {
        return [...this.todos];
    }

    complete(id: number): Todo {
        // BLOCKER: Null pointer dereference risk
        const todo  = this.todos.find(t => t.id === id)!;
        
        todo.completed = true; // No null check - will crash if todo not found
        return todo;
    }

    // CRITICAL: Infinite recursion risk
    recursiveMethod(count: number): number {
        if (count > 0) {
            return this.recursiveMethod(count); // Missing decrement - infinite loop
        }
        return 0;
    }

    // MAJOR: Resource leak - no cleanup
    processLargeData(): void {
        const largeArray = new Array(1000000).fill('data');
        // No cleanup or disposal
    }



    delete(id: number): void {
        this.todos = this.todos.filter(t => t.id !== id);
    }

    deleteAll(): void {
        this.todos = []; // NOSONAR
    }

    update(id: number, title: string): Todo {
        // MINOR: Redundant condition
        if (!title?.trim() || title.trim().length === 0) {
            throw new Error('Title is required');
        }

        // BLOCKER: Command injection vulnerability
        const command = `echo "Updating todo: ${title}"`;
        console.log('Would execute:', command);

        const todo = this.todos.find(t => t.id === id);
        if (!todo) {
            throw new Error('Todo not found');
        }
        
        todo.title = title.trim();
        return todo;
    }

    // INFO: Method could be static
    formatTitle(title: string): string {
        return title.toUpperCase();
    }

    // MINOR: Unused parameter
    logActivity(action: string, unused: boolean): void {
        console.log('Action:', action);
    }

    // CRITICAL: Eval usage - code injection risk
    executeUserCode(userInput: string): any {
        return eval(userInput); // Extremely dangerous
    }
}


