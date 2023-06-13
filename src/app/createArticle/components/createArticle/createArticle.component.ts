import { Component } from "@angular/core";
import { ArticleFormComponent } from "../../../shared/components/articleForm/articleForm.component";
import { ArticleFormValuesInterface } from "src/app/shared/components/articleForm/types/articleFormValues.interface";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { selectIsSubmitting, selectValidationErrors } from "../../store/reducers";
import { combineLatest } from "rxjs";
import { createArticleActions } from "../../store/actions";
import { ArticleRequestInterface } from "src/app/shared/types/articleRequest.interface";

@Component({
    selector: 'mc-create-article',
    templateUrl: './createArticle.component.html',
    standalone: true,
    imports: [
        ArticleFormComponent,
        CommonModule,
    ]
})
export class CreateArticleComponent{
    initialValues = {
        title: '',
        description: '',
        body: '',
        tagList: [],
    };


    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        backendErrors: this.store.select(selectValidationErrors),
    })

    constructor(private store: Store) {}

    onSubmit(articleFormValues: ArticleFormValuesInterface) {
        const request: ArticleRequestInterface = {
            article: articleFormValues
        }

        this.store.dispatch(createArticleActions.createArticle({request}))
    }
}