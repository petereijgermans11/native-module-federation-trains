import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FilterService } from '@demo/filter';

@Component({
  standalone: true,
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrl: './notification-bar.component.css',
  imports: [
    CommonModule,
  ],
})
export class NotificationBarComponent implements OnInit {
    @Input() messageFromHost: string;

    ngOnInit(): void { }

}
