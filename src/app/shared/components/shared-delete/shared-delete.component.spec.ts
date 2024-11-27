import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDeleteComponent } from './shared-delete.component';

describe('SharedDeleteComponent', () => {
  let component: SharedDeleteComponent;
  let fixture: ComponentFixture<SharedDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedDeleteComponent]
    });
    fixture = TestBed.createComponent(SharedDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
