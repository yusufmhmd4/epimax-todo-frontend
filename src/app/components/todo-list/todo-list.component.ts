import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
 @Input() darktheme:any;
 
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  editedDescription: string = '';
 
  searchTerm: string = '';
  filter: string = 'all';
  private todoAddedSubscription: Subscription | undefined;

  constructor(private todoService: TodoService,private shared:SharedService) {}

  ngOnInit(): void {
    this.getTodoListData();
    this.todoAddedSubscription = this.shared.onTodoAdded().subscribe(() => {
      this.getTodoListData();
    });
   
  }

getTodoListData(): void {
  this.shared.getAllTodos().subscribe((todos: Todo[]) => {
    this.todos = todos;
    this.filteredTodos = todos;
    this.filterTodos();
  });
}


  // getAllTodos(): void {
  //   this.todoService.getTodos().subscribe((todos: Todo[]) => {
  //     this.todos = todos;
  //     this.filteredTodos = todos;
  //     this.filterTodos();
  //   });
  // }

  onEditTodo(todo: Todo) {
    todo.editMode = true;
    this.editedDescription = todo.description;
  }

  onCancelEdit(todo: any) {
    todo.editMode = false;
  }

  onKeyDowm(event:any){
    if(event.key==='Enter'){
      console.log(event)
    }
  }

  onSaveEdit(todo: Todo) {
    if (todo.id !== undefined) {
      this.todoService.updateTodoDescription(todo.id, this.editedDescription).subscribe(() => {
        todo.description = this.editedDescription || '';
        todo.editMode = false;
      });
    }
  }

  onTodoStatusChange(id: any): void {
    this.todoService.updateTodoStatus(id as number).subscribe(() => {
      this.getTodoListData();
    });
  }

  onDeleteTodo(id: any) {
    this.todoService.deleteTodo(id as number).subscribe(() => {
      this.getTodoListData();
    });
  }

  filterTodos() {
    if (this.searchTerm.trim() !== '') {
      this.filteredTodos = this.todos.filter(todo =>
        todo.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredTodos = this.todos;
    }

    if (this.filter === 'completed') {
      this.filteredTodos = this.filteredTodos.filter(todo => todo.status);
    } else if (this.filter === 'active') {
      this.filteredTodos = this.filteredTodos.filter(todo => !todo.status);
    }
  }
}