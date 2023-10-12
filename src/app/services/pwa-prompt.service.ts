import { Injectable, ViewContainerRef } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject, Subject, take, timer } from 'rxjs';
import { PromptComponent } from '../components/prompt/prompt.component';
import { DeviceType } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class PwaPromptService {
  private promptEvent: any;
  deviceType$ = new Subject<DeviceType>();
  constructor(private platform: Platform) {}

  initPwaPrompt() {
    let deviceType: DeviceType;
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        deviceType = 'android';
        this.deviceType$.next(deviceType);
        this.openPromptComponent(deviceType);
      });
    }
    if (this.platform.IOS) {
      const isInStandaloneMode =
        'standalone' in window.navigator &&
        window.matchMedia('(display-mode: standalone)').matches;
      if (!isInStandaloneMode) {
        deviceType = 'ios';
        this.openPromptComponent(deviceType);
        this.deviceType$.next(deviceType);
      }
    }
    if (this.platform.isBrowser) {
      deviceType = 'browser';
      if (this.platform.SAFARI) {
        deviceType = 'safari';
      }

      if (this.platform.EDGE) {
        deviceType = 'edge';
      }

      if (this.platform.TRIDENT) {
        deviceType = 'trident';
      }

      if (this.platform.FIREFOX) {
        deviceType = 'firefox';
      }

      if (this.platform.WEBKIT) {
        deviceType = 'webkit';
      }

      if (this.platform.BLINK) {
        deviceType = 'blink';
      }
      this.deviceType$.next(deviceType);
      this.openPromptComponent(deviceType);
    }
  }

  openPromptComponent(platform: DeviceType) {
    timer(3000)
      .pipe(take(1))
      .subscribe(() => {});
  }
}
