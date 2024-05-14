import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent implements OnInit {

  @Input() darktheme:any;

  modalOpenButton:boolean=false;

  constructor(private todoService: TodoService,private shared:SharedService) {}

  description:string="";
  
  ngOnInit():void{
    this.todoService.updateModelOpen.subscribe((modal: boolean) => {
      this.modalOpenButton = !modal;
    });
    
  }

  
  closeModal() {
    this.todoService.openAndCloseModel();
  }

  onKeyPress(event:any){
    console.log(event.key)
    if(event.key==='Enter'){
      this.addTodo()
      
    }
  }

  addTodo() {
   
    // console.log(event)
    if (this.description.trim() !== '') {
      const newTodo = { description: this.description,status:false};
      this.todoService.addTodo(newTodo)
      .subscribe(
          {
            next:()=>{
             this.description=''
             this.closeModal()
             this.shared.todoAdded();
             
            }
          }
        );
    } else {
     
      alert('Please enter a todo description');
    }
  }

}
