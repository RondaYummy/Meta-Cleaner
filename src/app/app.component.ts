import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import * as imageConversion from 'image-conversion';
import * as ConvertImage from 'js-convert-images';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'meta-cleaner';
  isOnline = true;
  isWebVersion = true;
  selectedPhotos: Array<string> = [];
  continueListPhotos: Array<string> = [];
  clearMetadata: boolean = false;
  photosWithClearMetadata: Array<Blob>;

  @ViewChild('video') elVideo: any;
  stream: any;
  imageCapture: any;

  promptEvent: any;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: any) {
    console.log(e, '131213');
    this.promptEvent = e;
  }

  constructor() {}

  ngOnInit() {
    this.checkEthernetStatus();
    setInterval(() => {
      this.checkEthernetStatus();
    }, 5000);

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
  }

  uploadFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedPhotos.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  handleFiles(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files.length < 10) {
      Array.from(files).forEach((file: File) => {
        this.uploadFile(file);
      });
    }
  }

  closeSelected(event: boolean) {
    if (event) {
      this.continueListPhotos = [];
    }
  }

  continueSelected(filesList: Array<string>) {
    this.continueListPhotos = filesList;
    this.selectedPhotos = [];
  }

  clearMetadataFn(clearList: Array<string>) {
    if (clearList && clearList.length) {
      this.clearMetadata = true;
      this.continueListPhotos = clearList;
    }
  }

  cancelClearMetadata(cancel: boolean) {
    if (cancel) {
      this.clearMetadata = false;
      this.continueListPhotos = [];
    }
  }

  successClearMetadata(clearedArray: Array<Blob>) {
    this.continueListPhotos = [];
    this.photosWithClearMetadata = clearedArray;
  }

  goHome(success: boolean) {
    if (success) {
      this.continueListPhotos = [];
      this.photosWithClearMetadata = [];
      this.clearMetadata = false;
      this.stream = undefined;
    }
  }

  installPwa(): void {
    console.log(this.promptEvent, 'promptEvent');
    this.promptEvent.prompt();
  }

  async takePhotoUser() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    const videoTracks = this.stream.getVideoTracks();
    const track = videoTracks[0];
    console.log(`Getting video from: ${track.label}`);
    this.imageCapture = new ImageCapture(track);
    this.elVideo.nativeElement.style = 'display: block;';
    this.elVideo.nativeElement.srcObject = this.stream;
  }

  async takePhoto() {
    this.imageCapture
      .takePhoto()
      .then(async (blob: Blob) => {
        this.elVideo.nativeElement.style = 'display: none;';
        const converter: any = new ConvertImage.ConvertImage();
        const options = {
          name: 'taken-image',
          download: false,
          width: 400,
          height: 400,
          type: 'jpeg',
        };
        converter.convertImageFromFile(blob, options).then((data: any) => {
          this.continueListPhotos.push(data);
        });
      })
      .catch(function (error: any) {
        console.log('".takePhoto(): error: ', error);
      });
  }
}
