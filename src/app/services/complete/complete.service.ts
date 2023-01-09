import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompleteService {

  options: string[] = ['One', 'Two', 'Three'];

  getOptions(): string[] {
    return this.options;
  }

  constructor() { }
}
