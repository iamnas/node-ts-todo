import { TodoService, Todo } from '../src/todo';

describe('TodoService', () => {
    let todoService: TodoService;

    beforeEach(() => {
        todoService = new TodoService();
    });

    describe('add', () => {
        it('should add a new todo', () => {
            const todo = todoService.add('Test todo');
            
            expect(todo).toEqual({
                id: 1,
                title: 'Test todo',
                completed: false
            });
        });

        it('should increment id for each new todo', () => {
            const todo1 = todoService.add('First todo');
            const todo2 = todoService.add('Second todo');
            
            expect(todo1.id).toBe(1);
            expect(todo2.id).toBe(2);
        });

        it('should throw error for empty title', () => {
            expect(() => todoService.add('')).toThrow('Title is required');
        });

        it('should throw error for whitespace-only title', () => {
            expect(() => todoService.add('   ')).toThrow('Title is required');
        });
    });

    describe('list', () => {
        it('should return empty array initially', () => {
            expect(todoService.list()).toEqual([]);
        });

        it('should return all todos', () => {
            todoService.add('Todo 1');
            todoService.add('Todo 2');
            
            const todos = todoService.list();
            expect(todos).toHaveLength(2);
            expect(todos[0].title).toBe('Todo 1');
            expect(todos[1].title).toBe('Todo 2');
        });
    });

    describe('complete', () => {
        it('should mark todo as completed', () => {
            const todo = todoService.add('Test todo');
            const completedTodo = todoService.complete(todo.id);
            
            expect(completedTodo.completed).toBe(true);
            expect(completedTodo.id).toBe(todo.id);
        });

        it('should throw error for non-existent todo', () => {
            expect(() => todoService.complete(999)).toThrow('Todo not found');
        });
    });

    describe('delete', () => {
        it('should delete existing todo', () => {
            const todo = todoService.add('Test todo');
            todoService.delete(todo.id);
            
            expect(todoService.list()).toHaveLength(0);
        });

        it('should not throw error for non-existent todo', () => {
            expect(() => todoService.delete(999)).not.toThrow();
            expect(todoService.list()).toHaveLength(0);
        });

        it('should delete only specified todo', () => {
            const todo1 = todoService.add('Todo 1');
            const todo2 = todoService.add('Todo 2');
            
            todoService.delete(todo1.id);
            
            const remaining = todoService.list();
            expect(remaining).toHaveLength(1);
            expect(remaining[0].id).toBe(todo2.id);
        });
    });

    describe('deleteAll', () => {
        it('should delete all todos', () => {
            todoService.add('Todo 1');
            todoService.add('Todo 2');
            
            todoService.deleteAll();
            
            expect(todoService.list()).toHaveLength(0);
        });

        it('should work on empty list', () => {
            todoService.deleteAll();
            expect(todoService.list()).toHaveLength(0);
        });
    });

    describe('update', () => {
        it('should update todo title', () => {
            const todo = todoService.add('Original title');
            const updatedTodo = todoService.update(todo.id, 'Updated title');
            
            expect(updatedTodo.title).toBe('Updated title');
            expect(updatedTodo.id).toBe(todo.id);
            expect(updatedTodo.completed).toBe(false);
        });

        it('should throw error for non-existent todo', () => {
            expect(() => todoService.update(999, 'New title')).toThrow('Todo not found');
        });

        it('should update title in the list', () => {
            const todo = todoService.add('Original title');
            todoService.update(todo.id, 'Updated title');
            
            const todos = todoService.list();
            expect(todos[0].title).toBe('Updated title');
        });
    });

    describe('integration tests', () => {
        it('should handle complete workflow', () => {
            // Add todos
            const todo1 = todoService.add('Task 1');
            const todo2 = todoService.add('Task 2');
            
            // Update a todo
            todoService.update(todo1.id, 'Updated Task 1');
            
            // Complete a todo
            todoService.complete(todo1.id);
            
            // Check final state
            const todos = todoService.list();
            expect(todos).toHaveLength(2);
            expect(todos[0].title).toBe('Updated Task 1');
            expect(todos[0].completed).toBe(true);
            expect(todos[1].completed).toBe(false);
        });
    });
});