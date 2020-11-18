import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from './material/material.module';
import { PersonComponent } from './web/person/person.component';
import { ConfirmationComponent } from './modal/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    ConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationComponent,
  ]
})
export class AppModule { }
