import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'department',
        data: { pageTitle: 'eventloggerApp.department.home.title' },
        loadChildren: (): Promise<any> => import('./department/department.module').then(m => m.DepartmentModule),
      },
      {
        path: 'schedule',
        data: { pageTitle: 'eventloggerApp.schedule.home.title' },
        loadChildren: (): Promise<any> => import('./schedule/schedule.module').then(m => m.ScheduleModule),
      },
      {
        path: 'event',
        data: { pageTitle: 'eventloggerApp.event.home.title' },
        loadChildren: (): Promise<any> => import('./event/event.module').then(m => m.EventModule),
      },
      {
        path: 'employee',
        data: { pageTitle: 'eventloggerApp.employee.home.title' },
        loadChildren: (): Promise<any> => import('./employee/employee.module').then(m => m.EmployeeModule),
      },
      {
        path: 'community',
        data: { pageTitle: 'eventloggerApp.community.home.title' },
        loadChildren: (): Promise<any> => import('./community/community.module').then(m => m.CommunityModule),
      },
    ]),
  ],
})
export class EntityRoutingModule {}
