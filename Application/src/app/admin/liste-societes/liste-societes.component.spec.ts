import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSocietesComponent } from './liste-societes.component';

describe('ListeSocietesComponent', () => {
  let component: ListeSocietesComponent;
  let fixture: ComponentFixture<ListeSocietesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeSocietesComponent]
    });
    fixture = TestBed.createComponent(ListeSocietesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
