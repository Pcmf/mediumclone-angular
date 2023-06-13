import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { BackendErrorsInterface } from "src/app/shared/backendErrors.interface";
import { ArticleInterface } from "src/app/shared/types/article.interface";
import { ArticleRequestInterface } from "src/app/shared/types/articleRequest.interface";

export const editArticleActions = createActionGroup({
    source: 'edit article',
    events: {
        'get article': props<{slug: string}>(),
        'get article success': props<{article: ArticleInterface}>(),
        'get article failure': emptyProps(),

        'edit article': props<{request: ArticleRequestInterface, slug: string}>(),
        'edit article success': props<{article: ArticleInterface}>(),
        'edit article failure': props<{errors: BackendErrorsInterface}>(),
    }
})