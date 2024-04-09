import { PartialType } from '@nestjs/mapped-types';
import { createdTopicDto } from './create-topic.dto';

export class UpdateTopicDto extends PartialType(createdTopicDto) {}
