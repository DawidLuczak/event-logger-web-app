import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICommunity, getCommunityIdentifier, Community } from '../community.model';
import { CommunityFormComponent } from '../form/community-form.component';
import { DialogService } from 'primeng/dynamicdialog';

export type EntityResponseType = HttpResponse<ICommunity>;
export type EntityArrayResponseType = HttpResponse<ICommunity[]>;

@Injectable({ providedIn: 'root' })
export class CommunityService {
  communities = new BehaviorSubject<Community[]>([]);
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/communities');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  loadIfCommunitiesEmpty(): void {
    if (this.communities.getValue().length < 1) {
      this.loadCommunities();
    }
  }

  loadCommunities(): void {
    this.query().subscribe(res => {
      if (res.body) {
        this.communities.next(res.body);
      }
    });
  }

  create(community: ICommunity): Observable<EntityResponseType> {
    return this.http.post<ICommunity>(this.resourceUrl, community, { observe: 'response' });
  }

  update(community: ICommunity): Observable<EntityResponseType> {
    return this.http.put<ICommunity>(`${this.resourceUrl}/${getCommunityIdentifier(community) as number}`, community, {
      observe: 'response',
    });
  }

  partialUpdate(community: ICommunity): Observable<EntityResponseType> {
    return this.http.patch<ICommunity>(`${this.resourceUrl}/${getCommunityIdentifier(community) as number}`, community, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICommunity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICommunity[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCommunityToCollectionIfMissing(
    communityCollection: ICommunity[],
    ...communitiesToCheck: (ICommunity | null | undefined)[]
  ): ICommunity[] {
    const communities: ICommunity[] = communitiesToCheck.filter(isPresent);
    if (communities.length > 0) {
      const communityCollectionIdentifiers = communityCollection.map(communityItem => getCommunityIdentifier(communityItem)!);
      const communitiesToAdd = communities.filter(communityItem => {
        const communityIdentifier = getCommunityIdentifier(communityItem);
        if (communityIdentifier == null || communityCollectionIdentifiers.includes(communityIdentifier)) {
          return false;
        }
        communityCollectionIdentifiers.push(communityIdentifier);
        return true;
      });
      return [...communitiesToAdd, ...communityCollection];
    }
    return communityCollection;
  }

  openEditDialog(community: Community, dialogService: DialogService, changeDetector: ChangeDetectorRef): void {
    0;
    const ref = dialogService.open(CommunityFormComponent, {
      header: 'Edytuj event',
      showHeader: true,
      width: '50%',
      modal: true,
      closable: false,
      data: {
        community,
      },
    });
    ref.onClose.subscribe(subject => {
      if (subject) {
        this.update(subject).subscribe(res => {
          if (res.body) {
            console.debug(`Updated event: ${res.body.id}`);
            const index = this.communities.getValue().findIndex(object => object.id === community.id);
            this.communities.getValue()[index] = res.body;
          }
          changeDetector.detectChanges();
        });
      } else {
        changeDetector.detectChanges();
      }
    });
  }
}
