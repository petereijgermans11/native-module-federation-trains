import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task/task';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  imports: [
    CommonModule,
  ]
})
export class CartComponent {
  @Input() tasks: Task[] = [];
  @Input() auth: any;
}
