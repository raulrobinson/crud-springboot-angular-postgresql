import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDetailsComponent } from './usuarios-details.component';

describe('TutorialDetailsComponent', () => {
  let component: UsuarioDetailsComponent;
  let fixture: ComponentFixture<UsuarioDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
