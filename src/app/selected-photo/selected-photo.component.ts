import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
const watermark = require('watermarkjs');
import * as ConvertImage from '../js-convert-images';

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
    const converter: any = new ConvertImage.ConvertImage();
    const optionsPng = {
      name: 'taken-image',
      download: false,
      width: 1280,
      height: 1280,
      type: 'png',
    };
    for (let index = 0; index < this.fileList.length; index++) {
      const element = this.fileList[index];
      converter.convertImageFromUrl(element, optionsPng).then((png: string) => {
        this.fileList[index] = png;
      });
    }

    this.savedImagesWithoutWatermark = this.fileList;
    this.savedImages = this.fileList;
  }

  selectChanged(position: string) {
    this.savedImagesWithoutWatermark.forEach((file, index) => {
      watermark([file, '../../assets/images/logo.png'], { type: 'image/png' })
        .dataUrl(watermark.image[position](0.5))
        .then((img: any) => {
          this.fileList[index] = img;
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
    this.fileList = this.savedImages;
  }

  closeSelected() {
    this.close.emit(true);
  }

  clearMetadata() {
    this.clear.emit(this.fileList);
  }
}
