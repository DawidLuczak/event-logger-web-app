import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

@NgModule({
  imports: [
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    RouterModule.forChild([
      {
        path: 'user-management',
        loadChildren: (): Promise<any> => import('./user-management/user-management.module').then(m => m.UserManagementModule),
        data: {
          pageTitle: 'userManagement.home.title',
        },
      },
      {
        path: 'docs',
        loadChildren: (): Promise<any> => import('./docs/docs.module').then(m => m.DocsModule),
      },
      {
        path: 'configuration',
        loadChildren: (): Promise<any> => import('./configuration/configuration.module').then(m => m.ConfigurationModule),
      },
      {
        path: 'health',
        loadChildren: (): Promise<any> => import('./health/health.module').then(m => m.HealthModule),
      },
      {
        path: 'logs',
        loadChildren: (): Promise<any> => import('./logs/logs.module').then(m => m.LogsModule),
      },
      {
        path: 'metrics',
        loadChildren: (): Promise<any> => import('./metrics/metrics.module').then(m => m.MetricsModule),
      },
      /* jhipster-needle-add-admin-route - JHipster will add admin routes here */
    ]),
  ],
})
export class AdminRoutingModule {}
