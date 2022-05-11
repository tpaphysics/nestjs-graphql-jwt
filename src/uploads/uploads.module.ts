import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsResolver } from './uploads.resolver';

@Module({
  exports: [UploadsService],
  providers: [UploadsService, UploadsResolver],
})
export class UploadsModule {}
