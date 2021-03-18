import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { MessageStoreService } from './messages/messages.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { View1Component, View2Component } from './views.component';
import { MessageComponent } from './messages/msg.component';

const routes: Routes = [
  { path: 'first-view', component: View1Component },
  { path: 'second-view', component: View2Component },
  { path: 'messages', component: MessageComponent },
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: '**', component: MessageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MessageComponent,
    View1Component,
    View2Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    FormsModule,

    // Material
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatMenuModule,

    // routing
    RouterModule.forRoot(routes),
  ],
  providers: [MessageStoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
