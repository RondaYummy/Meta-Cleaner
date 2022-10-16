import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-clear-metadata',
  templateUrl: './clear-metadata.component.html',
  styleUrls: ['./clear-metadata.component.scss'],
})
export class ClearMetadataComponent implements OnInit {
  @Input() photoList!: Array<string>;
  @Output() cancel = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  cancelClearMetadata() {
    console.log('Cancel...');
    this.cancel.emit(true);
  }
}
