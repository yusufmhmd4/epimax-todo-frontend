import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  @Input() darktheme: any;
  @Input() addTodoModal: any;
  @Output() ChangeModal = new EventEmitter<void>();

  onModelClose() {
    this.ChangeModal.emit();
  }

  description: string = '';

  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  editedDescription: string = '';

  searchTerm: string = '';
  filter: string = 'all';

  onKeyPress(event: any) {
    console.log(event.key);
    if (event.key === 'Enter') {
      this.addTodo();
    }
  }
  
  addTodo() {
    // console.log(event)
    if (this.description.trim() !== '') {
      const newTodo = { description: this.description, status: false };
      this.onModelClose()
      this.todoService.addTodo(newTodo).subscribe({
        next: () => {
          this.description = '';
          this.getTodoListData() 
        },
      });
    } else {
      alert('Please enter a todo description');
    }
  }

  ngOnInit(): void {
    this.getTodoListData();
  }

  getTodoListData(): void {
    this.todoService.getTodos().subscribe((todos: any) => {
      console.log(todos);
      this.todos = todos.result;
      this.filteredTodos = todos;
      this.filterTodos();
    });
  }

  onEditTodo(todo: Todo) {
    todo.editMode = true;
    this.editedDescription = todo.description;
  }

  onCancelEdit(todo: any) {
    todo.editMode = false;
  }

  onKeyDowm(event: any) {
    if (event.key === 'Enter') {
      console.log(event);
    }
  }

  onSaveEdit(todo: Todo) {
    if (todo.id !== undefined && this.editedDescription.trim()!=="" ) {
      this.todoService
        .updateTodoDescription(todo.id, this.editedDescription)
        .subscribe(() => {
          todo.description = this.editedDescription || '';
          todo.editMode = false;
        });
    }else{
      alert("Description is Required")
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
      this.filteredTodos = this.todos.filter((todo) =>
        todo.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredTodos = this.todos;
    }

    if (this.filter === 'completed') {
      this.filteredTodos = this.filteredTodos.filter(
        (todo) => todo.isCompleted
      );
    } else if (this.filter === 'active') {
      this.filteredTodos = this.filteredTodos.filter(
        (todo) => !todo.isCompleted
      );
    }
  }
}
