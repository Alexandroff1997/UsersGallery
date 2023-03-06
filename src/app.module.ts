import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModel } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { RolesModel } from './roles/roles.model';
import { UserRolesModel } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { GalleryModule } from './gallery/gallery.module';
import { GalleryModel } from './gallery/gallery.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
	controllers: [],
	providers: [],
	imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
		SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [UsersModel, RolesModel, UserRolesModel, GalleryModel],
			autoLoadModels: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
		UsersModule,
		RolesModule,
		AuthModule,
		GalleryModule,
		FilesModule,
	]
})
export class AppModule {}
