import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { BannerComponent } from "src/app/shared/components/banner/banner.component";
import { FeedComponent } from "src/app/shared/components/feed/feed.component";

@Component({
    selector: 'mc-global-feed',
    templateUrl: './globalFeed.component.html',
    standalone: true,
    imports: [CommonModule, RouterLink, FeedComponent, BannerComponent]
})
export class GlobalFeedComponent{
    apiUrl = '/articles';
}