import { loadRemoteModule } from '@angular-architects/native-federation';
import { CommonModule } from '@angular/common';
import { Component, ComponentRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { AuthService } from '@demo/auth';
import { FilterService } from '@demo/filter';
import { FilterComponent } from './filter/filter.component';
import { Subscription } from 'rxjs';
import { Task } from './task/task';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterModule,
    CommonModule,
    FilterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // ViewContainerRef to dynamically create components
  @ViewChild('remoteComponentContainer', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef | undefined;
  private routerSubscription: Subscription;

  public title = 'shell';
  private componentRef: ComponentRef<any> | undefined;
  public instance: any;
  private filter = true;
  public tasks: Task[] = [];

  constructor(private filterService: FilterService,  public auth: AuthService) {
    this.auth.userName = 'Jane Doe';
    this.filterService.getFilter().subscribe(filter => {
      this.filter = filter;
    })
  }

  public loadEmplacement(): void {
    this.viewContainerRef?.clear();
    loadRemoteModule('mfe1', './Component').then((module) => {
      this.dynamicallyCreateComponent(module);
    });
  }

  private dynamicallyCreateComponent(module: any) {
    this.componentRef = this.viewContainerRef!.createComponent(module.AppComponent);
    this.instance = this.componentRef.instance;

    // Subscribe to the output event if needed (e.g., for passing data back to the parent component)
    this.instance!.onAppStateChanged.subscribe((stringifiedAppState: string) => {
      const newTask: Task = JSON.parse(stringifiedAppState);
      this.tasks.push(newTask);
      if (this.tasks.length > 2) {
        this.sendMessage();
      }
    });
  }

  public sendMessage() {
    this.instance.messageFromHost = 'Amount of tasks exceeds 2';
  }

  public getAppClass() {
    return {
      'filtered-app': this.filter
    };
  }

  ngOnDestroy() {
    // Unsubscribe from router events to avoid memory leaks
    this.routerSubscription.unsubscribe();
  }
}

