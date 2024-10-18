import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }

  // Method to update the filter value
  public updateFilter(filter: boolean): void {
    this.filterSubject.next(filter);
  }

  // Method to get the filter value as an Observable
  public getFilter(): Observable<boolean> {
    return this.filterSubject.asObservable();
  }
}
