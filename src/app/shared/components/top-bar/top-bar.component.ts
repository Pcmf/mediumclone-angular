import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { authActions } from 'src/app/auth/store/actions';
import { selectCurrentUser } from 'src/app/auth/store/reducers';

@Component({
  selector: 'mc-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  standalone: true,
  imports: [CommonModule ,RouterLink]
})
  export class TopBarComponent {
    data$ = combineLatest({
      currentUser: this.store.select(selectCurrentUser)
    })

    constructor(private store: Store) {}

    logOut() {
      this.store.dispatch(authActions.logout());
    }
}
