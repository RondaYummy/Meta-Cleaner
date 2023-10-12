import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { DeviceType } from 'src/app/entities';
import { PwaPromptService } from 'src/app/services/pwa-prompt.service';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss'],
})
export class PromptComponent implements OnInit {
  @Output() installPwa = new EventEmitter<void>();
  title: string;
  deviceType: DeviceType;
  message: string;
  showInstructions$ = new BehaviorSubject<boolean>(false);
  private _unsubscribe$ = new Subject<void>();
  private readonly _pwaPromptService = inject(PwaPromptService);

  ngOnInit(): void {
    this._pwaPromptService.deviceType$
      .asObservable()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res) => {
        this.deviceType = res;
        this.showInstructions$.next(true);
      });
    this._pwaPromptService.initPwaPrompt();
  }
}
