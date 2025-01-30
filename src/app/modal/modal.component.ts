import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';


@Component({
  selector: 'app-modal',
  standalone: false,
  
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  modalName: string = '';  // This will store the modal name

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    // Subscribe to the modalName observable to get updates
    this.modalService.modalName$.subscribe(name => {
      this.modalName = name;  // Set the modalName based on what is emitted
    });
  }

  closeModal(): void {
    this.modalService.close();  // Close the modal by resetting the modalName
  }
}
 