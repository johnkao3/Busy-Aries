import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepo.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }

    const isValidPassword = await this.validatePassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      return null;
    }

    if (user && isValidPassword) {
      return {
        id: user.id,
        username: user.username,
        legalName: user.legalName,
        nickName: user.nickName,
        isActive: user.isActive,
        role: user.role,
      };
    } else {
      return null;
    }
  }
}
