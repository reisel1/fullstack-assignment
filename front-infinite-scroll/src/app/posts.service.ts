import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Post {
  _id: string
  user_name: string
  email: string
  content: string
  created_at: string
  tags: string[]
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private baseUrl = 'http://localhost:3000/posts'; // URL to web API

  constructor(private http: HttpClient) { }

  getPosts(page: number, pageSize: number): Observable<Post[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }
    return this.http.get<any>(this.baseUrl, { params }).pipe(
      delay(1000) // Delay of 1 second
    )
}
}