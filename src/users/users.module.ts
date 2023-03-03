import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModel } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRolesModel } from 'src/roles/user-roles.model';
import { UsersController } from './users.controller';
import { UsersModel } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([UsersModel, RolesModel, UserRolesModel]),
    RolesModule
  ]
})
export class UsersModule {}
