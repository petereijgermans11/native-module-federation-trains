import { Component, OnInit } from '@angular/core';
import { FilterService } from '@demo/filter';

@Component({
  standalone: true,
  selector: 'app-filter',
  templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit {
  constructor(private filterService: FilterService) { }

  ngOnInit(): void { }

  // Method to update the filter value
  updateFilter(filter: string): void {
    this.filterService.updateFilter(filter);
  }
}
