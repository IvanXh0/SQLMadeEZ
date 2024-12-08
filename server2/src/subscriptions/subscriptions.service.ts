import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';

export interface CreateSubscriptionDto {
  userId: string;
  status: 'active' | 'cancelled' | 'expired' | 'paused';
  planId: string;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
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
      });

      return await this.subscriptionRepository.save(subscription);
    } catch (error) {
      throw error;
    }
  }

  async update(
    email: string,
    updateDto: Partial<Subscription>,
  ): Promise<Subscription> {
    try {
      const subscription = await this.subscriptionRepository.findOneBy({
        user: { email },
      });

      if (!subscription) {
        throw new NotFoundException(
          `Subscription with email ${email} not found`,
        );
      }

      Object.assign(subscription, updateDto);

      return await this.subscriptionRepository.save(subscription);
    } catch (error) {
      throw error;
    }
  }

  async cancel(email: string): Promise<Subscription> {
    try {
      const subscription = await this.subscriptionRepository.findOneBy({
        user: { email },
      });

      if (!subscription) {
        throw new NotFoundException(
          `Subscription with email ${email} not found`,
        );
      }

      subscription.status = 'cancelled';

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
