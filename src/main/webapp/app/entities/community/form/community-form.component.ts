import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Community } from '../community.model';

@Component({
  selector: 'jhi-form',
  templateUrl: './community-form.component.html',
  styleUrls: ['./community-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityFormComponent implements OnInit {
  title = '';
  description = '';

  constructor(public dynamicDialogRef: DynamicDialogRef, public config: DynamicDialogConfig, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.config.data?.community) {
      const community: Community = this.config.data.community;
      this.title = community.title!;
      this.description = community.description ?? '';
      this.changeDetector.detectChanges();
    }
  }

  cancel = () => (): void => {
    this.dynamicDialogRef.close(false);
  };

  confirm = () => (): void => {
    if (this.isValid()) {
      const community = this.config.data?.community ?? new Community();
      community.title = this.title;
      community.description = this.description;
      this.dynamicDialogRef.close(community);
    }
  };

  isValid = (): boolean => this.title.length > 3;
}
