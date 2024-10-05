import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelasComponent } from './tabelas.component';

describe('TabelasComponent', () => {
  let component: TabelasComponent;
  let fixture: ComponentFixture<TabelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
