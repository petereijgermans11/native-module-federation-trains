import { loadRemoteModule } from '@angular-architects/native-federation';
import { Component, ComponentRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@demo/auth';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterModule
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
   // ViewContainerRef to dynamically create components
   @ViewChild('remoteComponentContainer', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef | undefined;
   
  title = 'shell';
  auth = inject(AuthService);
  private componentRef: ComponentRef<any> | undefined;


  constructor() {
    this.auth.userName = 'Jane Doe';
  }

  ngOnInit(): void {
    this.loadTrains();
  }

  private loadTrains(): void {
    this.viewContainerRef?.clear();
    loadRemoteModule('mfe1', './Component').then((m) => {
      this.componentRef = this.viewContainerRef!.createComponent(m.AppComponent);
      const instance = this.componentRef.instance;

        // Subscribe to the output event if needed (e.g., for passing data back to the parent component)
        instance.onAppStateChanged?.subscribe((stringifiedAppState: string) => {
            console.log('INCOMING FROM MFE 1 ::: ', stringifiedAppState);
        });
        // Pass the stringifiedAppState to the component
        const stringifiedAppState = 'update from SHELL';
        instance.expectedAppState = stringifiedAppState;
    });
  }

}

