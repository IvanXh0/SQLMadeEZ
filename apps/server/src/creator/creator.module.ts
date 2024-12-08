import { Module } from '@nestjs/common';
import { CreatorController } from './creator.controller';
import { CreatorService } from './creator.service';
import { Creator } from './entities/creator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Creator]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [CreatorController],
  providers: [CreatorService],
})
export class CreatorModule {}
