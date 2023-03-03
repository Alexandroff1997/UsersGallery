import { Body, Controller, Post, Get } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Post()
	create(@Body() dto: UserCreateDto) {
		return this.usersService.createUser(dto);
	}

	@Get()
	getAllUsers() {
		return this.usersService.getAllUsers();
	}
}
