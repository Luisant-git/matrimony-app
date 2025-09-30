import { Module } from '@nestjs/common';
import { KothiramService } from './kothiram.service';
import { KothiramController } from './kothiram.controller';

@Module({
  providers: [KothiramService],
  controllers: [KothiramController]
})
export class KothiramModule {}
