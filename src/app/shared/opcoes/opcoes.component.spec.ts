import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpcoesComponent } from './opcoes.component';

describe('OpcoesComponent', () => {
  let component: OpcoesComponent;
  let fixture: ComponentFixture<OpcoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcoesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpcoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
