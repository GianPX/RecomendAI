import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PythonApiService } from './python-api.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Recommendation } from 'src/users/dto/recomendation.class';

@ApiTags('Recommendations')
@Controller('recommendation')
export class PythonApiController {
  constructor(private readonly pythonApiService: PythonApiService) {}

  @Get()
  @ApiResponse({status: 200, type: Recommendation})
  getRecomendation() {
    return this.pythonApiService.getRecommendation()
  }

  @Get(':num')
  getRecomendations(@Param('num') num:number){
    return this.pythonApiService.getRecommendations(num)
  }
}
