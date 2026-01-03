import { TodoService } from './todo';

const todoService = new TodoService();

todoService.add('Learn Jenkins'); // NOSONAR
todoService.add('Set up SonarQube'); // NOSONAR
todoService.add('Integrate SonarQube'); // NOSONAR

console.log(todoService.list());
