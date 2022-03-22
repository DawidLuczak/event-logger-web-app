import { HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';

import { IEvent } from '../event.model';
import { EventFormComponent } from '../form/event-form.component';
import { EventService } from '../service/event.service';

@Component({
  selector: 'jhi-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  event: IEvent | null = null;
  isModalDialogOpen: boolean;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private dialogService: DialogService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.isModalDialogOpen = false;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ event }) => {
      this.event = event;
    });
  }

  previousState(): void {
    window.history.back();
  }

  openEditDialog(event: IEvent): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(EventFormComponent, {
      header: 'Edytuj event',
      showHeader: true,
      width: '50%',
      modal: true,
      closable: false,
      data: {
        event,
      },
    });
    ref.onClose.subscribe(
      subject => {
        if (subject) {
          this.eventService.update(subject).subscribe(
            (res: HttpResponse<IEvent>) => {
              if (res.body) {
                const index = this.eventService.events.getValue().findIndex(entity => entity.id === res.body!.id);
                this.eventService.events.getValue()[index] = res.body;

                console.debug(`Event updated: ${res.body}`);
                this.isModalDialogOpen = false;
                this.changeDetector.detectChanges();
              } else {
                console.debug(`Event update: failed`);
                this.isModalDialogOpen = false;
                this.changeDetector.detectChanges();
              }
            },
            () => {
              console.debug(`Event update: error`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            }
          );
        } else {
          console.debug(`Event update: canceled`);
          this.isModalDialogOpen = false;
          this.changeDetector.detectChanges();
        }
      },
      () => {
        console.debug(`Event update dialog: error`);
        this.isModalDialogOpen = false;
        this.changeDetector.detectChanges();
      }
    );
  }
}
