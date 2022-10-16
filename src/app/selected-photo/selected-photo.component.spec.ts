import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedPhotoComponent } from './selected-photo.component';

describe('SelectedPhotoComponent', () => {
  let component: SelectedPhotoComponent;
  let fixture: ComponentFixture<SelectedPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
