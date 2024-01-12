import '@analogjs/vite-plugin-angular/setup-vitest';
import '@testing-library/jest-dom/vitest';

/**
 * Initialize TestBed for all tests
 */
import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
