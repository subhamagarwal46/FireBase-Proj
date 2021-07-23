import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveableComponent } from './moveable.component';

describe('MoveableComponent', () => {
  let component: MoveableComponent;
  let fixture: ComponentFixture<MoveableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
