import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-submit-selected-photo',
  templateUrl: './submit-selected-photo.component.html',
  styleUrls: ['./submit-selected-photo.component.scss'],
})
export class SubmitSelectedPhotoComponent implements OnInit {
  @Input() fileList: Array<string> = [];
  @Output() continue = new EventEmitter<Array<string>>();
  selectedPhotosForContinue: Array<string> = this.fileList;

  constructor() {}

  ngOnInit(): void {
    this.selectedPhotosForContinue = this.fileList;
  }

  continueClear() {
    this.continue.emit(this.selectedPhotosForContinue);
  }

  selectPhoto(base64photo: string) {
    debugger;
    const index = this.selectedPhotosForContinue.findIndex(
      (el) => el === base64photo
    );
    if (index < 0) {
      this.selectedPhotosForContinue.push(base64photo);
    } else {
      this.selectedPhotosForContinue.splice(index, 1);
    }
  }

  isSelectedPhoto(photo: string) {
    return this.selectedPhotosForContinue.includes(photo);
  }
}
