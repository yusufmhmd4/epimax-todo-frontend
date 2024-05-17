import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl = 'https://localhost:44311/api/services/app/ToDoItem/';
 
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl+"GetAll");
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(this.apiUrl+"Create", todo);
  }

  updateTodoStatus(id: number){
    return this.http.put(`${this.apiUrl}UpdateIsCompleted?id=${id}`, {});
  }
  
  deleteTodo(id: number) {
    return this.http.delete(`${this.apiUrl}Delete?id=${id}`);
  }

  updateTodoDescription(id: number, description: string) {
    return this.http.put(`${this.apiUrl}UpdateDescription?id=${id}&newDescription=${description}`, { headers: { 'Content-Type': 'application/json' } });
  }
  
}
