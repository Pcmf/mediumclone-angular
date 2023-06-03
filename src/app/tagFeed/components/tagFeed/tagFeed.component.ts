import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, RouterLink } from "@angular/router";
import { BannerComponent } from "src/app/shared/components/banner/banner.component";
import { FeedComponent } from "src/app/shared/components/feed/feed.component";
import { FeedTogglerComponent } from "src/app/shared/components/feedToggler/feedToggler.component";
import { PopularTagsComponent } from "src/app/shared/components/popular-tags/popular-tags/popular-tags.component";

@Component({
    selector: 'mc-tag-feed',
    templateUrl: './tagFeed.component.html',
    standalone: true,
    imports: [
        CommonModule, 
        RouterLink, 
        FeedComponent, 
        BannerComponent, 
        PopularTagsComponent,
        FeedTogglerComponent,
    ]
})
export class TagFeedComponent implements OnInit {
    apiUrl: string = '';
    tagName: string = '';

    constructor(private route: ActivatedRoute ) {}
    
    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.tagName = params['slug'];
            this.apiUrl = `/articles?tag=${this.tagName}`;
        })
    }
}