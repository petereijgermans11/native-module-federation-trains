import { loadRemoteModule } from '@angular-architects/native-federation';
import { CommonModule } from '@angular/common';
import { Component, ComponentRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@demo/auth';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  // ViewContainerRef to dynamically create components
  @ViewChild('remoteComponentContainer', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef | undefined;

  public title = 'shell';
  public auth = inject(AuthService);
  private componentRef: ComponentRef<any> | undefined;
  public instance: any;
  private stringifiedAppState = 'update from SHELL';

  constructor() {
    this.auth.userName = 'Jane Doe';
  }

  public ngOnInit(): void {
    this.loadTrains();
  }

  public sendSettingsToMFE1() {
    this.instance.expectedAppState = this.stringifiedAppState;
  }

  private loadTrains(): void {
    this.viewContainerRef?.clear();
    loadRemoteModule('mfe1', './Component').then((module) => {

      if (!this.componentRef) {
        // Dynamically create the component and attach it to the view
        this.dynamicallyCreateComponent(module);
      } else {
        this.componentRef.instance.expectedAppState = this.stringifiedAppState;
      }
    });
  }

  private dynamicallyCreateComponent(module: any) {
    this.componentRef = this.viewContainerRef!.createComponent(module.AppComponent);
    this.instance = this.componentRef.instance;

    // Subscribe to the output event if needed (e.g., for passing data back to the parent component)
    this.instance!.onAppStateChanged;

    // Pass the stringifiedAppState to the component
    this.instance.expectedAppState = this.stringifiedAppState;
  }
}

