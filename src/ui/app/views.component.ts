import { Component } from '@angular/core';

const viewStyle = `.view {margin: 50px;}`;

@Component({
  template: `<h2 class="view">Simulate one view</h2>`,
  styles: [viewStyle],
})
export class View1Component {}

@Component({
  template: `<h2 class="view">Simulate another different view</h2>`,
  styles: [viewStyle],
})
export class View2Component {}
