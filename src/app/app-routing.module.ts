import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ImageListComponent } from './images/image-list/image-list.component';
import { ImageComponent } from './images/image/image.component';
import { ImagesComponent } from './images/images.component';
import { MoveableComponent } from './moveable/moveable.component';

const routes: Routes = [
  // {path:'',redirectTo:'auth',pathMatch:'full'},
  {path:'moveable',component:MoveableComponent},
  {path:'',component:AuthComponent},
  {path:'image', component:ImagesComponent,children:[
    {path:'upload',component:ImageComponent},
    {path:'list', component:ImageListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
