import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmployee, getEmployeeIdentifier, Employee } from '../employee.model';

export type EntityResponseType = HttpResponse<IEmployee>;
export type EntityArrayResponseType = HttpResponse<IEmployee[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  employees = new BehaviorSubject<IEmployee[]>([]);
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/employees');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  loadEmployeesIfEmpty(): void {
    if (this.employees.getValue().length < 1) {
      this.loadEmployees();
    }
  }

  loadEmployees(): void {
    this.query().subscribe((res: HttpResponse<Employee[]>) => {
      if (res.body) {
        this.employees.next(res.body);
        // console.log(res.body);
      }
    });
  }

  create(employee: IEmployee): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employee);
    return this.http
      .post<IEmployee>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(employee: IEmployee): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employee);
    return this.http
      .put<IEmployee>(`${this.resourceUrl}/${getEmployeeIdentifier(employee) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(employee: IEmployee): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employee);
    return this.http
      .patch<IEmployee>(`${this.resourceUrl}/${getEmployeeIdentifier(employee) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEmployee>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEmployee[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEmployeeToCollectionIfMissing(employeeCollection: IEmployee[], ...employeesToCheck: (IEmployee | null | undefined)[]): IEmployee[] {
    const employees: IEmployee[] = employeesToCheck.filter(isPresent);
    if (employees.length > 0) {
      const employeeCollectionIdentifiers = employeeCollection.map(employeeItem => getEmployeeIdentifier(employeeItem)!);
      const employeesToAdd = employees.filter(employeeItem => {
        const employeeIdentifier = getEmployeeIdentifier(employeeItem);
        if (employeeIdentifier == null || employeeCollectionIdentifiers.includes(employeeIdentifier)) {
          return false;
        }
        employeeCollectionIdentifiers.push(employeeIdentifier);
        return true;
      });
      return [...employeesToAdd, ...employeeCollection];
    }
    return employeeCollection;
  }

  protected convertDateFromClient(employee: IEmployee): IEmployee {
    return Object.assign({}, employee, {
      hireDate: employee.hireDate?.isValid() ? employee.hireDate.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.hireDate = res.body.hireDate ? dayjs(res.body.hireDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((employee: IEmployee) => {
        employee.hireDate = employee.hireDate ? dayjs(employee.hireDate) : undefined;
      });
    }
    return res;
  }
}
