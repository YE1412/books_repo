import { Routes } from '@angular/router';
import { CreateBookComponent } from '@app/create-book/create-book.component';
import { HomeComponent } from '@app/home/home.component';
import { UpdateBookComponent } from '@app/update-book/update-book.component';
import { LoginComponent } from '@app/login/login.component';
import { UserOpsComponent } from '@app/user-ops/user-ops.component';
import { AuthGuard } from '@app/helpers';
import { RoleModel } from '@app/models';
import { UsersComponent } from '@app/users/users.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserOpsComponent },
    { path: 'user/:id/:type', component: UserOpsComponent, canActivate: [AuthGuard], data: {roles: [{id: 1, name: 'ROLE_ADMIN'}, {id: 2, name: 'ROLE_USER'}]} },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: {roles: [{id: 1, name: 'ROLE_ADMIN'}]}},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {roles: [{id: 1, name: 'ROLE_ADMIN'}, {id: 2, name: 'ROLE_USER'}]} },
    { path: 'new-book', component: CreateBookComponent, canActivate: [AuthGuard], data: {roles: [{id: 1, name: 'ROLE_ADMIN'}]}},
    { path: 'update-book/:id', component: UpdateBookComponent, canActivate: [AuthGuard], data: {roles: [{id: 1, name: 'ROLE_ADMIN'}]} },
];
