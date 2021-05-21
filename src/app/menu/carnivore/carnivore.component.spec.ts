import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnivoreComponent } from './carnivore.component';

describe('CarnivoreComponent', () => {
  let component: CarnivoreComponent;
  let fixture: ComponentFixture<CarnivoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarnivoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarnivoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
