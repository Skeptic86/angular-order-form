import { IAddress } from './../../../../interfaces/address.interface';
import { Component, OnInit } from '@angular/core';
import maplibregl, { LngLat } from 'maplibre-gl'; // or "const maplibregl = require('maplibre-gl');"

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss'],
})
export class MapDialogComponent implements OnInit {
  private marker?: maplibregl.Marker;

  private markerLocation?: LngLat;
  private address?: IAddress;
  private map?: maplibregl.Map;
  private markerDrag(event: any) {
    console.log(event.target.getLngLat().lat);
    const curLngLat = event.target.getLngLat();

    if (
      this.markerLocation?.lat !== curLngLat.lat &&
      this.markerLocation?.lng !== curLngLat.lng
    ) {
      console.log(curLngLat);
      this.markerLocation = curLngLat;
      this.map!.jumpTo(curLngLat);
      console.log('1');
    }
  }

  ngOnInit(): void {
    this.map = new maplibregl.Map({
      container: 'map',
      style:
        'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // stylesheet location
      center: [65.53553704887027, 57.15114882108171], // starting position [lng, lat]
      zoom: 15,
    });
    this.marker = new maplibregl.Marker({
      color: '#ffdb4d',
      draggable: true,
    })
      .setLngLat([65.53553704887027, 57.15114882108171])
      .addTo(this.map);
    this.markerLocation = this.marker.getLngLat();
    this.marker.on('dragend', this.markerDrag);
  }
}
