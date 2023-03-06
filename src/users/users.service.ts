import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GalleryService } from 'src/gallery/gallery.service';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleToUserDto } from './dto/add-role-to-user.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UsersModel } from './users.model';

@Injectable()
export class UsersService {

	constructor(
		@InjectModel(UsersModel) private userRepository: typeof UsersModel,
		private rolesService: RolesService) {}

	async createUser(dto: UserCreateDto) {
		const user = await this.userRepository.create(dto);
		const role = await this.rolesService.getRoleByValue(dto.role);
		await user.$set('roles', [role.id]);
		user.roles = [role];
		return user;
	}

	async getUser(id: number) {
		const user = await this.userRepository.findOne({ where: { id }, include: { all: true }})
		if (user) {
			return user;
		}
		throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
	}

	async getAllUsers() {
		const users = await this.userRepository.findAll({ include: { all: true }});
		if (users) {
			return users;
		}
		throw new HttpException('Пользователи не найдены', HttpStatus.NOT_FOUND);
	}

	async getUsersByEmail(email: string) {
		const user = this.userRepository.findOne({ where: { email }, include: { all: true } });
		return user;
	}

	async addRoleToUser(dto: AddRoleToUserDto) {
		const user = await this.userRepository.findByPk(dto.userId);
		const role = await this.rolesService.getRoleByValue(dto.value);

		if (role && user) {
			await user.$add('role', role.id);
			return dto;
		}
		throw new HttpException('Роль или пользователь не найдены', HttpStatus.NOT_FOUND);
	}
}
