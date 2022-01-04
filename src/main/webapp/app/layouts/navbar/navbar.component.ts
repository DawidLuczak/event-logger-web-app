import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';

import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  @ViewChild('menu', { static: false }) menu!: ViewContainerRef;
  inProduction?: boolean;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  account: Account | null = null;

  isNavbarCollapsed: boolean;
  items: MenuItem[];
  width: string;
  boxShadow: string;
  borderLeft: string;
  textLeft: string;
  buttonShowClass: string;
  buttonHideClass: string;
  hideClock: boolean;

  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION;
    }
    this.items = [];
    this.width = '100px';
    this.boxShadow = '-0em 0.2em 0.7em rgba(26, 0, 43, 0.5), inset 1em 0px 1.3em rgba(150, 80, 150, 0.7)';
    this.borderLeft = '1px solid rgba(74, 34, 97, 0.55)';
    this.textLeft = '-15em';
    this.buttonShowClass = 'button_menu-toggle button-rotation-0';
    this.buttonHideClass = 'button_menu-toggle button-rotation-90';
    this.isNavbarCollapsed = true;
    this.hideClock = true;
  }

  ngOnInit(): void {
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.items = this.getCollapsedItems();
    this.changeDetector.detectChanges();
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorageService.store('locale', languageKey);
    this.translateService.use(languageKey);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    if (this.isNavbarCollapsed) {
      this.items = this.getExpandedItems();
      this.expandNavbar();
    } else {
      this.items = this.getCollapsedItems();
      this.collapseNavbar();
    }
  }

  collapseNavbar(): void {
    this.width = '100px';
    this.boxShadow = '-0em 0.2em 0.7em rgba(26, 0, 43, 0.5), inset 1em 0px 1.3em rgba(150, 80, 150, 0.7)';
    this.borderLeft = '1px solid rgba(74, 34, 97, 0.55)';
    this.textLeft = '-15em';
    this.isNavbarCollapsed = true;
    setTimeout(() => {
      this.hideClock = this.isNavbarCollapsed;
    }, 1000);
  }

  expandNavbar(): void {
    this.width = '300px';
    this.boxShadow = '-0em 0.2em 0.7em rgba(26, 0, 43, 0.5)';
    this.borderLeft = '20px solid rgba(74, 34, 97, 0.55)';
    this.isNavbarCollapsed = false;
    this.hideClock = false;
    setTimeout(() => {
      this.textLeft = '2em';
      this.changeDetector.detectChanges();
    }, 0);
  }

  getExpandedItems = (): MenuItem[] => [
    {
      label: '',
      icon: 'pi pi-fw pi-bars',
      styleClass: this.buttonHideClass,
      command: (): void => this.toggleNavbar(),
    },
    {
      label: this.translateService.instant('global.menu.home'),
      icon: 'pi pi-fw pi-info-circle',
      command: (): Promise<boolean> => this.router.navigate(['/home']),
    },
    {
      label: this.translateService.instant('global.menu.entities.department'),
      icon: 'pi pi-fw pi-home',
      command: (): Promise<boolean> => this.router.navigate(['/department/list']),
    },
    {
      label: this.translateService.instant('global.menu.entities.community'),
      icon: 'pi pi-fw pi-globe',
      command: (): Promise<boolean> => this.router.navigate(['/community/list']),
    },
    {
      label: this.translateService.instant('global.menu.entities.schedule'),
      icon: 'pi pi-fw pi-calendar-times',
      command: (): Promise<boolean> => this.router.navigate(['/schedule/list']),
    },
    {
      label: this.translateService.instant('global.menu.entities.employee'),
      icon: 'pi pi-fw pi-user',
      command: (): Promise<boolean> => this.router.navigate(['/employee/list']),
    },
    {
      label: this.translateService.instant('global.menu.entities.event'),
      icon: 'pi pi-fw pi-ticket',
      command: (): Promise<boolean> => this.router.navigate(['/event/list']),
    },
    {
      label: this.translateService.instant('global.menu.account.logout'),
      icon: 'pi pi-fw pi-power-off',
      styleClass: 'menu_button-logout',
      command: (): void => this.logout(),
    },
  ];

  getCollapsedItems = (): MenuItem[] => [
    {
      label: '',
      icon: 'pi pi-fw pi-bars',
      styleClass: this.buttonShowClass,
      command: (): void => this.toggleNavbar(),
    },
    {
      label: '',
      icon: 'pi pi-fw pi-info-circle',
      command: (): Promise<boolean> => this.router.navigate(['/home']),
    },
    {
      label: '',
      icon: 'pi pi-fw pi-home',
      command: (): Promise<boolean> => this.router.navigate(['/department/list']),
    },
    {
      label: '',
      icon: 'pi pi-fw pi-globe',
      command: (): Promise<boolean> => this.router.navigate(['/community/list']),
    },
    {
      label: '',
      icon: 'pi pi-fw pi-calendar-times',
      command: (): Promise<boolean> => this.router.navigate(['/schedule/list']),
    },
    {
      label: '',
      icon: 'pi pi-fw pi-user',
      command: (): Promise<boolean> => this.router.navigate(['/employee/list']),
    },
    {
      label: '',
      icon: 'pi pi-fw pi-ticket',
      command: (): Promise<boolean> => this.router.navigate(['/event/list']),
    },
    {
      label: '',
      icon: 'pi pi-fw pi-power-off',
      styleClass: 'menu_button-logout',
      command: (): void => this.logout(),
    },
  ];
}
