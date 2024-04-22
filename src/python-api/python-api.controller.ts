import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PythonApiService } from './python-api.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Recommendation } from 'src/users/dto/recomendation.class';
import { ReviewDto } from './dto/review.dto';

@ApiTags('Recommendations')
@Controller('recommendation')
export class PythonApiController {
  constructor(private readonly pythonApiService: PythonApiService) {}

  @Get(':idUser')
  @ApiResponse({status: 200, type: Recommendation})
  getRecomendation(@Param('idUser') idUser: number) {
    return this.pythonApiService.getRecommendation(idUser)
  }

  @Get(':idUser/:num')
  @ApiResponse({status: 200, type: Recommendation})
  getRecomendations(@Param('idUser') idUser:number, @Param('num') num:number){
    return this.pythonApiService.getRecommendations(idUser, num)
  }

  @Post('review')
  review(@Body() reviewDto: ReviewDto){
    return this.pythonApiService.saveReview(reviewDto)
  }
}
