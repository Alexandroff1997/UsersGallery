import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModel } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { RolesModel } from './roles/roles.model';
import { UserRolesModel } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';

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
      models: [UsersModel, RolesModel, UserRolesModel],
			autoLoadModels: true,
    }),
		UsersModule,
		RolesModule,
		AuthModule,
	]
})
export class AppModule {}
