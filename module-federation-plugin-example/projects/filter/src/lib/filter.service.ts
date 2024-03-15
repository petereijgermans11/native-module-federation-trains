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

// import { Injectable, signal } from '@angular/core';
// import { Observable } from 'rxjs';
// import { toObservable} from '@angular/core/rxjs-interop';

// @Injectable({
//   providedIn: 'root'
// })
// export class FilterService {
//   private filterSignal = signal<boolean>(false);  // Create a writable signal with an initial value

//   constructor() {}

//   // Update the filter value
//   updateFilter(filter: boolean): void {
//     this.filterSignal.set(filter);  // Use set() to update the signal
//   }

//   getFilter(): Observable<boolean> {
//     return toObservable(this.filterSignal);
//   }

// }