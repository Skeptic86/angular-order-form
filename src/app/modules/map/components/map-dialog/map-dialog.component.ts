import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { GetAddressesService } from './../../../order-form/services/get-addresses/get-addresses.service';
import { AppStateService } from 'src/app/services/app-state/app-state.service';
import { IAddress } from 'src/app/interfaces/address.interface';
import { Component, OnInit } from '@angular/core';
import maplibregl, { LngLat, LngLatLike, Map } from 'maplibre-gl'; // or "const maplibregl = require('maplibre-gl');"

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss'],
})
export class MapDialogComponent implements OnInit {
  private marker?: maplibregl.Marker;
  private addresses?: IAddress[];
  address?: IAddress;
  private markerLocation?: LngLat;
  private map?: Map;
  private markerDrag(event: any): void {
    const curLngLat = event.target.getLngLat();

    if (
      this.markerLocation?.lat !== curLngLat.lat ||
      this.markerLocation?.lng !== curLngLat.lng
    ) {
      this.markerLocation = curLngLat;
      this.map?.setCenter(curLngLat);
      this.address =
        this.addresses![Math.floor(Math.random() * this.addresses!.length)];
    }
  }

  private getAddresses(): Observable<IAddress[]> {
    return this.getAddressesService.getAddresses();
  }

  onClickDoneButton(): void {
    this.appStateService.setAppState({
      addressFrom: this.address,
    });
  }

  ngOnInit(): void {
    const stateFromForm = this.appStateService.getStateValue();
    if (stateFromForm.addressFrom?.title?.length) {
      this.map = new maplibregl.Map({
        container: 'map',
        style:
          'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // stylesheet location
        center: [
          stateFromForm.addressFrom.longitude,
          stateFromForm.addressFrom.latitude,
        ], // starting position [lng, lat]
        zoom: 15,
      });
      this.marker = new maplibregl.Marker({
        color: '#ffbb40',
        draggable: true,
      })
        .setLngLat([
          stateFromForm.addressFrom.longitude,
          stateFromForm.addressFrom.latitude,
        ])
        .addTo(this.map);
      this.markerLocation = this.marker.getLngLat();
      this.marker.on('dragend', this.markerDrag.bind(this));
      this.address = stateFromForm.addressFrom;
    } else {
      this.map = new maplibregl.Map({
        container: 'map',
        style:
          'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // stylesheet location
        center: [65.53553704887027, 57.15114882108171], // starting position [lng, lat]
        zoom: 15,
      });
      this.marker = new maplibregl.Marker({
        color: '#ffbb40',
        draggable: true,
      })
        .setLngLat([65.53553704887027, 57.15114882108171])
        .addTo(this.map);
      this.markerLocation = this.marker.getLngLat();
      this.marker.on('dragend', this.markerDrag.bind(this));
    }

    this.getAddresses().subscribe((data) => {
      this.addresses = data as IAddress[];
    });
  }

  constructor(
    private appStateService: AppStateService,
    private getAddressesService: GetAddressesService,
    public dialogRef: MatDialogRef<MapDialogComponent>
  ) {}
}
