import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErreurRouteComponent } from './erreur-route.component';

describe('ErreurRouteComponent', () => {
  let component: ErreurRouteComponent;
  let fixture: ComponentFixture<ErreurRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErreurRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErreurRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
