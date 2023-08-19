import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import * as ConvertImage from './js-convert-images';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'meta-cleaner';
  isOnline = navigator.onLine && environment.production;
  isWebVersion = !window.matchMedia('(display-mode: standalone)').matches;
  selectedPhotos: Array<string> = [];
  continueListPhotos: Array<string> = [];
  handleCameraPosition: 'user' | 'environment' = 'user';
  supportedFacingMode =
    navigator.mediaDevices.getSupportedConstraints().facingMode;

  takenPhotos: Array<string> = [];
  takenSelectedPhotos: Array<string> = [];
  maxSelectedPhotoCount: number = environment.maxSelectedPhotos;

  clearMetadata: boolean = false;
  photosWithClearMetadata: Array<Blob>;
  endClearMetadata: boolean = false;

  @ViewChild('video') elVideo: any;
  stream: any;
  imageCapture: any;

  promptEvent: any;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: any) {
    this.promptEvent = e;
  }

  constructor() {}

  ngOnInit() {
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      const handler = (e: any) => {
        if (e.scale !== 1) {
          e.preventDefault();
        }
      };

      window.addEventListener('touchmove', handler, { passive: false });
      window.document.addEventListener('touchmove', handler, {
        passive: false,
      });
    }

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
    window.addEventListener('online', () => {
      this.isOnline = true;
    });

    const listener = ({ matches }: any) => {
      if (!matches) {
        window
          .matchMedia('(display-mode: standalone)')
          .removeEventListener('change', listener);
      } else {
        this.isWebVersion = !matches;
      }
    };

    window
      .matchMedia('(display-mode: standalone)')
      .addEventListener('change', listener);

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

  newIsOnline(event: boolean) {
    this.isOnline = event;
  }

  async uploadFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedPhotos.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  async handleFiles(event: Event) {
    const target = event.target as HTMLInputElement;
    let files = Array.from(target.files as FileList);
    if (files?.length > 10) {
      files = files.splice(0, 10);
    }

    for await (const file of files) {
      await this.uploadFile(file);
    }
    target.value = '';
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

  closeSubmitSelected() {
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
    this.promptEvent.prompt();
  }

  handleVideo() {
    const constraints = {
      video: {
        facingMode: {
          exact: this.handleCameraPosition,
        },
      },
    };
    return constraints;
  }

  changeCamera() {
    if (this.handleCameraPosition === 'user') {
      this.handleCameraPosition = 'environment';
      this.stream.getTracks().forEach(function (track: any) {
        track.stop();
      });
      this.takePhotoUser();
    } else {
      this.handleCameraPosition = 'user';
      this.stream.getTracks().forEach(function (track: any) {
        track.stop();
      });
      this.takePhotoUser();
    }
  }

  async takePhotoUser() {
    this.stream = await navigator.mediaDevices.getUserMedia(this.handleVideo());
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
        const converter: any = new ConvertImage.ConvertImage();
        const options = {
          name: `camera-${Date.now()}`,
          download: false,
          width: 1280,
          height: 1280,
          type: 'png',
        };
        converter.convertImageFromFile(blob, options).then((data: string) => {
          this.takenPhotos.push(data);
        });
      })
      .catch(function (error: any) {
        console.log('Take Photo [Error]: ', error);
      });
  }

  clearMetadataTakePhoto() {
    this.continueListPhotos = this.takenSelectedPhotos;
    this.closeWindowForTakent();
  }

  selectTakenPhoto(photo: any) {
    const added = this.takenSelectedPhotos.includes(photo);
    if (
      this.takenSelectedPhotos.length < environment.maxSelectedPhotos &&
      !added
    ) {
      this.takenSelectedPhotos.push(photo);
    }
    if (added) {
      this.takenSelectedPhotos = this.takenSelectedPhotos.filter(
        (photoCurrent) => photoCurrent !== photo
      );
    }
  }

  closeWindowForTakent() {
    this.stream.getTracks().forEach(function (track: any) {
      track.stop();
    });
    this.stream = undefined;
    this.elVideo.nativeElement.style = 'display: none;';
    this.takenSelectedPhotos = [];
    this.takenPhotos = [];
  }

  isSelectedTakentPhoto(photo: string) {
    return this.takenSelectedPhotos.includes(photo);
  }
}
