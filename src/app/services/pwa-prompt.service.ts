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
  platform$ = new Subject<Platform>();
  constructor(private platform: Platform) {}

  initPwaPrompt() {
    this.platform$.next(this.platform);
    let deviceType: DeviceType;
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        deviceType = 'android';
        this.deviceType$.next(deviceType);
        this.openPromptComponent(deviceType);
      });
    } else if (this.platform.IOS) {
      const isInStandaloneMode =
        'standalone' in window.navigator &&
        window.matchMedia('(display-mode: standalone)').matches;
      if (!isInStandaloneMode) {
        deviceType = 'ios';
        this.openPromptComponent(deviceType);
        this.deviceType$.next(deviceType);
      }
    } else if (this.platform.isBrowser) {
      deviceType = 'browser';
      if (this.platform.WEBKIT) {
        deviceType = 'webkit';
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

      if (this.platform.BLINK) {
        deviceType = 'blink';
      }

      if (this.platform.SAFARI) {
        deviceType = 'safari';
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
