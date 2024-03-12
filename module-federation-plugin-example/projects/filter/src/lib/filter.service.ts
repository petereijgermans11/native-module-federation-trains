import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  // Method to update the filter value
  updateFilter(filter: string): void {
    this.filterSubject.next(filter);
  }

  // Method to get the filter value as an Observable
  getFilter(): Observable<string> {
    return this.filterSubject.asObservable();
  }
}
