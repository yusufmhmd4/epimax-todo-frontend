import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TodoService } from './todo.service';
import { Todo } from '../todo.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private todoAddedSubject = new Subject<void>();

  constructor(private todoService: TodoService) {}

  getAllTodos(): Observable<Todo[]> {
    return this.todoService.getTodos();
  }

  // Method to notify subscribers when a new todo is added
  todoAdded(): void {
    this.todoAddedSubject.next();
  }

  // Observable to subscribe to for new todo notifications
  onTodoAdded(): Observable<void> {
    return this.todoAddedSubject.asObservable();
  }
}
