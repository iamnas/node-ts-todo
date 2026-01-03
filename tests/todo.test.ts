import { TodoService } from '../src/todo';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService();
  });

  test('should add a todo', () => {
    const todo = service.add('Write tests');
    expect(todo.title).toBe('Write tests');
    expect(todo.completed).toBe(false);
  });

  test('should list todos', () => {
    service.add('Task 1');
    service.add('Task 2');
    expect(service.list().length).toBe(2);
  });

  test('should complete a todo', () => {
    const todo = service.add('Complete me');
    const completed = service.complete(todo.id);
    expect(completed.completed).toBe(true);
  });

  test('should throw error for empty title', () => {
    expect(() => service.add('')).toThrow('Title is required');
  });

  test('should delete a todo', () => {
    const todo = service.add('Delete me');
    service.delete(todo.id);
    expect(service.list().length).toBe(0);
  });
});
