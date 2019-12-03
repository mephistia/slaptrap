import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GameOverPage } from './game-over.page';

describe('GameOverPage', () => {
  let component: GameOverPage;
  let fixture: ComponentFixture<GameOverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameOverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GameOverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
