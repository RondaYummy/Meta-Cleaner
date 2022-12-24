import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthernetPopupsComponent } from './ethernet-popups.component';

describe('EthernetPopupsComponent', () => {
  let component: EthernetPopupsComponent;
  let fixture: ComponentFixture<EthernetPopupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EthernetPopupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EthernetPopupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
