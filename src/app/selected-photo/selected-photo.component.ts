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
  savedImagesWithoutWatermark: Array<string>;

  constructor() {}

  ngOnInit() {
    this.savedImagesWithoutWatermark = this.fileList;
  }

  selectChanged(position: string) {
    this.fileList = [];
    this.savedImagesWithoutWatermark.forEach((file, index) => {
      watermark([file, 'https://i.ibb.co/pny3tVS/logo.png'])
        .dataUrl(watermark.image[position](0.5))
        .then((img: any) => {
          this.fileList.push(img);
        });
    });
  }

  changeCheckbox() {
    this.pasteWatermark = !this.pasteWatermark;
    if (this.pasteWatermark) {
      this.selectChanged('lowerRight');
    }
  }

  closeSelected() {
    this.close.emit(true);
  }

  clearMetadata() {
    this.clear.emit(this.fileList);
  }
}
