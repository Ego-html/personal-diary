import {Injectable, signal} from '@angular/core';
import {Note} from "../models/note.model";

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  todoSignal = signal<Note[]>(this.initTodoSignal())

  constructor() {
  }

  private initTodoSignal(): Note[] {
    const todoJson = localStorage.getItem('todos');
    return todoJson ? JSON.parse(todoJson) : [];
  }

  saveToDo(todo: Note) {
    const todos = this.todoSignal();
    const index = todos.findIndex((t: Note) => t.id == todo.id);

    if (index > -1) {
      todos[index] = todo;
    } else {
      todos.push(todo);
    }
    this.todoSignal.set([...todos]);
  }


  deleteTodoById(todoId: string) {
    const todos = this.todoSignal().filter(todo => todo.id !== todoId);
    this.updateStorage(todos);
    this.todoSignal.set(todos);
  }

  private updateStorage(todos: Note[]) {
    localStorage.setItem('todos', JSON.stringify(todos))
  }
}

