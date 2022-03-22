import './styles.css';
import { Todo, TodoList } from './js/Class';
import { createTodoHtml } from './js/components'

export const todoList = new TodoList();

todoList.listTodos.forEach( createTodoHtml );