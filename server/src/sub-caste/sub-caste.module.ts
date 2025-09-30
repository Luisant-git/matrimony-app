import { Module } from '@nestjs/common';
import { SubCasteController } from './sub-caste.controller';
import { SubCasteService } from './sub-caste.service';

@Module({
  controllers: [SubCasteController],
  providers: [SubCasteService]
})
export class SubCasteModule {}
