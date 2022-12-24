import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-submit-selected-photo',
  templateUrl: './submit-selected-photo.component.html',
  styleUrls: ['./submit-selected-photo.component.scss'],
})
export class SubmitSelectedPhotoComponent {
  @Input() fileList: Array<string> = [];
  @Output() continue = new EventEmitter<Array<string>>();
  @Output() close = new EventEmitter<Array<string>>();
  selectedPhotosForContinue: Array<string> = [];
  maxSelectedPhotos: number = environment.maxSelectedPhotos;

  constructor() {}

  continueClear() {
    this.continue.emit(this.selectedPhotosForContinue);
  }

  closeWindow() {
    this.close.emit();
  }

  selectPhoto(base64photo: string) {
    const added = this.selectedPhotosForContinue.includes(base64photo);
    if (
      !added &&
      this.selectedPhotosForContinue.length < this.maxSelectedPhotos
    ) {
      this.selectedPhotosForContinue.push(base64photo);
    }
    if (added) {
      this.selectedPhotosForContinue = this.selectedPhotosForContinue.filter(
        (i) => i !== base64photo
      );
    }
    return;
  }

  isSelectedPhoto(photo: string) {
    return this.selectedPhotosForContinue.includes(photo);
  }
}
