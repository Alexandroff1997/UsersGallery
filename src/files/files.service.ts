import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
	async createFile(file): Promise<string> {
		try {
			const fileName = uuid.v4() + '.jpg';
			const filePath = path.resolve(__dirname, '..', 'static');

			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true });
			}
			fs.writeFileSync(path.join(filePath, fileName), file.buffer);
			return fileName;
		} catch (err) {
			throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async deleteImage(fileName): Promise<string> {
		try {
			const filePath = path.resolve(__dirname, '..', 'static');
			if (!fs.existsSync(filePath) || !fs.existsSync(path.join(filePath, fileName))) return;
			fs.unlinkSync(path.join(filePath, fileName));
			return fileName;
		} catch (err) {
			throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async deleteAllImages() {
		try {
			const filePath = path.resolve(__dirname, '..', 'static');
			if (!fs.existsSync(filePath)) {
				throw new HttpException('Нечего удалять', HttpStatus.NOT_FOUND);
			}
			fs.rmdir(filePath, { recursive: true }, 
				(err) => { 
					console.error(err); 
				}
			);
			return {
				message: "Удаление базы данных и папки static успешно выполнено"
			}
		} catch (err) {
			throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
