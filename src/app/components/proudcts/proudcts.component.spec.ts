import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProudctsComponent } from './proudcts.component';

describe('ProudctsComponent', () => {
  let component: ProudctsComponent;
  let fixture: ComponentFixture<ProudctsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProudctsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProudctsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
