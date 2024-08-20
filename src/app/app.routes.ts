import {Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {TasksEditorComponent} from "./tasks-editor/tasks-editor.component";

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'edit', component: TasksEditorComponent},
  {path: 'edit/:id', component: TasksEditorComponent}
];
