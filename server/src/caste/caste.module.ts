import { Module } from '@nestjs/common';
import { CasteService } from './caste.service';
import { CasteController } from './caste.controller';

@Module({
  providers: [CasteService],
  controllers: [CasteController]
})
export class CasteModule {}
