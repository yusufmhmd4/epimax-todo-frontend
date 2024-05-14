import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddTodoComponent } from './components/add-todo/add-todo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TodoListComponent,AddTodoComponent,HttpClientModule,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'simple-todos-app';

  darkTheme:boolean=false;

  modalOpenButton:boolean=false;


  constructor(private todoService: TodoService) {}

  ngOnInit(){
    this.todoService.updateModelOpen.subscribe((modal: boolean) => {
      this.modalOpenButton = modal;
    });

  }

  onThemeChange():void{
    this.darkTheme=!this.darkTheme
  }
  

  openModal(){
    this.todoService.openAndCloseModel()
  }

  
  
}
