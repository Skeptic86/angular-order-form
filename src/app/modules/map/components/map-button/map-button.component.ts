import { Component } from '@angular/core';

@Component({
  selector: 'app-map-button',
  templateUrl: './map-button.component.html',
  styleUrls: ['./map-button.component.scss'],
})
export class MapButtonComponent {
  openMapOnClick() {
    alert('map opened');
  }
}
