import { Reflector } from '@nestjs/core';

import { CaslFactory } from './casl.factory';
import { PoliciesGuard } from './policies.guard';

describe('PoliciesGuard', () => {
  it('should be defined', () => {
    const reflector: Reflector = new Reflector();
    const caslFactory = new CaslFactory();
    expect(new PoliciesGuard(reflector, caslFactory)).toBeDefined();
  });
});
