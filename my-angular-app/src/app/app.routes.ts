import { Routes } from '@angular/router';
import { CreateBookComponent } from './create-book/create-book.component';
import { HomeComponent } from './home/home.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from '@app/helpers';
import { RoleModel } from '@app/models';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent, canActivate: [AuthGuard], data: {roles: [{id: 1, name: 'ROLE_ADMIN'}]} },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {roles: [{id: 1, name: 'ROLE_ADMIN'}, {id: 2, name: 'ROLE_USER'}]} },
    { path: 'new-book', component: CreateBookComponent, canActivate: [AuthGuard], data: {roles: [{id: 1, name: 'ROLE_ADMIN'}]}},
    { path: 'update-book/:id', component: UpdateBookComponent, canActivate: [AuthGuard], data: {roles: [{id: 1, name: 'ROLE_ADMIN'}]} },
];
