import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ExampleComponent } from './example/example.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot({ url: 'ws://localhost:3000', options: {} })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
