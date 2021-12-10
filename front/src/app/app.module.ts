import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import {
  FooterModule,
  ResetPasswordFormModule,
  CreateAccountFormModule,
  ChangePasswordFormModule,
  LoginFormModule,
  CidadesEstadosModule,
  ClienteCreateModule,
  ClienteListModule,
  ProdutoListModule,
  PedidoListModule
} from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { CidadesEstadosService } from "./shared/services/cidades-estados.service";
import { HttpClientModule } from "@angular/common/http";
import { ClienteService } from "./shared/services/cliente.service";
import { ProdutoService } from "./shared/services/produto.service";
import { PedidoService } from "./shared/services/pedido.service";
import { FirstKeysToConsolePipeModule } from "./shared/core/first-keys-to-console.pipe";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    CidadesEstadosModule,
    ClienteListModule,
    ClienteCreateModule,
    ProdutoListModule,
    PedidoListModule,
    FirstKeysToConsolePipeModule
  ],
  exports:[],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    CidadesEstadosService,
    ClienteService,
    ProdutoService,
    PedidoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
