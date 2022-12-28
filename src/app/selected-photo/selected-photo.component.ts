import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
const watermark = require('watermarkjs');

@Component({
  selector: 'app-selected-photo',
  templateUrl: './selected-photo.component.html',
  styleUrls: ['./selected-photo.component.scss'],
})
export class SelectedPhotoComponent implements OnInit {
  @Input() fileList: Array<string> = [];
  @Output() close = new EventEmitter<boolean>();
  @Output() clear = new EventEmitter<Array<string>>();
  @Input() pasteWatermark = false;
  @Input() selectValue: string = 'lowerRight';
  savedImages: Array<string>;
  savedImagesWithoutWatermark: Array<string>;

  constructor() {}

  ngOnInit() {
    this.savedImagesWithoutWatermark = this.fileList;
    this.savedImages = this.fileList;
  }

  selectChanged(position: string) {
    this.fileList = [];
    this.savedImagesWithoutWatermark.forEach((file, index) => {
      watermark([file, '../../assets/images/logo.png'], { type: 'image/jpeg' })
        .dataUrl(watermark.image[position](0.5))
        .then((img: any) => {
          this.fileList.push(img);
        });
    });
  }

  addWatermark() {
    this.pasteWatermark = !this.pasteWatermark;
    if (this.pasteWatermark) {
      this.selectChanged('lowerRight');
    }
  }

  removeWatermark() {
    this.pasteWatermark = !this.pasteWatermark;
    this.fileList = this.savedImages
  }

  closeSelected() {
    this.close.emit(true);
  }

  clearMetadata() {
    this.clear.emit(this.fileList);
  }
}
