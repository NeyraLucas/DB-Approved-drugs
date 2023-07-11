import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ListOfDrugsComponent } from './pages/list-of-drugs/list-of-drugs.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [ListOfDrugsComponent],
  imports: [CommonModule, HomeRoutingModule, ComponentsModule],
})
export class HomeModule {}
