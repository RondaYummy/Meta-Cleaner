import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import * as ConvertImage from 'js-convert-images';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'meta-cleaner';
  isOnline = !navigator.onLine && environment.production;
  isWebVersion = !window.matchMedia('(display-mode: standalone)').matches;
  selectedPhotos: Array<string> = [];
  continueListPhotos: Array<string> = [];
  clearMetadata: boolean = false;
  photosWithClearMetadata: Array<Blob>;
  endClearMetadata: boolean = false;
  isWeb: any;

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
    }, environment.checkEthernetInterval);

    window
      .matchMedia('(display-mode: standalone)')
      .addEventListener('change', ({ matches }) => {
        this.isWeb = matches;
      });

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
  }

  checkEthernetStatus() {
    this.isOnline = !navigator.onLine && environment.production;
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
      this.stream = undefined;
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
    this.endClearMetadata = true;
  }

  goHome(success: boolean) {
    if (success) {
      this.continueListPhotos = [];
      this.photosWithClearMetadata = [];
      this.clearMetadata = false;
      this.stream = undefined;
      this.endClearMetadata = false;
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
          width: 1280,
          height: 1280,
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
