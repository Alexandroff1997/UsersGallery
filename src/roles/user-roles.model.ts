import { Column, DataType, Table, Model, ForeignKey } from 'sequelize-typescript';
import { UsersModel } from 'src/users/users.model';
import { RolesModel } from './roles.model';

@Table({ tableName: 'user_roles' })
export class UserRolesModel extends Model<UserRolesModel> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ForeignKey(() => RolesModel)
	@Column({ type: DataType.INTEGER })
	roleId: number;

	@ForeignKey(() => UsersModel)
	@Column({ type: DataType.INTEGER })
	userId: number;
}