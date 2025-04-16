import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiomeDetailsComponent } from './biome-details.component';

describe('BiomeDetailsComponent', () => {
  let component: BiomeDetailsComponent;
  let fixture: ComponentFixture<BiomeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiomeDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BiomeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
