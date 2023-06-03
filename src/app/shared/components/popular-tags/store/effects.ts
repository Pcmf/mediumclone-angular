import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PopularTagsService } from "../services/popularTags.service";
import { popularTagsActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { PopularTagType } from "src/app/shared/types/popularTag.type";

export const getPopularTagsEffects = createEffect(
    (
        actions$ = inject(Actions),
        popularTagsdService = inject(PopularTagsService), 
    ) => { 
        return actions$.pipe(
            ofType(popularTagsActions.getPopularTags),
            switchMap(() => {

                return popularTagsdService.getPopularTags().pipe(
                    map((popularTags: PopularTagType[]) => {
                        return popularTagsActions.getPopularTagsSuccess({popularTags});
                    }),
                    catchError(() => {
                        return of(popularTagsActions.getPopularTagsFailure())
                    })
                )
            })
        )
    },
    {functional: true}
)
