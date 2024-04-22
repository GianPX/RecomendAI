import { Injectable } from '@nestjs/common';
import { Result } from './interfaces/games.interface';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpAdapter } from 'src/common/interfaces/http-adapter.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GamesService {

  constructor(
    @InjectRepository(Game)
    private readonly gameRespository: Repository<Game>,
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService
  ){}

  async filldb() {
    const result = await this.http.get<Result>(this.configService.get('GAME_API'))
    const gamesToSave = []
    result.results.forEach( game => {
      const [updatedDate, updatedTime] = game.updated.split('T')

      const platforms: string[] = []
      game.platforms.forEach( platform => {
        if(platform.platform)
          platforms.push(platform.platform.name)
      })

      const genres: string[] = []
      game.genres.forEach( genre => {
        if(genre)
          genres.push(genre.name)
      })

      const stores: string[] = []
      game.stores.forEach( store => {
        if(store.store)
          stores.push(store.store.name)
      })

      const tags: string[] = []
      game.tags.forEach( tag => {
        if(tag)
          tags.push(tag.name)
      })

      let esrb_rating: string
      if(game.esrb_rating) esrb_rating = game.esrb_rating.name

      const gameToCreate = {
        slug: game.slug,
        name: game.name,
        released: new Date(game.released),
        background_image: game.background_image,
        rating: game.rating,
        rating_top: game.rating_top,
        ratings_count: game.ratings_count,
        metacritic: game.metacritic,
        playtime: game.playtime,
        updated: updatedDate,
        platforms: platforms,
        genres: genres,
        stores: stores,
        tags: tags,
        esrb_rating: esrb_rating
      }
      this.gameRespository.create(gameToCreate)
      gamesToSave.push(gameToCreate)
    })

    this.gameRespository.save(gamesToSave)

    return 'db filled'
  }


  async findAll() {
    return await this.gameRespository.find()
  }

  async findOne(id: number) {
    return await this.gameRespository.findOneBy({id})
  }

}
