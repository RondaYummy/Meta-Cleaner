import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ethernet-popups',
  templateUrl: './ethernet-popups.component.html',
  styleUrls: ['./ethernet-popups.component.scss'],
})
export class EthernetPopupsComponent implements OnInit {
  @Input() isOnline!: boolean;
  @Input() isWebVersion!: boolean;
  @Output() newIsOnline = new EventEmitter<boolean>();

  isOnlineValue = this.isOnline;
  isChecked = false;

  constructor() {}
  ngOnInit(): void {}

  checkEthernetStatus() {
    this.isChecked = true;
    if (!navigator.onLine) {
      this.isOnlineValue = false;
      // this.newIsOnline.emit(this.isOnline);
    } else {
      this.isOnlineValue = true;
      // this.newIsOnline.emit(this.isOnline);
    }
  }

  isOffline() {
    this.newIsOnline.emit(this.isOnlineValue);
  }
}
