import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnemyOverviewComponent } from './enemy-overview.component';

describe('EnemyOverviewComponent', () => {
  let component: EnemyOverviewComponent;
  let fixture: ComponentFixture<EnemyOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnemyOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnemyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
