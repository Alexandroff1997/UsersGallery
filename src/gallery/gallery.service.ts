import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { ImageDeleteDto } from './dto/image-delete.dto';
import { ImagePutDto } from './dto/image-put.dto';
import { ImageUploadDto } from './dto/image-upload.dto';
import { GalleryModel } from './gallery.model';

@Injectable()
export class GalleryService {

	constructor(
		@InjectModel(GalleryModel) private galleryRepository: typeof GalleryModel,
		private fileService: FilesService) {}

	async upload(dto: ImageUploadDto, image: any) {
		const fileName = await this.fileService.createFile(image);
		const picture = await this.galleryRepository.create({ ...dto, image: fileName });
		return picture;
	}

	async getAllImages() {
		const images = await this.galleryRepository.findAll({ include: { all: true }});
		
		if (images) {
			return images;
		}
		throw new HttpException('Картинки не найдены', HttpStatus.NOT_FOUND);
	}

	async deleteImage(dto: ImageDeleteDto) {
		await this.galleryRepository.destroy({
			where: { userId: dto.userId, image: dto.imageName },
		})
		return this.fileService.deleteImage(dto.imageName);
	}

	async deleteAllImages() {
		await this.galleryRepository.destroy({
			where: { },
			truncate: true
		})
		return this.fileService.deleteAllImages();
	}

	async changeImage(dto: ImagePutDto, image: any) {
		const { dataValues }  = await this.galleryRepository.findOne({ where: { id: dto.imageId }});
		
		await this.fileService.deleteImage(dataValues.image);

		const fileName = await this.fileService.createFile(image);

		const picture = await this.galleryRepository.update(
			{ image: fileName }, 
			{ where: { id: dto.imageId }}
		);
		return fileName;
	}
}
