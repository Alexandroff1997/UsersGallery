import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesModel } from './roles.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([RolesModel])
  ]
})
export class RolesModule {}
