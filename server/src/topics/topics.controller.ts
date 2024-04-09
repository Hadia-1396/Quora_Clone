import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { createdTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  async createTopic(@Res() response, @Body() createdTopicDto: createdTopicDto) {
    try {
      const newTopic = await this.topicsService.createTopic(createdTopicDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Topic has been created successfully',
        newTopic,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Topic not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateTopic(
    @Res() response,
    @Param('id') topicId: string,
    @Body() UpdateTopicDto: UpdateTopicDto,
  ) {
    try {
      const existingTopic = await this.topicsService.updateTopic(
        topicId,
        UpdateTopicDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Topic has been successfully updated',
        existingTopic,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  // to protect it from unauthorized access
  @UseGuards(JwtGuard)
  @Get()
  async getTopics(@Res() response) {
    try {
      const topicsData = await this.topicsService.getAllTopics();
      return response.status(HttpStatus.OK).json({
        message: 'All topics data found successfully',
        topicsData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getTopic(@Res() response, @Param('id') topicId: string) {
    try {
      const existingTopic = await this.topicsService.getTopic(topicId);
      return response.status(HttpStatus.OK).json({
        message: 'Topic found successfully',
        existingTopic,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteTopic(@Res() response, @Param('id') topicId: string) {
    try {
      const deletedtTopic = await this.topicsService.deleteTopic(topicId);
      return response.status(HttpStatus.OK).json({
        message: 'Topic deleted successfully',
        deletedtTopic,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
