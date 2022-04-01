import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodetailsComponent } from './nodetails.component';

describe('NodetailsComponent', () => {
  let component: NodetailsComponent;
  let fixture: ComponentFixture<NodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
