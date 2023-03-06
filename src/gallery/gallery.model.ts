import { Column, DataType, Table, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { UsersModel } from 'src/users/users.model';

interface GalleryCreation {
	image: string;
	userId: number;
}

@Table({ tableName: 'gallery' })
export class GalleryModel extends Model<GalleryModel, GalleryCreation> {
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING })
	image: string;

	@ForeignKey(() => UsersModel)
	@Column({type: DataType.INTEGER})
	userId: number;

	@BelongsTo(() => UsersModel)
	owner: UsersModel
}