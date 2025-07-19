import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";
import { CustomError } from "../../domain";

export class FileService {

    constructor(){ }

    async uploadMultiple(
        fileList: UploadedFile[], folder:string = 'uploads', 
        validExtensions:string[] = ['png', 'jpg', 'jpeg', 'gif']
    ): Promise<string[]>{

        const fileListPromise:Promise<string>[] = [];

        fileList.forEach(file => {
            fileListPromise.push(this.uploadSingle(file));
        })

        const fileNames = await Promise.all(fileListPromise);
        return fileNames;
    }

    async uploadSingle( file: UploadedFile, folder:string = 'uploads', 
        validExtensions:string[] = ['png', 'jpg', 'jpeg', 'gif']
    ): Promise<string> {
        try {
            const fileExtension = file.mimetype.split('/').at(1) || '';

            if(!validExtensions.includes(fileExtension)) {
                throw CustomError.badRequest('Invalid extension')
            }

            const destination = path.resolve(__dirname, '../../../assets/', folder );
            const name = file.name.split('.').at(0);

            const formatDate = new Date().toLocaleString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }).replace(/[\/: ]/g, '').replace(',', '');

            this.checkFolder(destination);
            await file.mv(destination + `/${name}-${formatDate}.${fileExtension}`);

            return `${name}-${formatDate}`;
        } catch(error) {
            console.log(error);
            return `there was an error: ${error}`;
        }
    }

    getFile(filename:string): string {
      const filepath = path.resolve(__dirname, '../../../assets/uploads', `${filename}` );

      if( !fs.existsSync(filepath) ) {
          console.log('no existe',filepath);
         throw CustomError.internalServer(`file not found`);
      } else {
        return filepath
      }
    }

    private checkFolder(folderPath: string) {
        if( !fs.existsSync(folderPath) ) {
            fs.mkdirSync(folderPath)
        }
    }

}