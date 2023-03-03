import { Column, DataType, Table, Model } from 'sequelize-typescript';

interface UserCreation {
	email: string;
	password: string;
}

@Table({ tableName: 'users' })
export class UsersModel extends Model<UsersModel, UserCreation> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string;

	@Column({ type: DataType.STRING, allowNull: false })
	password: string;
}