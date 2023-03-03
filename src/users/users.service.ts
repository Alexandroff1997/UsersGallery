import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCreateDto } from './dto/user-create.dto';
import { UsersModel } from './users.model';

@Injectable()
export class UsersService {

	constructor(@InjectModel(UsersModel) private userRepository: typeof UsersModel) {}

	async createUser(dto: UserCreateDto) {
		const user = await this.userRepository.create(dto);
		return user;
	}

	async getAllUsers() {
		const users = await this.userRepository.findAll();
		return users;
	}
}
