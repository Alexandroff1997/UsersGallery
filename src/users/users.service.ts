import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UsersModel } from './users.model';

@Injectable()
export class UsersService {

	constructor(
		@InjectModel(UsersModel) private userRepository: typeof UsersModel,
		private rolesService: RolesService) {}

	async createUser(dto: UserCreateDto) {
		const user = await this.userRepository.create(dto);
		const role = await this.rolesService.getRoleByValue('ADMIN');
		await user.$set('roles', [role.id]);
		user.roles = [role];
		return user;
	}

	async getAllUsers() {
		const users = await this.userRepository.findAll({ include: { all: true }});
		return users;
	}

	async getUsersByEmail(email: string) {
		const user = this.userRepository.findOne({ where: { email }, include: { all: true} });
		return user;
	}
}
