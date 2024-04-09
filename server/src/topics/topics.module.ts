import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicsSchema } from './topics.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Topics', schema: TopicsSchema }]),
  ],
  controllers: [TopicsController],
  providers: [TopicsService, JwtService],
})
export class TopicsModule {}
