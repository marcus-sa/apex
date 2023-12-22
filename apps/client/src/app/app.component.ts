import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { NgIf } from '@angular/common';

import { Scuti } from '@apex/scuti-renderer';

import { ApexDialogComponent, ApexDialogData } from './ui';

@Component({
  selector: 'apex-root',
  standalone: true,
  imports: [RouterModule, DialogModule, NgIf],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas') readonly canvas: ElementRef<HTMLDivElement>;

  renderer: Scuti;
  assetsLoaded: Promise<void> | undefined;

  constructor(private readonly dialog: Dialog) {}

  async ngAfterViewInit() {
    const dialogRef = this.dialog.open(ApexDialogComponent, {
      hasBackdrop: true,
      data: {
        content: 'Initializing game ...',
      },
    });
    this.renderer = new Scuti({
      width: window.innerWidth,
      height: window.innerHeight,
      canvas: this.canvas.nativeElement,
      resources: 'https://kozennnn.github.io/scuti-resources',
      backgroundColor: 0x000000,
      resizeTo: window,
    });
    this.assetsLoaded = this.renderer.load();
    await this.assetsLoaded;
    dialogRef.close();
  }
}
