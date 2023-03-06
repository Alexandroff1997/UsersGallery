import { Body, Controller, Post, Get, UseGuards, Param } from '@nestjs/common';
import { Roles } from 'src/auth/auth-roles.decorator';
import { AuthRolesGuard } from 'src/auth/auth-roles.guard';
import { AddRoleToUserDto } from './dto/add-role-to-user.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Roles('ADMIN')
	@UseGuards(AuthRolesGuard)
	@Get()
	getAllUsers() {
		return this.usersService.getAllUsers();
	}

	@Roles('ADMIN')
	@UseGuards(AuthRolesGuard)
	@Get('/:id')
	getUser(@Param('id') id: number) {
		return this.usersService.getUser(id);
	}

	@Roles('ADMIN')
	@UseGuards(AuthRolesGuard)
	@Post('/role')
	addRoleToUser(@Body() dto: AddRoleToUserDto) {
		return this.usersService.addRoleToUser(dto);
	}
}
