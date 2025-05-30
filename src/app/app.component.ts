import {Component} from '@angular/core';
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatTabLink, MatTabNavPanel, MatTabNav, RouterOutlet],
})
export class AppComponent {
  links = ['Blog posts'];
  activeLink = this.links[0];
}
