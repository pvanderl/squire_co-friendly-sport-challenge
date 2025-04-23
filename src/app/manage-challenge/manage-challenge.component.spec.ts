import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChallengeComponent } from './manage-challenge.component';

describe('ManageChallengeComponent', () => {
  let component: ManageChallengeComponent;
  let fixture: ComponentFixture<ManageChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageChallengeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
