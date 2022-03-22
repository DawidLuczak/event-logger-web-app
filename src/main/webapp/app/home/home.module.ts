import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { BannerModule } from 'app/layouts/banner/banner.module';

@NgModule({
  imports: [BannerModule, SharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
