import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private baseUrl = 'http://localhost:3000/posts'; // URL to web API

  constructor(private http: HttpClient) { }

  getPosts(page: number, pageSize: number): Observable<any> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }
    return this.http.get<any>(this.baseUrl, { params })
  }
}