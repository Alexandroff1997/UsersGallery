import { forwardRef, Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModel } from 'src/users/users.model';
import { GalleryModel } from './gallery.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [GalleryService],
  controllers: [GalleryController],
  imports: [
    SequelizeModule.forFeature([UsersModel, GalleryModel]),
    FilesModule,
    forwardRef(() => AuthModule),
  ]
})
export class GalleryModule {}
