import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnemyFormComponent } from './enemy-form.component';

describe('EnemyFormComponent', () => {
  let component: EnemyFormComponent;
  let fixture: ComponentFixture<EnemyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnemyFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnemyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
