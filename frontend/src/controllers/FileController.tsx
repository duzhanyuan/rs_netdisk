import File from '../entities/File';
import Folder from '../entities/Folder';

class FileController {
    public all(folder: Folder): File[] {
        return folder.get_files();
    }

    public find(folder: Folder, file_id: number): File | undefined {
        return folder.get_files().find(file => {
            return file.get_file_id() == file_id;
        });
    }

    public store(folder: Folder, file_id: number, name: string, extension: string): File {
        let file = new File(file_id, name, extension);

        folder.add_file(file);

        return file;
    }

    public update(folder: Folder, file: File): File {
        folder.remove_file(file);
        folder.add_file(file);

        return file;
    }

    public delete(folder: Folder, file: File): File {
        folder.remove_file(file);

        return file;
    }
}

export default new FileController();
