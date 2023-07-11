import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfDrugsComponent } from './pages/list-of-drugs/list-of-drugs.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: ListOfDrugsComponent },
      { path: '**', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
