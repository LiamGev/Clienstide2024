import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Biome as BiomeDto } from '@project/libs/shared/api';

@Injectable({
  providedIn: 'root'
})
export class BiomeService {
  private apiUrl = 'https://nodeappcside-hjajhkhxdzagdyby.northeurope-01.azurewebsites.net/api/biome';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getAllBiomes(): Observable<BiomeDto[]> {
    return this.http.get<{ results: BiomeDto[] }>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.results)
    );
  }

  getBiomeById(id: string): Observable<BiomeDto> {
    return this.http.get<{ results: BiomeDto }>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.results)
    );
  }

  createBiome(biome: BiomeDto): Observable<BiomeDto> {
    return this.http.post<BiomeDto>(this.apiUrl, biome, { headers: this.getAuthHeaders() });
  }

  updateBiome(id: string, biome: Partial<BiomeDto>): Observable<BiomeDto> {
    return this.http.patch<BiomeDto>(`${this.apiUrl}/${id}`, biome, { headers: this.getAuthHeaders() });
  }

  deleteBiome(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
