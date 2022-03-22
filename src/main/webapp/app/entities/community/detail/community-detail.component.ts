import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';

import { Community } from '../community.model';
import { CommunityFormComponent } from '../form/community-form.component';
import { CommunityService } from '../service/community.service';

@Component({
  selector: 'jhi-community-detail',
  templateUrl: './community-detail.component.html',
  styleUrls: ['./community-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityDetailComponent implements OnInit {
  community!: Community;
  isEditMode: boolean;
  isModalDialogOpen: boolean;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private communityService: CommunityService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.isModalDialogOpen = false;
    this.isEditMode = false;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ community }) => {
      this.community = community;
      this.changeDetector.detectChanges();
    });
  }

  setEditMode(boolean: boolean): void {
    this.isEditMode = boolean;
    this.changeDetector.detectChanges();
  }

  previousState(): void {
    window.history.back();
  }

  openEditDialog(community: Community): void {
    this.isModalDialogOpen = true;
    const ref = this.dialogService.open(CommunityFormComponent, {
      header: 'Edytuj event',
      showHeader: true,
      width: '50%',
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
}
