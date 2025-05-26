import { Component, Input, OnInit, OnInit } from '@angular/core';
import { Post } from '../post';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { User } from 'src/app/users/user.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-details',
  imports: [MatCardModule, MatButtonModule, MatListModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {

  @Input({ required: true }) post!: Post;
  @Input() user: User | null = null;

  //comments$: Observable<Comment[]>;

  constructor (private route: ActivatedRoute, private postsService: PostsService) {

  }

  ngOnInit(): void {
    // this.comments$ = this.postsService.getCommentsById(Number(this.route.snapshot.paramMap.get('id')))
    //   .subscribe();
  }
}
