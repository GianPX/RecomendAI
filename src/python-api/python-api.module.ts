import { Module } from '@nestjs/common';
import { PythonApiService } from './python-api.service';
import { PythonApiController } from './python-api.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from 'src/common/common.module';
import { ReviewedGame } from './entities/reviewed-games.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnReviewedGame } from './entities/unreviewed-games.entity';
import { GamesModule } from 'src/games/games.module';

@Module({
  controllers: [PythonApiController],
  providers: [PythonApiService],
  imports: [
    TypeOrmModule.forFeature([ReviewedGame,UnReviewedGame]),
    ConfigModule,
    CommonModule,
    GamesModule
  ]
})
export class PythonApiModule {}
