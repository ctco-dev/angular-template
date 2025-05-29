import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Post } from "../models/post.model";
import { Comment } from "../models/comment.model";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private url = environment.apiUrl + '/comments';

    constructor(private http: HttpClient) { }

    getByPost(post: Post): Observable<Comment[]> {
        return this.http
            .get<Comment[]>(`${this.url}/?postId=${post.id}`)
            .pipe(catchError(this.handleError));
    }

    private handleError({ status }: HttpErrorResponse) {
        return throwError(
            () => `${status}: ERROR - Unable to fetch posts`
        );
    }
}