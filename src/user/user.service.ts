import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository, User, UserResponse } from 'src/shared/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';
import { httpErrors } from 'src/shared/handle-errors';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { USER_REPOSITORY } from './user.constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)        
    private userRepository: IUserRepository, 
  ) {}

    private stripPassword(user: User): UserResponse {
    const userResponse = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return userResponse;
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponse>{
    const newUser = {
      id: randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    await this.userRepository.create(newUser)

    return this.stripPassword(newUser)
  }

  async findAll(): Promise<UserResponse[]>{
    const users = await this.userRepository.findAll()
    const usersResponse = users.map(user=> this.stripPassword(user))
    return usersResponse

  }

  
  async findOne(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) throw httpErrors.notFound('User not found');
    return this.stripPassword(user);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto ): Promise<UserResponse>{
    const user = await this.userRepository.findById(id)
    if (!user) throw httpErrors.notFound('User not found');

    if (user.password !== updatePasswordDto.oldPassword) {
      throw httpErrors.forbidden('Old password is wrong');
    }

     const updatedUser = await this.userRepository.update(id, {
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });

    return this.stripPassword(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id)
    if (!user) throw httpErrors.notFound('User not found');
    await this.userRepository.delete(id)
  }

}
