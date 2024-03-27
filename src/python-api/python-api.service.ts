import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';
import internal from 'stream';
import { Recommendation } from 'src/users/dto/recomendation.class';

@Injectable()
export class PythonApiService {
  constructor(
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService
  ){}
  getRecommendation(): Recommendation{
    //return this.http.get(this.configService.get('PYTHON_API'))
    return {
      recommendationId: 1,
      imageUrl: 'https://media.rawg.io/media/games/198/1988a337305e008b41d7f536ce9b73f6.jpg',
      game: 'Half-Life 2',
      tags: ['Action', 'Single-player'],
      released: '2007-10-8'
    }
  }

  getRecommendations(num): Recommendation[]{
    return [{
      recommendationId: 1,
      imageUrl: 'https://media.rawg.io/media/games/198/1988a337305e008b41d7f536ce9b73f6.jpg',
      game: 'Half-Life 2',
      tags: ['Action', 'Single-player'],
      released: '2007-10-8'
    },
    {
      recommendationId: 2,
      imageUrl: 'https://media.rawg.io/media/games/d46/d46373f39458670305704ef089387520.jpg',
      game: 'Hitman: Absolution',
      tags: ['Action', 'Single-player'],
      released: '2012-11-18'
    },
    {
      recommendationId: 3,
      imageUrl: 'https://media.rawg.io/media/games/364/3642d850efb217c58feab80b8affaa89.jpg',
      game: 'The Last of Us Remastered',
      tags: ['Action', 'Single-player'],
      released: '2014-7-28'
    }]
  }
}
