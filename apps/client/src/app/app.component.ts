import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'apex-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  @ViewChild('canvas') readonly canvas: ElementRef<HTMLDivElement>;

  async ngOnInit() {}
}
