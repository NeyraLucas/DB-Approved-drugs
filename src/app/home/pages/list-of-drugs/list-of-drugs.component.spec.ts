import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDrugsComponent } from './list-of-drugs.component';

describe('ListOfDrugsComponent', () => {
  let component: ListOfDrugsComponent;
  let fixture: ComponentFixture<ListOfDrugsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfDrugsComponent],
    });
    fixture = TestBed.createComponent(ListOfDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
