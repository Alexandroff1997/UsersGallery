import { Controller, Delete, Put, Get, Post, UseGuards, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/auth-roles.decorator';
import { AuthRolesGuard } from 'src/auth/auth-roles.guard';
import { ImageDeleteDto } from './dto/image-delete.dto';
import { ImagePutDto } from './dto/image-put.dto';
import { ImageUploadDto } from './dto/image-upload.dto';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {

	constructor(private galleryService: GalleryService) {}

	@UseInterceptors(FileInterceptor('image'))
	@Post()
	uploadImage(@Body() dto: ImageUploadDto, @UploadedFile() image) {
		return this.galleryService.upload(dto, image);
	}
	
	@Get()
	getAllImages() {
		return this.galleryService.getAllImages();
	}

	@UseInterceptors(FileInterceptor('image'))
	@Put()
	changeImage(@Body() dto: ImagePutDto, @UploadedFile() image) {
		return this.galleryService.changeImage(dto, image);
	}

	@Delete()
	deleteImage(@Body() dto: ImageDeleteDto) {
		return this.galleryService.deleteImage(dto);
	}

	@Roles('ADMIN')
	@UseGuards(AuthRolesGuard)
	@Delete('/delete-all-images')
	deleteAllImages() {
		return this.galleryService.deleteAllImages();
	}
}
