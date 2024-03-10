import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AuthService } from '@demo/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() expectedAppState: string;
  @Output() onAppStateChanged = new EventEmitter<string>();

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
