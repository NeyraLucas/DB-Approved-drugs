import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormActionsComponent } from './form-actions/form-actions.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TableComponent } from './table/table.component';
import { ModalFormComponent } from './modal-form/modal-form.component';

@NgModule({
  declarations: [
    FormActionsComponent,
    NavbarComponent,
    TableComponent,
    ModalFormComponent,
  ],
  imports: [CommonModule],
  exports: [
    FormActionsComponent,
    NavbarComponent,
    TableComponent,
    ModalFormComponent,
  ],
})
export class ComponentsModule {}
