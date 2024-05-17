import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { TodoService } from './services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TodoListComponent,HttpClientModule,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'simple-todos-app';

  darkTheme:boolean=false;

  addTodoModal:boolean=false;


  onThemeChange():void{
    this.darkTheme=!this.darkTheme
  }
  

onModalChange():void{
  this.addTodoModal=!this.addTodoModal
}
  
  
}
