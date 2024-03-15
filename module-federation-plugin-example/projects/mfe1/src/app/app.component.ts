import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@demo/auth';
import { FilterService } from '@demo/filter';
import { NotificationBarComponent } from './notification-bar/notification-bar.component';

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
  filter: boolean = false;

  static declarations = AppComponent; // !! IS USED FOR COMMUNICATION WITH MODULE FEDERATION !!

  private previousExpectedAppState: string = '';
  public auth = inject(AuthService);
  public filterService = inject(FilterService);

  constructor() { }

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

  saveConfiguration() {
    this.onAppStateChanged.emit(JSON.stringify('SAVE SETTINGS !!!!!'));
  }

  

}
