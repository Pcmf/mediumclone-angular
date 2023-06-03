import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { popularTagsActions } from "../store/actions";
import { combineLatest } from "rxjs";
import { selectError, selectIsLoading, selectPopularTagsData } from "../store/reducers";
import { CommonModule } from "@angular/common";
import { IsLoadingComponent } from "../../is-loading/is-loading.component";
import { ErrorMessageComponent } from "../../error-message/error-message.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'mc-popular-tags',
    templateUrl: './popular-tags.component.html',
    standalone: true,
    imports: [CommonModule, IsLoadingComponent, ErrorMessageComponent, RouterLink]
})
export class PopularTagsComponent implements OnInit{
    data$ = combineLatest({
        popularTags: this.store.select(selectPopularTagsData),
        isLoading: this.store.select(selectIsLoading),
        error: this.store.select(selectError),
    })
    constructor(private store: Store) {}

    ngOnInit() {
        this.store.dispatch(popularTagsActions.getPopularTags());

    }
}