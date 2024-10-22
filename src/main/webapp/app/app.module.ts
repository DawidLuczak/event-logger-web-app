import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import locale from '@angular/common/locales/pl';
import { BrowserModule, Title } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { TranslateModule, TranslateService, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { NgxWebstorageModule, SessionStorageService } from 'ngx-webstorage';
import * as dayjs from 'dayjs';
import { NgbDateAdapter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import './config/dayjs';
import { SharedModule } from 'app/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { EntityRoutingModule } from './entities/entity-routing.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { NgbDateDayjsAdapter } from './config/datepicker-adapter';
import { fontAwesomeIcons } from './config/font-awesome-icons';
import { httpInterceptorProviders } from 'app/core/interceptor/index';
import { translatePartialLoader, missingTranslationHandler } from './config/translation.config';
import { MainComponent } from './layouts/main/main.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputFloatLabelModule } from './layouts/input-float-label/input-float-label.module';
import { CommunityModule } from './entities/community/community.module';
import { DepartmentModule } from './entities/department/department.module';
import { EventModule } from './entities/event/event.module';
import { BannerModule } from './layouts/banner/banner.module';
import { DeleteDialogModule } from './layouts/delete-dialog/delete-dialog.module';
import { NavbarModule } from './layouts/navbar/navbar.module';
import { TextareaFloatLabelModule } from './layouts/textarea-float-label/textarea-float-label.module';
import { LoginModule } from './login/login.module';
import { ToastModule } from 'primeng/toast';
import { OutMouseClickDirective } from './core/out-mouse-click/out-mouse-click.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    DragDropModule,
    CommunityModule,
    EventModule,
    DepartmentModule,
    LoginModule,
    NavbarModule,
    BannerModule,
    ToastModule,
    DeleteDialogModule,
    TextareaFloatLabelModule,
    InputFloatLabelModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    EntityRoutingModule,
    AppRoutingModule,
    // Set this to true to enable service worker (PWA)
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
    HttpClientModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-', caseSensitive: true }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translatePartialLoader,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useFactory: missingTranslationHandler,
      },
    }),
  ],
  providers: [
    OutMouseClickDirective,
    DialogService,
    MessageService,
    Title,
    { provide: LOCALE_ID, useValue: 'pl' },
    { provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter },
    httpInterceptorProviders,
  ],
  declarations: [MainComponent, ErrorComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class AppModule {
  constructor(
    applicationConfigService: ApplicationConfigService,
    iconLibrary: FaIconLibrary,
    dpConfig: NgbDatepickerConfig,
    translateService: TranslateService,
    sessionStorageService: SessionStorageService
  ) {
    applicationConfigService.setEndpointPrefix(SERVER_API_URL);
    registerLocaleData(locale);
    iconLibrary.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = { year: dayjs().subtract(100, 'year').year(), month: 1, day: 1 };
    translateService.setDefaultLang('pl');
    // if user have changed language and navigates away from the application and back to the application then use previously choosed language
    const langKey = sessionStorageService.retrieve('locale') ?? 'pl';
    translateService.use(langKey);
  }
}
