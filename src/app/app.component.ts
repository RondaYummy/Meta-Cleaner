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
  selectedPhotos: Array<ArrayBuffer> = [];

  ngOnInit() {
    this.checkEthernetStatus();

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

  newIsOnline(event: boolean) {
    this.isOnline = event;
    setInterval(() => {
      this.checkEthernetStatus();
    }, 3000);
  }

  uploadFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedPhotos.push(reader.result as ArrayBuffer);
    };
    reader.readAsArrayBuffer(file);
  }

  handleFiles(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    Array.from(files).forEach((file: File) => {
      this.uploadFile(file);
    });
  }

  closeSelected(event: boolean) {
    console.log(event);
    this.selectedPhotos = [];
  }
}
