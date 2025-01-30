import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalSubject = new BehaviorSubject<string>('');  // Initially no modal open
  modalName$ = this.modalSubject.asObservable();  // Observable to notify modal component

  open(modalName: string): void {
    this.modalSubject.next(modalName);  // Emit the modal name to open the modal
  }

  close(): void {
    this.modalSubject.next('');  // Clear modal name to close the modal
  }
}