import { Routes } from '@angular/router';
import { TaskDetails } from './components/task-details/task-details';

export const routes: Routes = [
    {path: '', redirectTo: '/task/1', pathMatch: 'full'},
    {path: 'task/:id', component: TaskDetails}
];
