import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTComponent } from './users-t.component';

describe('UsersTComponent', () => {
  let component: UsersTComponent;
  let fixture: ComponentFixture<UsersTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersTComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
