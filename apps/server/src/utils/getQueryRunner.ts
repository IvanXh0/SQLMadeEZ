import { QueryRunner } from 'typeorm';
import { dynamicDataSource, AppDataSource } from '../const/dataSource';
import { User } from 'src/user/entities/user.entity';

export const getQueryRunner = async (userId: string): Promise<QueryRunner> => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ userId });
  if (!user) throw new Error('User not found');

  const dataSource = await dynamicDataSource(userId);
  await dataSource.initialize();
  return dataSource.createQueryRunner();
};
