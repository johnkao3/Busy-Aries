import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  async create(createUserDto: CreateUserDto) {
    const { username, legalName, nickName, role } = createUserDto;
    const hashPassword = await this.hashPassword(createUserDto.password);

    const user = new User();
    user.username = username;
    user.legalName = legalName;
    user.nickName = nickName;
    user.password = hashPassword;
    user.role = role;

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      where: {
        isActive: true,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  findByUsername(username: string) {
    return this.userRepository.findOneBy({
      username,
    });
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ id }, updateUserDto);

    return this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
