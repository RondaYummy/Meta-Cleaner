import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitSelectedPhotoComponent } from './submit-selected-photo.component';

describe('SubmitSelectedPhotoComponent', () => {
  let component: SubmitSelectedPhotoComponent;
  let fixture: ComponentFixture<SubmitSelectedPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmitSelectedPhotoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitSelectedPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
