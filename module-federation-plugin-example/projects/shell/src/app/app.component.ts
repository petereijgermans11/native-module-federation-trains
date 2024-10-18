import { loadRemoteModule } from '@angular-architects/native-federation';
import { CommonModule } from '@angular/common';
import { Component, ComponentRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { AuthService } from '@demo/auth';
import { FilterService } from '@demo/filter';
import { FilterComponent } from './filter/filter.component';
import { Task } from './task/task';
import { CartComponent } from './cart/cart.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    FilterComponent,
    CartComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // ViewContainerRef to dynamically create components
  @ViewChild('placeHolder', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef | undefined;

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

    // Subscribe to the output event if needed (e.g., for receiving 'Tasks' to the HOST)
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
}

