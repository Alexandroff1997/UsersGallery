import { Column, DataType, Table, Model, BelongsToMany } from 'sequelize-typescript';
import { UsersModel } from 'src/users/users.model';
import { UserRolesModel } from './user-roles.model';

interface RoleCreation {
	value: string;
	description: string;
}

@Table({ tableName: 'roles' })
export class RolesModel extends Model<RolesModel, RoleCreation> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	value: string;

	@Column({ type: DataType.STRING, allowNull: false })
	description: string;

	@BelongsToMany(() => UsersModel, () => UserRolesModel)
	users: UsersModel[];
}