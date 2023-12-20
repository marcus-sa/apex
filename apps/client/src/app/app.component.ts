import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'zeus-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'client';
}
