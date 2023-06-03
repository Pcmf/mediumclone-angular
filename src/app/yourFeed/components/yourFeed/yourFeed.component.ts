import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { BannerComponent } from "src/app/shared/components/banner/banner.component";
import { FeedComponent } from "src/app/shared/components/feed/feed.component";
import { FeedTogglerComponent } from "src/app/shared/components/feedToggler/feedToggler.component";
import { PopularTagsComponent } from "src/app/shared/components/popular-tags/popular-tags/popular-tags.component";

@Component({
    selector: 'mc-your-feed',
    templateUrl: './yourFeed.component.html',
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
export class YourFeedComponent{
    apiUrl = '/articles/feed';
    
}