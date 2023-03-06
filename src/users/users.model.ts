import { Column, DataType, Table, Model, BelongsToMany, HasMany } from 'sequelize-typescript';
import { GalleryModel } from 'src/gallery/gallery.model';
import { RolesModel } from 'src/roles/roles.model';
import { UserRolesModel } from 'src/roles/user-roles.model';

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

	@BelongsToMany(() => RolesModel, () => UserRolesModel)
	roles: RolesModel[];

	@HasMany(() => GalleryModel)
	gallery: GalleryModel[];
}