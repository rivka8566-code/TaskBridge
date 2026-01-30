import { Routes } from '@angular/router';
import { TaskDetails } from './components/task-details/task-details';
import { TaskList } from './components/task-list/task-list';
import { TaskForm } from './components/task-form/task-form';

export const routes: Routes = [
    {path: '', redirectTo: 'tasks', pathMatch: 'full'},
    {path: 'tasks', component: TaskList},
    {path: 'new-task', component: TaskForm},
    {path: 'edit-task/:id', component: TaskForm},
    {path: 'task/:id', component: TaskDetails}
];
