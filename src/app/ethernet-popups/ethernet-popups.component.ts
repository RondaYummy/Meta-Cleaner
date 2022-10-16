import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ethernet-popups',
  templateUrl: './ethernet-popups.component.html',
  styleUrls: ['./ethernet-popups.component.scss'],
})
export class EthernetPopupsComponent implements OnInit {
  @Input() isOnline!: boolean;
  @Input() isWebVersion!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
