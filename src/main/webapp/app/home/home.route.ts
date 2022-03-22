import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';

import { HomeComponent } from './home.component';

export const HOME_ROUTE: Route = {
  path: 'home',
  component: HomeComponent,
  data: {
    pageTitle: 'home.title',
  },
  canActivate: [UserRouteAccessService],
};
