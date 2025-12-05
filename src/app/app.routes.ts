import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { UserDashboard } from './user/user-dashboard/user-dashboard';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login, pathMatch: 'full' },
    { path: 'signup', component: Signup, pathMatch: 'full' },
    { path: 'admin', component: AdminDashboard, pathMatch: 'full' },
    { path: 'user', component: UserDashboard, pathMatch: 'full' },


];
