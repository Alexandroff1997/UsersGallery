import { Post, Body, Controller, Get, Param } from '@nestjs/common';
import { RoleCreateDto } from './dto/role-create.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
	constructor(private roleService: RolesService) {}

	@Post('/create')
	create(@Body() dto: RoleCreateDto) {
		return this.roleService.createRole(dto);
	}

	@Get('/:value')
	getByValue(@Param('value') value: string) {
		return this.roleService.getRoleByValue(value);
	}
}
