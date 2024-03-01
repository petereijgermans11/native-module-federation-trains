import { loadRemoteModule } from '@angular-architects/native-federation';
import { Component, ViewChild, ViewContainerRef, inject } from '@angular/core';
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

  constructor() {
    this.auth.userName = 'Jane Doe';
  }

  loadTrains(): void {
    loadRemoteModule('mfe1', './Component').then((m) => {
      this.viewContainerRef!.createComponent(m.AppComponent);
    });
  }

}

