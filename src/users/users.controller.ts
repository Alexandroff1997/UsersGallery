import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/auth-roles.decorator';
import { AuthRolesGuard } from 'src/auth/auth-roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserCreateDto } from './dto/user-create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post()
	create(@Body() dto: UserCreateDto) {
		return this.usersService.createUser(dto);
	}

	@Roles('ADMIN')
	@UseGuards(AuthRolesGuard)
	@Get()
	getAllUsers() {
		return this.usersService.getAllUsers();
	}
}
