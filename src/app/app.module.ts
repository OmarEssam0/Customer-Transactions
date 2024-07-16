import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TableSectionComponent } from './components/table-section/table-section.component';
import { FormsModule } from '@angular/forms';
import { AmountSearchPipe } from './core/pipe/amount-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableSectionComponent,
    AmountSearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
