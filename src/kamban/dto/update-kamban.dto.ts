import { PartialType } from '@nestjs/swagger';
import { CreateKambanDto } from './create-kamban.dto';

export class UpdateKambanDto extends PartialType(CreateKambanDto) {}
