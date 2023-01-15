import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';
import { gRPCService } from './gRPC.service';

@Module({
  // imports: [OgmaModule.forFeature(gRPCService)],
  // providers: [gRPCService],
  exports: [],
  controllers: [gRPCService],
})
export class gRPCModule {}