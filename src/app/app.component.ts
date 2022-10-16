import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'meta-cleaner';
  isOnline = true;
  isWebVersion = true;

  ngOnInit() {
    console.group('Ukraine');
    console.info(
      '%c        Все буде Україна!        ',
      'background: #0057B8; font-size: 16px;font-weight: bold;color: white;'
    );
    console.info(
      '%c  https://github.com/RondaYummy  ',
      'background: #FFD700;  font-size: 16px;font-weight: bold;'
    );
    console.groupEnd();

    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isWebVersion = false;
      setInterval(() => {
        this.checkEthernetStatus();
      }, 3000);
    } else {
      this.isWebVersion = true;
    }
  }

  checkEthernetStatus() {
    if (!navigator.onLine) {
      this.isOnline = false;
    } else {
      this.isOnline = true;
    }
  }
}
