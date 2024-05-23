import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@demo/auth';
import { FilterService } from '@demo/filter';
import { NotificationBarComponent } from './notification-bar/notification-bar.component';
import { Task } from './task/task';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterModule,
    CommonModule,
    NotificationBarComponent,
    ReactiveFormsModule
  ],
})
export class AppComponent implements OnInit {
  @ViewChild('taskNameInput') taskNameInputRef!: ElementRef<HTMLInputElement>; 
  
  @Input() messageFromHost: string;
  @Output() onAppStateChanged = new EventEmitter<string>();
  private filter: boolean = false;
  private previousMessage: string = '';

  constructor(public auth: AuthService, private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.getFilter().subscribe(filter => {
      this.filter = filter;
    })
  }

  ngAfterViewInit(): void {
    this.ngOnChangesCustom();
  }

  ngOnChangesCustom() {
    if (this.messageFromHost !== this.previousMessage && this.messageFromHost) {
      this.previousMessage = this.messageFromHost;
      // do something!!!
    }
  }

  addTaskToCart(taskName: string) {
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID (you can use a proper ID generation logic)
      name: taskName, // Use the task name entered by the user
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
