import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEvent } from '../event.model';

import { EventService } from '../service/event.service';
import { ParseLinks } from 'app/core/util/parse-links.service';
import { DialogService } from 'primeng/dynamicdialog';
import { EventFormComponent } from '../form/event-form.component';
import { DeleteDialogComponent } from 'app/layouts/delete-dialog/delete-dialog.component';

@Component({
  selector: 'jhi-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent implements OnInit {
  events: IEvent[];
  isLoading = false;
  isModalDialogOpen: boolean;

  constructor(
    protected eventService: EventService,
    protected modalService: NgbModal,
    protected parseLinks: ParseLinks,
    private dialogService: DialogService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.events = [];
    this.isModalDialogOpen = false;
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.eventService.query().subscribe(data => {
      this.events = data.body!;
      this.changeDetector.detectChanges();
    });
  }

  openCreatorDialog(): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(EventFormComponent, {
      header: 'Dodaj event',
      showHeader: true,
      width: '70%',
      height: '90%',
      modal: true,
      closable: false,
    });
    ref.onClose.subscribe(
      subject => {
        if (subject) {
          this.eventService.create(subject).subscribe(
            (res: HttpResponse<IEvent>) => {
              if (res.body) {
                this.loadAll();
                console.debug(`Event created: ${res}`);
                this.isModalDialogOpen = false;
                this.changeDetector.detectChanges();
              } else {
                console.debug(`Event create: failed`);
                this.isModalDialogOpen = false;
                this.changeDetector.detectChanges();
              }
            },
            () => {
              console.debug(`Event create: error`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            }
          );
        } else {
          console.debug(`Event create: canceled`);
          this.isModalDialogOpen = false;
          this.changeDetector.detectChanges();
        }
      },
      () => {
        console.debug(`Event create dialog: error`);
        this.isModalDialogOpen = false;
        this.changeDetector.detectChanges();
      }
    );
  }

  openEditDialog(event: IEvent): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(EventFormComponent, {
      header: 'Edytuj event',
      showHeader: true,
      width: '70%',
      height: '90%',
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
                this.loadAll();
                console.debug(`Event updated: ${res}`);
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

  delete(event: IEvent): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(DeleteDialogComponent, {
      header: 'Usuń community',
      showHeader: true,
      width: '50%',
      modal: true,
      closable: false,
      data: {
        entity: event,
        text: ['Czy chcesz usunąć department o nazwie:', event.title!],
      },
    });
    ref.onClose.subscribe(
      (id: number) => {
        if (id) {
          this.eventService.delete(id).subscribe(
            () => {
              this.loadAll();
              console.debug(`Event deleted: ${id}.`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            },
            () => {
              console.debug(`Event delete: error`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            }
          );
        } else {
          console.debug(`Event delete: canceled`);
          this.isModalDialogOpen = false;
          this.changeDetector.detectChanges();
        }
      },
      () => {
        console.debug(`Event delete dialog: error`);
        this.isModalDialogOpen = false;
        this.changeDetector.detectChanges();
      }
    );
  }

  trackId(index: number, item: IEvent): number {
    return item.id!;
  }
}
