import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [GamesController],
  providers: [GamesService],
  imports: [
    TypeOrmModule.forFeature([Game]),
    CommonModule,
    ConfigModule
  ],
  exports: [
    TypeOrmModule
  ]
})
export class GamesModule {}
