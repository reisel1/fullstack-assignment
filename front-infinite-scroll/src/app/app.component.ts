import { Component, OnInit } from '@angular/core';
import { Post, PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts: Post[] = []
  page: number = 1
  pageSize: number = 50
  isInfiniteScrollDisabled: boolean = false
  isLoadingPosts: boolean = false

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.loadPosts(this.page, this.pageSize)
  }

  loadPosts(page: number, pageSize: number) {
    this.isLoadingPosts = true
    this.postsService.getPosts(page, pageSize).subscribe(posts => {
      this.posts = this.posts.concat(posts)
      this.isLoadingPosts = false
      if (posts.length === 0) {
        this.isInfiniteScrollDisabled = true
      }
    })
  }

  nextPage() {
    this.page++
    this.loadPosts(this.page, this.pageSize)
  }
}