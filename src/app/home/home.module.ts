import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ListOfDrugsComponent } from './pages/list-of-drugs/list-of-drugs.component';

@NgModule({
  declarations: [ListOfDrugsComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
