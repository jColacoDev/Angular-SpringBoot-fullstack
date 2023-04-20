import { Component } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html'
})
export class DirectiveComponent {

  courseList: string[] = ['Typescript',"Javascript","Java SE","PHP"];
  display: boolean = true;

  constructor(){ }

  setDisplay(): void {
    this.display = !this.display;
  }
}
