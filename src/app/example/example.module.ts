import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './example/example.component';
import { LisaRoutingModule } from './example-routing.module';



@NgModule({
  declarations: [ExampleComponent],
  imports: [
    CommonModule,
    LisaRoutingModule
  ],
  entryComponents: [
  ]
})
export class LisaModule {}
