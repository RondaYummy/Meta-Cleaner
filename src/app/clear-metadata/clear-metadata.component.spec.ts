import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearMetadataComponent } from './clear-metadata.component';

describe('ClearMetadataComponent', () => {
  let component: ClearMetadataComponent;
  let fixture: ComponentFixture<ClearMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearMetadataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
