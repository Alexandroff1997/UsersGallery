import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from 'src/users/dto/user-create.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { UsersModel } from 'src/users/users.model';

@Injectable()
export class AuthService {

	constructor(
		private usersService: UsersService,
		private jwtService: JwtService) {}

	async login(dto: UserCreateDto) {
	}

	async register(dto: UserCreateDto) {
		const candidate = await this.usersService.getUsersByEmail(dto.email);
		if (candidate) {
			throw	new HttpException('Пользователь с таким email не найден', HttpStatus.BAD_REQUEST);
		}
		const hashPassword = await bcrypt.hash(dto.password, process.env.SALT || 5);
		const user = await this.usersService.createUser({...dto, password: hashPassword});
		return this.generateToken(user);
	}

	private async generateToken(user: UsersModel) {
		const payload = {
			email: user.email,
			id: user.id,
			roles: user.roles
		};
		return {
			token: this.jwtService.sign(payload)
		}
	}
}
