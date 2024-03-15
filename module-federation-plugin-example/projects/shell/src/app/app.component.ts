import { loadRemoteModule } from '@angular-architects/native-federation';
import { CommonModule } from '@angular/common';
import { Component, ComponentRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { AuthService } from '@demo/auth';
import { FilterService } from '@demo/filter';
import { FilterComponent } from './filter/filter.component';
import { Subscription } from 'rxjs';

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
  routerSubscription: Subscription;

  public title = 'shell';
  public auth = inject(AuthService);
  private componentRef: ComponentRef<any> | undefined;
  public instance: any;
  private stringifiedAppState = 'update from SHELL';

  constructor(private filterService: FilterService, private router: Router) {
    this.auth.userName = 'Jane Doe';
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.viewContainerRef?.clear();
      }
    });
  }

  public loadEmplacement(): void {
    this.viewContainerRef?.clear();
    loadRemoteModule('mfe1', './Component').then((module) => {
        this.dynamicallyCreateComponent(module);
    });
  }

  private dynamicallyCreateComponent(module: any) {
    this.viewContainerRef.clear();
    this.componentRef = this.viewContainerRef!.createComponent(module.AppComponent);
    this.instance = this.componentRef.instance;

    // Subscribe to the output event if needed (e.g., for passing data back to the parent component)
    this.instance!.onAppStateChanged;

    // Pass the stringifiedAppState to the component
    this.instance.expectedAppState = this.stringifiedAppState;
  }

  public loadConfig() {
    this.instance.expectedAppState = 'NEW SETTINGS LOADED';
  }

  ngOnDestroy() {
    // Unsubscribe from router events to avoid memory leaks
    this.routerSubscription.unsubscribe();
  }
}

