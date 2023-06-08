import { Component, OnInit } from "@angular/core";
import { articleActions } from "../../store/actions";
import { Store } from "@ngrx/store";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { combineLatest, filter, map } from "rxjs";
import { selectError, selectIsLoading, selectArticleData } from "../../store/reducers";
import { selectCurrentUser } from "src/app/auth/store/reducers";
import { CurrentUserInterface } from "src/app/shared/currentUserInterface";
import { CommonModule } from "@angular/common";
import { ErrorMessageComponent } from "../../../shared/components/error-message/error-message.component";
import { IsLoadingComponent } from "src/app/shared/components/is-loading/is-loading.component";
import { TagListComponent } from "../../../shared/components/tagList/tagList.component";

@Component({
    selector: 'mc-article',
    templateUrl: './article.component.html',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        ErrorMessageComponent,
        IsLoadingComponent,
        TagListComponent
    ]
})
export class ArticleComponent implements OnInit {
    slug = this.route.snapshot.paramMap.get('slug') ?? '';
    isAuthor$ = combineLatest({
        article: this.store.select(selectArticleData),
        currentUser: this.store.select(selectCurrentUser).pipe(
            filter((currentUser): currentUser is CurrentUserInterface | null => currentUser !== undefined)
        )
    }).pipe(
        map(({article, currentUser}) => {
            if(!article || !currentUser) { 
            return false
        }
        return article.author.username === currentUser.username
        })
    )
    data$ = combineLatest(
        {
            isLoading: this.store.select(selectIsLoading),
            error: this.store.select(selectError),
            article: this.store.select(selectArticleData),
            isAuthor: this.isAuthor$
        }
    )

    constructor(private store: Store, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.store.dispatch(articleActions.getArticle({slug: this.slug}));
    }

    public deleteArticle(): void {
        this.store.dispatch(articleActions.deleteArticle({slug: this.slug}));
    }

}