import { Routes } from '@angular/router';
import { ExplorerComponent } from './explorer/explorer.component';

export const routes: Routes = [
    {path: '', redirectTo: 'explorer', pathMatch: 'full'},
    {path: 'explorer', component: ExplorerComponent, title: 'Explorer'}
];
 