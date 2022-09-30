import { Reflector } from '@nestjs/core';

import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  it('should be defined', () => {
    const reflector = new Reflector();
    expect(new JwtAuthGuard(reflector)).toBeDefined();
  });
});
