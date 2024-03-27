import { Module } from '@nestjs/common';
import { PythonApiService } from './python-api.service';
import { PythonApiController } from './python-api.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [PythonApiController],
  providers: [PythonApiService],
  imports: [
    ConfigModule,
    CommonModule
  ]
})
export class PythonApiModule {}
