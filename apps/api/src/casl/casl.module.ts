import { Module } from '@nestjs/common';

import { CaslFactory } from './casl.factory';

@Module({
  providers: [CaslFactory],
  exports: [CaslFactory],
})
export class CaslModule {}
