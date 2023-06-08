import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { articleActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { ArticlesService as SharedArticleService } from "src/app/shared/services/article.service";
import { ArticleInterface } from "src/app/shared/types/article.interface";
import { ArticlesService } from "src/app/article/services/article.service";
import { Router } from "@angular/router";

export const getArticleEffects = createEffect(
    (
        actions$ = inject(Actions),
        articleService = inject(SharedArticleService), 
    ) => { 
        return actions$.pipe(
            ofType(articleActions.getArticle),
            switchMap(({slug}) => {

                return articleService.getArticle(slug).pipe(
                    map((article: ArticleInterface) => {
                        return articleActions.getArticleSuccess({ article });
                    }),
                    catchError(() => {
                        return of(articleActions.getArticleFailure())
                    })
                )
            })
        )
    },
    {functional: true}
)

export const deleteArticleEffects = createEffect(
    (
        actions$ = inject(Actions),
        articleService = inject(ArticlesService), 
    ) => { 
        return actions$.pipe(
            ofType(articleActions.deleteArticle),
            switchMap(({slug}) => {

                return articleService.deleteArticle(slug).pipe(
                    map(() => {
                        return articleActions.deleteArticleSuccess();
                    }),
                    catchError(() => {
                        return of(articleActions.deleteArticleFailure())
                    })
                )
            })
        )
    },
    {functional: true}
)

export const redirectAfterDeleteEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(articleActions.deleteArticleSuccess), 
            tap(() => {
                router.navigateByUrl('/')
            })
        )
    },
    {
        functional: true, dispatch: false
    }
)
