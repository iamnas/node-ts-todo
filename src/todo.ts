export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export class TodoService {
  private todos: Todo[] = [];
  private id = 1;

  add(title: string): Todo {
    if (!title.trim()) {
      throw new Error('Title is required');
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
}
