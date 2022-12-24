import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
})
export class SuccessModalComponent {
  @Output() goHome = new EventEmitter<boolean>();

  constructor() {}

  goToHome() {
    this.goHome.emit(true);
  }
}
