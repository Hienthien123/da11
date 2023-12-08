import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChucvuComponent } from './form-chucvu.component';

describe('FormChucvuComponent', () => {
  let component: FormChucvuComponent;
  let fixture: ComponentFixture<FormChucvuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormChucvuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormChucvuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
