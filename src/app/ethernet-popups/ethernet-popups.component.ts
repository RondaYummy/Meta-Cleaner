import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ethernet-popups',
  templateUrl: './ethernet-popups.component.html',
  styleUrls: ['./ethernet-popups.component.scss'],
})
export class EthernetPopupsComponent {
  @Input() isOnline!: boolean;
  @Input() isWebVersion!: boolean;
  @Output() newIsOnline = new EventEmitter<boolean>();

  isOnlineValue = this.isOnline;
  isChecked = false;

  constructor() {}

  checkEthernetStatus() {
    this.isChecked = true;
    if (!navigator.onLine) {
      this.isOnlineValue = false;
    } else {
      this.isOnlineValue = true;
    }
  }

  isOffline() {
    this.newIsOnline.emit(this.isOnlineValue);
  }
}
