import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ICommunity } from 'app/entities/community/community.model';
import { CommunityService } from 'app/entities/community/service/community.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Employee, IEmployee } from '../employee.model';

@Component({
  selector: 'jhi-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements OnInit {
  firstName = '';
  lastName = '';
  email = '';
  phoneNumber = '';
  note = '';
  selectedCommunity!: ICommunity;
  communities!: ICommunity[];

  constructor(
    public dynamicDialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private changeDetector: ChangeDetectorRef,
    private communityService: CommunityService
  ) {}

  ngOnInit(): void {
    const employee: IEmployee = this.config.data?.employee;
    this.loadCommunities(employee);
    this.loadEmployee(employee);
  }

  loadEmployee(employee?: IEmployee): void {
    if (employee) {
      this.firstName = employee.firstName!;
      this.lastName = employee.lastName!;
      this.phoneNumber = employee.phoneNumber!;
      this.email = employee.email!;
      this.note = employee.note!;
      this.changeDetector.detectChanges();
    }
  }

  loadCommunities(employee?: IEmployee): void {
    this.communityService.loadIfCommunitiesEmpty();
    this.communityService.communities.subscribe(data => {
      this.communities = data;
      if (employee) {
        this.selectedCommunity = data.find(community => community.id === employee.community?.id)!;
      }
      this.changeDetector.detectChanges();
    });
  }

  cancel = () => (): void => {
    this.dynamicDialogRef.close(false);
  };

  confirm = () => (): void => {
    if (this.isValid()) {
      const employee: IEmployee = this.config.data?.employee ?? new Employee();
      employee.firstName = this.firstName;
      employee.lastName = this.lastName;
      employee.phoneNumber = this.phoneNumber;
      employee.email = this.email;
      employee.note = this.note;
      employee.community = this.selectedCommunity;
      this.dynamicDialogRef.close(employee);
    }
  };

  isValid = (): boolean => this.firstName.length > 3 && this.lastName.length > 3;
}
