import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICommunity, Community } from '../community.model';
import { CommunityService } from '../service/community.service';

@Component({
  selector: 'jhi-community-update',
  templateUrl: './community-update.component.html',
})
export class CommunityUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    description: [],
  });

  constructor(protected communityService: CommunityService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ community }) => {
      this.updateForm(community);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const community = this.createFromForm();
    if (community.id !== undefined) {
      this.subscribeToSaveResponse(this.communityService.update(community));
    } else {
      this.subscribeToSaveResponse(this.communityService.create(community));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommunity>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(community: ICommunity): void {
    this.editForm.patchValue({
      id: community.id,
      title: community.title,
      description: community.description,
    });
  }

  protected createFromForm(): ICommunity {
    return {
      ...new Community(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }
}
