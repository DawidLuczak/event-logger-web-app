import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { BackdropModule } from 'app/layouts/backdrop/backdrop.module';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  exports: [
    InputTextModule,
    FormsModule,
    CommonModule,
    NgbModule,
    InfiniteScrollModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TranslateModule,
    TableModule,
    BackdropModule,
    AccordionModule,
    ButtonModule,
    DynamicDialogModule,
    DropdownModule,
  ],
})
export class SharedLibsModule {}
