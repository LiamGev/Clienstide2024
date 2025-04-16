import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiomeFormComponent } from './biome-form.component';

describe('BiomeFormComponent', () => {
  let component: BiomeFormComponent;
  let fixture: ComponentFixture<BiomeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiomeFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BiomeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
