import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LoginFormComponent,
  ResetPasswordFormComponent,
  CreateAccountFormComponent,
  ChangePasswordFormComponent,
  CidadesEstadosModule,
  ClienteListModule,
  ProdutoListModule,
  PedidoListModule
} from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { LocationComponent } from "./pages/location/location.component";
import { ClienteComponent } from "./pages/cliente/cliente.component";
import { ClienteCreateComponent } from "./shared/components/cliente-components/cliente-create/cliente-create.component";
import { ProdutoComponent } from "./pages/produto/produto.component";
import { PedidoComponent } from "./pages/pedido/pedido.component";

const routes: Routes = [

  {
    path: '', pathMatch: 'full', redirectTo: 'produtos'
  },
  {
    path: 'pedidos', component: PedidoComponent
  },
  {
    path: 'produtos', component: ProdutoComponent
  },
  {
    path: 'add', component: ClienteCreateComponent
  },
  {
    path: 'clientes', component: ClienteComponent
  },
  {
    path: 'location', component: LocationComponent
  },
  {
    path: 'tasks', component: TasksComponent, canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [ AuthGuardService ]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form', component: LoginFormComponent, canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password', component: ResetPasswordFormComponent, canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account', component: CreateAccountFormComponent, canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode', component: ChangePasswordFormComponent, canActivate: [ AuthGuardService ]
  },
  {
    path: '**', redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    DxDataGridModule,
    DxFormModule,
    CidadesEstadosModule,
    ClienteListModule,
    ProdutoListModule,
    PedidoListModule
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
    LocationComponent,
    ClienteComponent,
    ProdutoComponent,
    PedidoComponent
  ]
})
export class AppRoutingModule { }
