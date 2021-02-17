import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  action = 'play';

  alternate() {
    this.action = this.action === 'play' ? 'pause' : 'play';
  }
}
