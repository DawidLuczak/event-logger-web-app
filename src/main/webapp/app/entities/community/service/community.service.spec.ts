import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICommunity, Community } from '../community.model';

import { CommunityService } from './community.service';

describe('Community Service', () => {
  let service: CommunityService;
  let httpMock: HttpTestingController;
  let elemDefault: ICommunity;
  let expectedResult: ICommunity | ICommunity[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CommunityService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      title: 'AAAAAAA',
      description: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Community', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Community()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Community', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          title: 'BBBBBB',
          description: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Community', () => {
      const patchObject = Object.assign(
        {
          title: 'BBBBBB',
        },
        new Community()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Community', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          title: 'BBBBBB',
          description: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Community', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCommunityToCollectionIfMissing', () => {
      it('should add a Community to an empty array', () => {
        const community: ICommunity = { id: 123 };
        expectedResult = service.addCommunityToCollectionIfMissing([], community);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(community);
      });

      it('should not add a Community to an array that contains it', () => {
        const community: ICommunity = { id: 123 };
        const communityCollection: ICommunity[] = [
          {
            ...community,
          },
          { id: 456 },
        ];
        expectedResult = service.addCommunityToCollectionIfMissing(communityCollection, community);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Community to an array that doesn't contain it", () => {
        const community: ICommunity = { id: 123 };
        const communityCollection: ICommunity[] = [{ id: 456 }];
        expectedResult = service.addCommunityToCollectionIfMissing(communityCollection, community);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(community);
      });

      it('should add only unique Community to an array', () => {
        const communityArray: ICommunity[] = [{ id: 123 }, { id: 456 }, { id: 91085 }];
        const communityCollection: ICommunity[] = [{ id: 123 }];
        expectedResult = service.addCommunityToCollectionIfMissing(communityCollection, ...communityArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const community: ICommunity = { id: 123 };
        const community2: ICommunity = { id: 456 };
        expectedResult = service.addCommunityToCollectionIfMissing([], community, community2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(community);
        expect(expectedResult).toContain(community2);
      });

      it('should accept null and undefined values', () => {
        const community: ICommunity = { id: 123 };
        expectedResult = service.addCommunityToCollectionIfMissing([], null, community, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(community);
      });

      it('should return initial array if no Community is added', () => {
        const communityCollection: ICommunity[] = [{ id: 123 }];
        expectedResult = service.addCommunityToCollectionIfMissing(communityCollection, undefined, null);
        expect(expectedResult).toEqual(communityCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
