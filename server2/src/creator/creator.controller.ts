import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { CreatorService } from './creator.service';
import { Response } from 'express';
import { CreateCreatorDto } from './dto/creator.dto';

@Controller('creator')
export class CreatorController {
  constructor(private readonly creatorService: CreatorService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const creators = await this.creatorService.getAll();
      res.status(HttpStatus.OK).send(creators);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('execute-query')
  async executeQuery(
    @Body() body: CreateCreatorDto,
    @Query('shouldSaveQuery') shouldSaveQuery: string,
    @Res() res: Response,
  ) {
    const shouldSave = shouldSaveQuery !== undefined;
    try {
      const result = await this.creatorService.executeQuery(body, shouldSave);
      res
        .status(HttpStatus.OK)
        .json({ msg: 'Query executed successfully', result });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:userId')
  async getAllQueriesByUser(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    try {
      const queriesByUser =
        await this.creatorService.getAllQueriesByUser(userId);
      res.status(HttpStatus.OK).send(queriesByUser);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':queryId/query')
  async getQueryById(@Param('queryId') queryId: string, @Res() res: Response) {
    try {
      const query = await this.creatorService.getQueryById(queryId);
      if (!query)
        throw new HttpException('Query not found', HttpStatus.NOT_FOUND);
      res.status(HttpStatus.OK).send(query);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':queryId')
  async deleteQuery(@Param('queryId') queryId: string, @Res() res: Response) {
    try {
      await this.creatorService.deleteQuery(queryId);
      res.sendStatus(HttpStatus.NO_CONTENT);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
