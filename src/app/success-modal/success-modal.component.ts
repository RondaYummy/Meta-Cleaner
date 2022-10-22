import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
})
export class SuccessModalComponent implements OnInit {
  @Output() goHome = new EventEmitter<boolean>();

  constructor() {}
  ngOnInit(): void { }

  goToHome() {
    this.goHome.emit(true);
  }
}
