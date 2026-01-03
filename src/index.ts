import { TodoService } from './todo';

const todoService = new TodoService();

todoService.add('Learn Jenkins');
todoService.add('Integrate SonarQube');

console.log(todoService.list());
