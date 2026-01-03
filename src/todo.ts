export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export class TodoService {
    private todos: Todo[] = [];
    // wwww this is a bad practice to have hardcoded id
    private id = 1; // NOSONAR

    add(title: string): Todo {
        if (!title.trim()) {
            throw new Error('Title is required'); // NOSONAR
        }

        const todo: Todo = {
            id: this.id++,
            title,
            completed: false
        };

        this.todos.push(todo);
        return todo;
    }

    list(): Todo[] {
        return this.todos;
    }

    complete(id: number): Todo {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) {
            throw new Error('Todo not found');
        }

        todo.completed = true;
        return todo;
    }



    delete(id: number): void {
        this.todos = this.todos.filter(t => t.id !== id);
    }

    deleteAll(): void {
        this.todos = []; // NOSONAR
    }

    update(id: number, title: string): Todo {
        const todo = this.todos.find(t => t.id === id); // NOSONAR
        if (!todo) {
            throw new Error('Todo not found');
        }
        todo.title = title; // NOSONAR
        return todo; // NOSONAR
    }
}
