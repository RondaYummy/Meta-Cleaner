import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selected-photo',
  templateUrl: './selected-photo.component.html',
  styleUrls: ['./selected-photo.component.scss'],
})
export class SelectedPhotoComponent implements OnInit {
  @Input() fileList: Array<ArrayBuffer> = [];
  @Output() close = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    console.log(this.fileList);
  }

  closeSelected() {
    this.close.emit(true);
  }
}
