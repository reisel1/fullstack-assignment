import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts: any[] = [];

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.loadPosts(1, 10) // Load page 1 with page size 10
  }

  loadPosts(page: number, pageSize: number): void {
    this.postsService.getPosts(page, pageSize).subscribe(
      data => {
        this.posts = data
      },
      error => {
        console.error('There was an error!', error)
      }
    )
  }
}