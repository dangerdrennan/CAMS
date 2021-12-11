import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = ''

  constructor(private location: Location) {
    this.location.onUrlChange((res) => {
      this.title = res.split('/').pop()
    })
  }

}
