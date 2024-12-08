import { Body, Controller } from '@nestjs/common';
import {
  CreateSubscriptionDto,
  SubscriptionsService,
} from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  async create(@Body() createDto: CreateSubscriptionDto) {
    return await this.subscriptionsService.create(createDto);
  }
}
