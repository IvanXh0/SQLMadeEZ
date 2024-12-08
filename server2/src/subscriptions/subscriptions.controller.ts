import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import {
  CreateSubscriptionDto,
  SubscriptionsService,
} from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  async create(@Body() createDto: CreateSubscriptionDto) {
    return await this.subscriptionsService.create(createDto);
  }

  @Patch(':email')
  async update(
    @Param('email') email: string,
    @Body() updateDto: Partial<CreateSubscriptionDto>,
  ) {
    return await this.subscriptionsService.update(email, updateDto);
  }

  @Post(':email/cancel')
  async cancel(@Param('email') email: string) {
    return await this.subscriptionsService.cancel(email);
  }
}
