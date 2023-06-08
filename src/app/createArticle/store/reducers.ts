import { createArticleActions } from "./actions";
import { createFeature, createReducer, on } from "@ngrx/store";
import { routerNavigationAction } from "@ngrx/router-store";
import { CreateArticleStateInterface } from "../types/createArticleState.interface";

const initialState: CreateArticleStateInterface = {
    isSubmiting: false,
    validationErrors: null,
}


const createArticleFeature = createFeature({
    name: 'Create article',
    reducer: createReducer(
        initialState,
        on(createArticleActions.createArticle, (state) => ({...state, isSubmiting: true})),
        on(createArticleActions.createArticleSuccess, (state) => ({...state, isSubmiting: false})),
        on(createArticleActions.createArticleFailure, (state, action) => ({...state, isSubmiting: false, validationErrors: action.errors})),
        on(routerNavigationAction, () => initialState)
    )
})

//destructuring
export const {
    name: createArticleFeatureKey,
    reducer: createArticleReducer,
    selectIsSubmiting,
    selectValidationErrors,
} = createArticleFeature;