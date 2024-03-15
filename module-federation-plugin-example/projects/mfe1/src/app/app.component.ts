import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@demo/auth';
import { FilterService } from '@demo/filter';
import { NotificationBarComponent } from './notification-bar/notification-bar.component';
import { Task } from './task/task';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterModule,
    CommonModule,
    NotificationBarComponent
  ],
})
export class AppComponent implements OnInit {
  @Input() expectedAppState: string;
  @Output() onAppStateChanged = new EventEmitter<string>();
  private filter: boolean = false;

  static declarations = AppComponent; // !! IS USED FOR COMMUNICATION WITH MODULE FEDERATION !!

  private previousExpectedAppState: string = '';

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
    if (this.expectedAppState !== this.previousExpectedAppState && this.expectedAppState) {
      this.previousExpectedAppState = this.expectedAppState;
      // do something!!!
    }
  }

  public getAppClass() {
    return {
      'filtered-app': this.filter // Apply 'filtered-app' class when filter is true
    };
  }

  public addTaskToCart() {
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID (you can use a proper ID generation logic)
      name: 'Example Task',
      date: new Date()
    };
    this.onAppStateChanged.emit(JSON.stringify(newTask));
  }

}
