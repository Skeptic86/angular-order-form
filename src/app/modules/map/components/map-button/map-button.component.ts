import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';

@Component({
  selector: 'app-map-button',
  templateUrl: './map-button.component.html',
  styleUrls: ['./map-button.component.scss'],
})
export class MapButtonComponent {
  constructor(public dialog: MatDialog) {}

  openMapDialog(): void {
    const dialogRef = this.dialog.open(MapDialogComponent);

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}
