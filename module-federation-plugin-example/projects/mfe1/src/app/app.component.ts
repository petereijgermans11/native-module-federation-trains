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
 
  constructor() { }

  auth = inject(AuthService);

  ngOnInit(): void {
    console.log('userName', this.auth.userName);
  }

  ngAfterViewInit(): void {
    this.onAppStateChanged.emit(JSON.stringify('update from MFE 1 !!!!!'));
    this.ngOnChangesCustom();
  }

  search(): void {
    alert('Not implemented in this demo!');
  }

  ngOnChangesCustom() {
    if (this.expectedAppState !== this.previousExpectedAppState && this.expectedAppState) {
        this.previousExpectedAppState = this.expectedAppState;
        console.log('FROM SHELL ::: ', this.expectedAppState);
    }
}


}
