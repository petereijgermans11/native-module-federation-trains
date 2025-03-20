import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { AuthService } from '@demo/auth';
import { FilterService } from '@demo/filter';
import { Task } from './task/task';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class AppComponent implements OnInit {
  @ViewChild('taskNameInput',) taskNameInputRef!: ElementRef<HTMLInputElement>; 
  
  @Input() messageFromHost: string;
  @Output() onAppStateChanged = new EventEmitter<string>();
  private filter: boolean = false;

  constructor(public auth: AuthService, private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.getFilter().subscribe(filter => {
      this.filter = filter;
    })
  }


  addTaskToCart(taskName: string) {
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000), 
      name: taskName,
      date: new Date()
    };
    this.onAppStateChanged.emit(JSON.stringify(newTask));
    
    // Clear the input field after adding the task
    this.taskNameInputRef.nativeElement.value = '';
  }

  public getAppClass() {
    return {
      'filtered-app': this.filter // Apply 'filtered-app' class when filter is true
    };
  }

 

}
