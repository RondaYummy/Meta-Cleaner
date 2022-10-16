import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selected-photo',
  templateUrl: './selected-photo.component.html',
  styleUrls: ['./selected-photo.component.scss'],
})
export class SelectedPhotoComponent implements OnInit {
  @Input() fileList: Array<string> = [];
  @Output() close = new EventEmitter<boolean>();
  @Output() clear = new EventEmitter<Array<string>>();

  constructor() {}

  ngOnInit(): void {}

  closeSelected() {
    this.close.emit(true);
  }

  clearMetadata() {
    this.clear.emit(this.fileList);
  }
}
