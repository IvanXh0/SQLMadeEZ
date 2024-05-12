import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TableService } from './table.service';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get(':userId')
  async getTables(@Param('userId') userId: string) {
    if (!userId) {
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }
    try {
      const tables = await this.tableService.getTables(userId);
      return tables;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
