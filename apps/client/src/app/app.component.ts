import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { NgIf } from '@angular/common';

import { Scuti } from '@apex/scuti-renderer';

@Component({
  selector: 'apex-root',
  standalone: true,
  imports: [RouterModule, DialogModule, NgIf],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  readonly canvas: ElementRef<HTMLDivElement>;

  renderer: Scuti;
  assetsLoaded = signal(false);

  constructor(private readonly dialog: Dialog) {}

  async ngOnInit() {
    // const dialogRef = this.dialog.open(ApexDialogComponent, {
    //   hasBackdrop: true,
    //   data: {
    //     content: 'Initializing game ...',
    //   },
    // });
    this.renderer = new Scuti({
      width: window.innerWidth,
      height: window.innerHeight,
      canvas: this.canvas.nativeElement,
      resources: 'http://localhost:8083',
      backgroundColor: 0x212225,
      resizeTo: window,
    });
    await this.renderer.load();
    this.assetsLoaded.set(true);
    // dialogRef.close();
  }
}
