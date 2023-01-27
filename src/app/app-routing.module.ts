import { AppstateResolver } from './resolvers/appstate/appstate.resolver';
import { MainComponent } from './components/main/main.component';
import { AppStateService } from './services/app-state/app-state.service';
import { OrderButtonComponent } from './components/order-button/order-button.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'order',
    component: MainComponent,
    resolve: {
      appstate: AppstateResolver,
    },
  },
  {
    path: '',
    redirectTo: '/order',
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private appStateService: AppStateService) {}
}
