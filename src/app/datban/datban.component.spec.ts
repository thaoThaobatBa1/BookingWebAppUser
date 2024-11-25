import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatbanComponent } from './datban.component';

describe('DatbanComponent', () => {
  let component: DatbanComponent;
  let fixture: ComponentFixture<DatbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatbanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
