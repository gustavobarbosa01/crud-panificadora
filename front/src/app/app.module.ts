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
  CidadesEstadosModule
} from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { CidadesEstadosService } from "./shared/services/cidades-estados.service";
import { HttpClientModule } from "@angular/common/http";
import { ClienteListModule } from './shared/components/cliente-components/cliente-list/cliente-list.component';
import {ClienteService} from "./shared/services/cliente.service";

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
    ClienteListModule

  ],
  exports:[],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    CidadesEstadosService,
    ClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
