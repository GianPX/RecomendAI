import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';
import { Recommendation } from 'src/users/dto/recomendation.class';
import { ReviewDto } from './dto/review.dto';
import { time } from 'console';
import { title } from 'process';
import { Repository } from 'typeorm';
import { ReviewedGame } from './entities/reviewed-games.entity';
import { UnReviewedGame } from './entities/unreviewed-games.entity';
import { Game } from 'src/games/entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RecommendedGame } from './interfaces/recommended-game.interface';

@Injectable()
export class PythonApiService {
  constructor(
    @InjectRepository(ReviewedGame)
    private readonly reviewedRespository: Repository<ReviewedGame>,
    @InjectRepository(UnReviewedGame)
    private readonly unreviewedRespository: Repository<UnReviewedGame>,
    @InjectRepository(Game)
    private readonly gameRespository: Repository<Game>,
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService
  ){}
  async getRecommendation(idUser:number): Promise<Recommendation>{ //get unreview with highest score
    const recommendations: Array<UnReviewedGame> = await this.unreviewedRespository.find({where: {idUser}})
    recommendations.sort((a,b)=>b.score-a.score)
    const game = await this.gameRespository.findOneBy({id: recommendations[0].idGame})
    return {
      gameId: game.id,
      imageUrl: game.background_image,
      game: game.name,
      tags: game.tags,
      released: game.released.toString()
    }
  }

  async getRecommendations(idUser:number, num:number): Promise<Recommendation[]>{
    if(num>10) num=10
    let recommendations: Array<UnReviewedGame> = await this.unreviewedRespository.find({where: {idUser}})
    const recommendationsToReturn: Array<Recommendation> = []
    recommendations.sort((a,b)=>b.score-a.score)
    recommendations = recommendations.slice(0,num)
    await Promise.all(recommendations.map( async rec => {
      const game = await this.gameRespository.findOneBy({id: rec.idGame})
      const gameToPush: Recommendation = {
        gameId: game.id,
        imageUrl: game.background_image,
        game: game.name,
        tags: game.tags,
        released: game.released.toString()
      }
      recommendationsToReturn.push(gameToPush)
    }))
    return recommendationsToReturn
  }

  async saveReview(reviewDto: ReviewDto){
    //Create review in review table
    try {
      const review = this.reviewedRespository.create({
        idUser: reviewDto.userId,
        idGame: reviewDto.gameId,
        review: reviewDto.review
      })
      await this.reviewedRespository.save(review)
      const unreview = await this.unreviewedRespository.findOne({ //find if there is an unreview
        where: {
          idUser: reviewDto.userId,
          idGame: reviewDto.gameId
        }
      })
      if(unreview){ //delete unreview if there is any
        await this.unreviewedRespository.remove(unreview)
      }
    } catch (error) {
      console.log(error)
    }

    //Feed recommendation system if recommendation is positive
    if(reviewDto.review){
      const recommendedGames:Array<RecommendedGame> = await this.http.post(`${this.configService.get('PYTHON_API')}/recommend`,{ //get recommendations from AI
        id: reviewDto.gameId,
        title: (await this.gameRespository.findOneBy({id: reviewDto.gameId})).name
      })
      let count = 10
      recommendedGames.forEach( async game => { // for each recommended game
        const unreview = await this.unreviewedRespository.findOne({ //find if there is an unreview
          where: {
            idUser: reviewDto.userId,
            idGame: game.id
          }
        })
        if(unreview){ //add score if exists
          try {
            unreview.score+=count--
            this.unreviewedRespository.update({idUser: unreview.idUser, idGame: unreview.idGame},unreview)
            await this.unreviewedRespository.save(unreview)
          } catch (error) {
            console.log(error)
          }
        }else{ //create if doesn't exist
          const review = await this.reviewedRespository.findOne({
            where: {
              idGame: game.id,
              idUser: reviewDto.userId
            }
          })
          if(!review){ //check if the game is already reviewed
            try {
              const unreview_tosave = this.unreviewedRespository.create({
                idUser: reviewDto.userId,
                idGame: game.id,
                score: count--
              })
              await this.unreviewedRespository.save(unreview_tosave)
            } catch (error) {
              console.log(error)
            }
          }
        }
      })
    }
    return 'review saved'
  }
}
