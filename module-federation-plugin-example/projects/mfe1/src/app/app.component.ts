import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@demo/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterModule,
    CommonModule
  ],
})
export class AppComponent implements OnInit {
  @Input() expectedAppState: string;
  @Output() onAppStateChanged = new EventEmitter<string>();

  // declarations IS USED FOR COMMUNICATION WITH MODULE FEDERATION 
  static declarations = AppComponent;

  private previousExpectedAppState: string = '';
  public auth = inject(AuthService);

  constructor() { }

  ngOnInit(): void {
    console.log('userName', this.auth.userName);
  }

  ngAfterViewInit(): void {
    this.ngOnChangesCustom();
  }

  ngOnChangesCustom() {
    if (this.expectedAppState !== this.previousExpectedAppState && this.expectedAppState) {
      this.previousExpectedAppState = this.expectedAppState;
    }
  }

  sendStateToShell() {
    this.onAppStateChanged.emit(JSON.stringify('update from MFE 1 !!!!!'));
  }

}
