// import '@angular/compiler';
// import '@analogjs/vitest-angular/setup-zone';
// import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

// setupTestBed({
//   zoneless: false,
// });

import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing'
 
getTestBed().initTestEnvironment([BrowserTestingModule], platformBrowserTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
})