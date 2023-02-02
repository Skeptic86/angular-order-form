import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapButtonComponent } from './components/map-button/map-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MapDialogComponent } from './components/map-dialog/map-dialog.component';

@NgModule({
  declarations: [MapButtonComponent, MapDialogComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [MapButtonComponent],
})
export class MapModule {}
