import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(email: string, password: string, role: string = 'candidate') {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ email, password: hashed, role });
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }
}
