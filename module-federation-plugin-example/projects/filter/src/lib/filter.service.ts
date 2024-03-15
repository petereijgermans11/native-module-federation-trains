import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  // Method to update the filter value
  updateFilter(filter: boolean): void {
    this.filterSubject.next(filter);
  }

  // Method to get the filter value as an Observable
  getFilter(): Observable<boolean> {
    return this.filterSubject.asObservable();
  }
}
