import { test, vitest } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';

import { IntegrationsModule } from './integrations.module';

test('register', async () => {
  // @ts-expect-error unnecessary
  const integrations = new IntegrationsModule();
  integrations.process = vitest.fn();

  @NgModule({})
  class TestModule {}

  class TestConfig {}

  const config = new TestConfig();

  await integrations.register(config, () => TestModule);

  const testBed = TestBed.configureTestingModule({
    imports: [await integrations.configure()],
  });

  const config2 = testBed.inject(TestConfig);
  expect(config2).toBe(config);
});
