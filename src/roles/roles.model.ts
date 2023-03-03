import { Column, DataType, Table, Model } from 'sequelize-typescript';

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
}