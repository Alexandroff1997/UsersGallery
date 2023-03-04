import { Controller, Post, Body } from '@nestjs/common';
import { UserCreateDto } from 'src/users/dto/user-create.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

	constructor(private authService: AuthService) {}

	@Post('/login')
	login(@Body() dto: UserCreateDto) {
		return this.authService.login(dto);
	}

	@Post('/register')
	register(@Body() dto: UserCreateDto) {
		return this.authService.register(dto);
	}
}
