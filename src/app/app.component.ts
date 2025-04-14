import { Component } from '@angular/core';
import { GridOptions } from '@interfaces';
import { SuperGridWidgetComponent } from './components/super-grid-widget/super-grid-widget.component';

@Component({
  selector: 'app-root',
  imports: [SuperGridWidgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  options: GridOptions = {
    headers: [
      { fieldId: 'name', displayText: 'User Name' },
      { fieldId: 'role', displayText: 'User Role' },
    ],
    data: [
      { name: 'Mike', role: 'Engineer' },
      { name: 'Jeff', role: 'Engineer' },
    ],
  };
}
