import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashUploadComponent } from './trash-upload.component';

describe('TrashUploadComponent', () => {
  let component: TrashUploadComponent;
  let fixture: ComponentFixture<TrashUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
