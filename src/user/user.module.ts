import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { InMemoryUserRepository } from './user-repository';
import { USER_REPOSITORY } from './user.constants';


@Module({
  controllers: [UserController],
  providers: [UserService,
    {
      provide: USER_REPOSITORY,  
      useClass: InMemoryUserRepository, 
    },
  ],
  exports: [UserService], 
})
export class UserModule {}