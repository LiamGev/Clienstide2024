import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiomeOverviewComponent } from './biome-overview.component';

describe('BiomeOverviewComponent', () => {
  let component: BiomeOverviewComponent;
  let fixture: ComponentFixture<BiomeOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiomeOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BiomeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
