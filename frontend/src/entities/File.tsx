class File {
    private file_id: number;
    private name: string;
    private extension: string;

    public constructor(file_id: number, name: string, extension: string) {
        this.file_id = file_id;
        this.name = name;
        this.extension = extension;
    }

    public get_file_id(): number {
        return this.file_id;
    }
}

export default File;
