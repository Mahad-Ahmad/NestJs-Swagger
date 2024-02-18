import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getUsers(admin: 'true' | 'false') {
    if (admin) return this.userRepository.find({ where: { admin } });
    return this.userRepository.find();
  }

  getUser(id: number) {
    const user = this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);

    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    // this will not return the updated object
    // const user = await this.userRepository.update(id,updateUserDto);

    const user = await this.getUser(id);

    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  async deleteUser(id: number) {
    // this will not return the deleted object
    // return this.userRepository.delete(user);

    //  return this.userRepository.createQueryBuilder().select().where();

    const user = await this.getUser(id);

    return this.userRepository.remove(user);
  }
}
