import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Topic } from './topics.interface';
import { createdTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicsService {
  constructor(@InjectModel('Topics') private userModel: Model<Topic>) {}

  async createTopic(createdTopicDto: createdTopicDto): Promise<Topic> {
    const newTopic = new this.userModel(createdTopicDto);
    return newTopic.save();
  }
  async updateTopic(
    topicId: string,
    updateTopicDto: UpdateTopicDto,
  ): Promise<Topic> {
    const existingTopic = await this.userModel.findByIdAndUpdate(
      topicId,
      updateTopicDto,
      { new: true },
    );
    if (!existingTopic) {
      throw new NotFoundException(`Topic #${topicId} not found`);
    }
    return existingTopic;
  }
  async getAllTopics(): Promise<Topic[]> {
    const topicsData = await this.userModel.find().populate('user');
    if (!topicsData || topicsData.length == 0) {
      throw new NotFoundException('Topics data not found!');
    }
    return topicsData;
  }
  async getTopic(topicId: string): Promise<Topic> {
    const existingTopic = await this.userModel.findById(topicId).exec();
    if (!existingTopic) {
      throw new NotFoundException(`Topic #${topicId} not found`);
    }
    return existingTopic;
  }

  async deleteTopic(topicId: string): Promise<Topic> {
    const deletedTopic = await this.userModel.findByIdAndDelete(topicId);
    if (!deletedTopic) {
      throw new NotFoundException(`Topic #${topicId} not found`);
    }
    return deletedTopic;
  }
}
