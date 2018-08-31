import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { ListformComponent } from '../listform/listform.component';
import { RformComponent } from '../rform/rform.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  {path:'listform',component:ListformComponent},
  {path:'rform',component:RformComponent}
];
@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
