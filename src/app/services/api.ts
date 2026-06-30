import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Book {
  title: string;
  description?: string | { value: string };
  key: string;
  subjects?: string[];
  covers?: number[];
  cover_i: number;
}
@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://openlibrary.org/search.json?author=Stephen King';

  constructor(private http: HttpClient) { }

  getWorks(): Observable<{ docs: Book[] }> {
    return this.http.get<{ docs: Book[] }>(this.baseUrl);
  }

  getWorkDetails(key: string): Observable<Book> {
    return this.http.get<Book>(`https://openlibrary.org${key}.json`);
  }
}
