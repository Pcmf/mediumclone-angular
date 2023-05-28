import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FeedComponent } from "src/app/shared/components/feed/feed.component";

@Component({
    selector: 'mc-global-feed',
    templateUrl: './globalFeed.component.html',
    standalone: true,
    imports: [CommonModule, RouterLink, FeedComponent]
})
export class GlobalFeedComponent{}