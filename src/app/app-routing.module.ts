import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/gurds/auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./Features/auth/auth.module').then((m) => m.AuthModule), },
  { path: 'dashboard', canActivate: [authGuard], loadChildren: () => import('./Features/dashboard/dashboard.module').then((m) => m.DashboardModule) },
  { path: '**', component: PageNotFoundComponent, title: 'Error 404!' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
