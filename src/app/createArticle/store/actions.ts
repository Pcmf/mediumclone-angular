import { createActionGroup, props } from "@ngrx/store";
import { BackendErrorsInterface } from "src/app/shared/backendErrors.interface";
import { ArticleInterface } from "src/app/shared/types/article.interface";
import { ArticleRequestInterface } from "src/app/shared/types/articleRequest.interface";

export const createArticleActions = createActionGroup({
    source: 'create article',
    events: {
        'create article': props<{request: ArticleRequestInterface}>(),
        'create article success': props<{article: ArticleInterface}>(),
        'create article failure': props<{errors: BackendErrorsInterface}>(),
    }
})