import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBookComponent } from './top-book.component';

describe('TopBookComponent', () => {
  let component: TopBookComponent;
  let fixture: ComponentFixture<TopBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
