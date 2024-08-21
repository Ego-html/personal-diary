import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TasksEditorComponent } from './tasks-editor/tasks-editor.component';
import { AuthGuard } from './auth.guard';
import {LoginComponent} from "./components/login/login.component";

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'create', component: TasksEditorComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: TasksEditorComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
