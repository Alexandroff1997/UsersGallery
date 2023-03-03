import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesModel } from './roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModel } from 'src/users/users.model';
import { UserRolesModel } from './user-roles.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([RolesModel, UsersModel, UserRolesModel])
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
