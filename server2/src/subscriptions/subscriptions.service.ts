import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';

export interface CreateSubscriptionDto {
  userId: string;
  lemonSqueezyId: string;
  planName: string;
  price: number;
  currency: string;
  billingFrequency: 'monthly' | 'yearly';
  currentPeriodEnd: Date;
}

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async create(createDto: CreateSubscriptionDto): Promise<Subscription> {
    try {
      const subscription = this.subscriptionRepository.create({
        ...createDto,
        status: 'active',
      });

      return await this.subscriptionRepository.save(subscription);
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    return subscription;
  }

  async findByUserId(userId: string): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findByLemonSqueezyId(lemonSqueezyId: string): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { lemonSqueezyId },
    });

    if (!subscription) {
      throw new NotFoundException(
        `Subscription with LemonSqueezy ID ${lemonSqueezyId} not found`,
      );
    }

    return subscription;
  }

  async getActiveSubscription(userId: string): Promise<Subscription | null> {
    return this.subscriptionRepository.findOne({
      where: {
        userId,
        status: 'active',
      },
      order: { createdAt: 'DESC' },
    });
  }
}
