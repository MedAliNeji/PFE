import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEntrepriseComponent } from './profile-entreprise.component';

describe('ProfileEntrepriseComponent', () => {
  let component: ProfileEntrepriseComponent;
  let fixture: ComponentFixture<ProfileEntrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileEntrepriseComponent]
    });
    fixture = TestBed.createComponent(ProfileEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
