import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { LoginComponent } from './pages/login/login.component';
import { TranslatorComponent } from './pages/translator/translator.component';
import { LayoutComponent } from './pages/common/layout/layout.component';
import { MyNoteComponent } from './pages/my-note/my-note.component';
import { MyFileComponent } from './pages/my-file/my-file.component';
import { FileListComponent } from './pages/my-file/file-list/file-list.component';
import { FileManagementComponent } from './pages/my-file/file-management/file-management.component';
import { permissionGuard } from './services/guards/permission.guard';
import { VerifyComponent } from './pages/verify/verify.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthenticationComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'verify',
        component: VerifyComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'translator',
        component:TranslatorComponent

    },
    {
        path: 'layout',
        component:LayoutComponent

    },
    {
        path: 'mynote',
        component:MyNoteComponent
    },
    {
        path: 'myfile',
        component:MyFileComponent,
        children: [
            {
                path: 'list',
                component: FileListComponent,
                canActivate: [permissionGuard],
                data: { permission: 'file.view' } // 访问此路由需要 file.view 权限
            },
            {
                path: 'management',
                component: FileManagementComponent,
                canActivate: [permissionGuard],
                data: { permission: 'file.manage' } // 需要 file.manage 权限
            },
            { path: '', redirectTo: 'list', pathMatch: 'full' }, // 默认跳转到 list
        ]
    },
    { path: '**', redirectTo: '/home' }
];
