import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/signin/login/login.component';
import { DestinatiiPostComponent } from './destinatii/destinatii-post/destinatii-post.component';
import { DestinatiiTuristiceComponent } from './destinatii/destinatii-turistice/destinatii-turistice.component';
import { CarnivoreComponent } from './menu/carnivore/carnivore.component';
import { GetOrderComponent } from './menu/get-order/get-order.component';
import { MenuComponent } from './menu/menu.component';
import { SendOrderComponent } from './menu/send-order/send-order.component';
import { VeganComponent } from './menu/vegan/vegan.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TableComponent } from './table/table.component';
import { SignupComponent } from './auth/signup/signup/signup.component';
import { AuthGuard } from './auth/auth/auth.guard';
import { ForgotPassComponent } from './auth/signin/forgot-pass/forgot-pass.component';


const routes: Routes = [
  { path: '*', component: TableComponent },
  { path: 'home', component: TableComponent },
  { path: 'post-destinatie', component: DestinatiiPostComponent },
  { path: 'destinatii', component: DestinatiiTuristiceComponent },
  { path: 'send-order', component: SendOrderComponent },
  { path: 'get-order', component: GetOrderComponent, canActivate: [ AuthGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [ AuthGuard] },
  { path: 'vegan', component: VeganComponent },
  { path: 'carnivore', component: CarnivoreComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-pass', component: ForgotPassComponent },
  { path: 'signup', component: SignupComponent }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthGuard]
})
export class AppRoutingModule { }