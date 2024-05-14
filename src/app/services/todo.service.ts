import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl = 'https://localhost:7082/api/Todos';
  darkTheme:boolean=false
  modalOpenButton:boolean=false;

  themeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  updateModelOpen:EventEmitter<boolean> =new EventEmitter<boolean>();

  openAndCloseModel(){
    this.modalOpenButton=!this.modalOpenButton
    this.updateModelOpen.emit(this.modalOpenButton)
  }

  updateTheme() {
    this.darkTheme = !this.darkTheme;
    this.themeChanged.emit(this.darkTheme);
  }

  constructor(private http: HttpClient) {}



  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl)
    }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodoStatus(id: number){
    return this.http.patch(`${this.apiUrl}/${id}`, {});
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTodoDescription(id: number, description: string) {
    return this.http.patch(`${this.apiUrl}/description/${id}`, `"${description}"`, { headers: { 'Content-Type': 'application/json' } });
  }
  
}
