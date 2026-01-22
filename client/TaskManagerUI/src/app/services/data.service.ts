import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class DataService {
  private apiUrl = 'https://localhost:7177/api/Exec/POST'; 

  constructor(private http: HttpClient) { }

  execute(procedureName: string, parameters: any = {}): Observable<any> {
    const body = { procedureName, parameters };
    return this.http.post(this.apiUrl, body);
  }
  
}
