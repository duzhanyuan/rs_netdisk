import File from './File';

class Folder {
    private folder_id: number;
    private name: string;
    private parent_id: number | undefined;
    private folders: Folder[];
    private files: File[];

    public constructor(folder_id: number, parent_id: number | undefined, name: string, folders: Folder[], files: File[]) {
        this.folder_id = folder_id;
        this.parent_id = parent_id;
        this.name = name;
        this.folders = folders;
        this.files = files;
    }

    public get_folder_id(): number {
        return this.folder_id;
    }

    public get_files(): File[] {
        return this.files;
    }

    public set_files(files: File[]): Folder {
        this.files = files;
        return this;
    }

    public add_file(file: File): Folder {
        this.files.push(file);
        return this;
    }

    public remove_file(file: File): Folder {
        this.files = this.files.filter((f) => {
            return f.get_file_id() != file.get_file_id();
        });

        return this;
    }
}

export default Folder;
