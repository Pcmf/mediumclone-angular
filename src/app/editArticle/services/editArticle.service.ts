import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ArticleInterface } from "src/app/shared/types/article.interface";
import { ArticleRequestInterface } from "src/app/shared/types/articleRequest.interface";
import { ArticleResponseInterface } from "src/app/shared/types/articleResponse.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class EditArticleService {

    constructor(private http: HttpClient) {}

    editArticle(
        slug: string,
        articleRequest: ArticleRequestInterface
    ): Observable<ArticleInterface> {
        
        const fulUrl = environment.apiUrl + '/articles/' + slug ;

        return this.http.put<ArticleResponseInterface>(fulUrl, articleRequest).pipe(
            map(response => response.article)
        )

    }
}