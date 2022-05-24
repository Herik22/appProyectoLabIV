import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaTesoroComponent } from './busqueda-tesoro.component';

describe('BusquedaTesoroComponent', () => {
  let component: BusquedaTesoroComponent;
  let fixture: ComponentFixture<BusquedaTesoroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaTesoroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaTesoroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
