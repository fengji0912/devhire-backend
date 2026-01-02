import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepository: Repository<Job>,
  ) {}

  // 获取所有职位
  findAll(): Promise<Job[]> {
    return this.jobsRepository.find();
  }

  // 根据ID获取职位
  findOne(id: number): Promise<Job | null> {
    return this.jobsRepository.findOne({ where: { id } });
  }

  // 创建职位
  create(title: string, description: string): Promise<Job> {
    const job = this.jobsRepository.create({ title, description });
    return this.jobsRepository.save(job);
  }

  // 删除职位
  async remove(id: number): Promise<void> {
    await this.jobsRepository.delete(id);
  }
}
