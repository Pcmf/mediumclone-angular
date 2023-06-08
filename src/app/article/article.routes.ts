import { Route } from "@angular/router";
import { ArticleComponent } from "./components/article/article.component";
import * as articleEffects from './store/effects';
import { provideEffects } from "@ngrx/effects";
import { articleFeatureKey, articleReducer } from "./store/reducers";
import { provideState } from "@ngrx/store";
import { ArticlesService } from "./services/article.service";

export const routes: Route[] = [
    {
        path: '',
        component: ArticleComponent,
        providers: [
            provideEffects(articleEffects),
            provideState(articleFeatureKey, articleReducer),
            ArticlesService
        ]
    }
]