import {Component} from '@angular/core';
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatTabLink, MatTabNavPanel, MatTabNav],
})
export class AppComponent {
  title = 'BlogPosts.com';
  links = ['Blog posts'];
  activeLink = this.links[0];
}
