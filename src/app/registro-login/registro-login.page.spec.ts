import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroLoginPage } from './registro-login.page';

describe('RegistroLoginPage', () => {
  let component: RegistroLoginPage;
  let fixture: ComponentFixture<RegistroLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
