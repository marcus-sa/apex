import {
  Component,
  ElementRef,
  OnInit,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { NgIf } from '@angular/common';

// import { Scuti } from '@apex/scuti-renderer';

@Component({
  selector: 'apex-root',
  standalone: true,
  imports: [RouterModule, DialogModule, NgIf],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  readonly canvasElementRef: ElementRef<HTMLDivElement>;

  @ViewChild('init', { static: true })
  readonly initTemplateRef: TemplateRef<unknown>;

  // renderer: Scuti;

  assetsLoaded = signal(false);

  constructor(private readonly dialog: Dialog) {}

  async ngOnInit() {
    const dialogRef = this.dialog.open(this.initTemplateRef, {
      hasBackdrop: true,
    });
    // this.renderer = new Scuti({
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    //   canvas: this.canvasElementRef.nativeElement,
    //   resources: 'http://localhost:8083',
    //   backgroundColor: 0x212225,
    //   resizeTo: window,
    // });
    // await this.renderer.load();
    this.assetsLoaded.set(true);
    dialogRef.close();
  }
}
