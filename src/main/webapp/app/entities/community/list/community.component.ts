import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Community, ICommunity } from '../community.model';
import { CommunityService } from '../service/community.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CommunityFormComponent } from '../form/community-form.component';
import { DeleteDialogComponent } from 'app/layouts/delete-dialog/delete-dialog.component';

@Component({
  selector: 'jhi-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityComponent implements OnInit {
  communities!: ICommunity[];
  isLoading = false;
  isModalDialogOpen: boolean;

  constructor(
    protected communityService: CommunityService,
    protected modalService: NgbModal,
    private dialogService: DialogService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.isModalDialogOpen = false;
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.communityService.query().subscribe(data => {
      this.communities = data.body!;
      this.changeDetector.detectChanges();
    });
  }

  trackId(index: number, item: ICommunity): number {
    return item.id!;
  }

  delete(community: ICommunity): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(DeleteDialogComponent, {
      header: 'Usuń community',
      showHeader: true,
      width: '50%',
      modal: true,
      closable: false,
      data: {
        entity: community,
        text: ['Czy chcesz usunąć community o nazwie:', community.title!],
      },
    });
    ref.onClose.subscribe(
      (id: number) => {
        if (id) {
          this.communityService.delete(id).subscribe(
            () => {
              console.debug(`Community deleted: ${id}.`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            },
            () => {
              console.debug(`Community delete: error`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            }
          );
        } else {
          console.debug(`Community delete: cancelled`);
          this.isModalDialogOpen = false;
          this.changeDetector.detectChanges();
        }
      },
      () => {
        console.debug(`Community delete dialog: error`);
        this.isModalDialogOpen = false;
        this.changeDetector.detectChanges();
      }
    );
  }

  openEditDialog(community: Community): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(CommunityFormComponent, {
      header: 'Edytuj community',
      showHeader: true,
      width: '70%',
      height: '90%',
      modal: true,
      closable: false,
      data: {
        community,
      },
    });
    ref.onClose.subscribe(
      subject => {
        if (subject) {
          this.communityService.update(subject).subscribe(
            res => {
              if (res.body) {
                const index = this.communityService.communities.getValue().findIndex(object => object.id === community.id);
                this.communityService.communities.getValue()[index] = res.body;

                console.debug(`Community updated: ${res.body.id}`);
                this.isModalDialogOpen = false;
                this.changeDetector.detectChanges();
              } else {
                console.debug('Community update: failed');
                this.isModalDialogOpen = false;
                this.changeDetector.detectChanges();
              }
            },
            () => {
              console.debug(`Community update: error`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            }
          );
        } else {
          console.debug('Community update: canceled');
          this.isModalDialogOpen = false;
          this.changeDetector.detectChanges();
        }
      },
      () => {
        console.debug(`Community update: error`);
        this.isModalDialogOpen = false;
        this.changeDetector.detectChanges();
      }
    );
  }

  openCreatorDialog(): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(CommunityFormComponent, {
      header: 'Edytuj community',
      showHeader: true,
      width: '70%',
      height: '90%',
      modal: true,
      closable: false,
    });
    ref.onClose.subscribe(
      subject => {
        if (subject) {
          this.communityService.create(subject).subscribe(
            res => {
              if (res.body) {
                this.communityService.communities.getValue().push(res.body);
                console.debug(`Community created: ${res.body.id}`);
                this.isModalDialogOpen = false;
                this.changeDetector.detectChanges();
              } else {
                console.debug('Community create: failed');
                this.isModalDialogOpen = false;
                this.changeDetector.detectChanges();
              }
            },
            () => {
              console.debug(`Community delete: error`);
              this.isModalDialogOpen = false;
              this.changeDetector.detectChanges();
            }
          );
        } else {
          console.debug('Community create: canceled');
          this.isModalDialogOpen = false;
          this.changeDetector.detectChanges();
        }
      },
      () => {
        console.debug(`Community delete dialog: error`);
        this.isModalDialogOpen = false;
        this.changeDetector.detectChanges();
      }
    );
  }
}
