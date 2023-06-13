import { Component, OnInit } from "@angular/core";
import { ArticleFormComponent } from 'src/app/shared/components/articleForm/articleForm.component'
import { ArticleFormValuesInterface } from "src/app/shared/components/articleForm/types/articleFormValues.interface";
import { CommonModule } from "@angular/common";
import { Store, select } from "@ngrx/store";
import { selectIsSubmitting, selectValidationErrors, selectIsLoading, selectArticle } from "../../store/reducers";
import { Observable, combineLatest, filter, map } from "rxjs";
import { editArticleActions } from "../../store/actions";
import { ArticleRequestInterface } from "src/app/shared/types/articleRequest.interface";
import { IsLoadingComponent } from "../../../shared/components/is-loading/is-loading.component";
import { ActivatedRoute } from "@angular/router";
import { ArticleInterface } from "src/app/shared/types/article.interface";

@Component({
    selector: 'mc-edit-article',
    templateUrl: './editArticle.component.html',
    standalone: true,
    imports: [
        ArticleFormComponent,
        CommonModule,
        IsLoadingComponent,

    ]
})
export class EditArticleComponent implements OnInit {


    initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
        select(selectArticle),
        filter((article): article is ArticleInterface => article !== null),
        map((article: ArticleInterface) => {
            console.log(article);
            return {
                title: article.title,
                description: article.description,
                body: article.body,
                tagList: article.tagList,   
            }
        })
    )

    slug = this.router.snapshot.paramMap.get('slug') ?? '';

    data$ = combineLatest({
        isLoading: this.store.select(selectIsLoading),
        isSubmitting: this.store.select(selectIsSubmitting),
        backendErrors: this.store.select(selectValidationErrors),
        initialValues: this.initialValues$
    })

    constructor(private store: Store, private router: ActivatedRoute) {}

    ngOnInit() {
        this.store.dispatch(editArticleActions.getArticle({slug: this.slug}))
    }

    onSubmit(articleFormValues: ArticleFormValuesInterface) {
        const request: ArticleRequestInterface = {
            article: articleFormValues
        }

        this.store.dispatch(editArticleActions.editArticle({request, slug: this.slug}))
    }
}