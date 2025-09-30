import { Module } from '@nestjs/common';
import { KulamService } from './kulam.service';
import { KulamController } from './kulam.controller';

@Module({
  providers: [KulamService],
  controllers: [KulamController]
})
export class KulamModule {}
