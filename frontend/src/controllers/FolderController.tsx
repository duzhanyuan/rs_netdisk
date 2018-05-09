import Folder from '../entities/Folder';
import User from '../entities/User';

class FolderController {
    public all(user: User): Folder[] {
        return user.get_folders();
    }

    public find(user: User, folder_id: number): Folder | undefined {
        return user.get_folders().find(folder => {
            return folder.get_folder_id() == folder_id;
        });
    }

    public store(user: User, folder_id: number, parent_id: number | undefined, name: string):  Folder {
        let folder = new Folder(folder_id, parent_id, name, [], []);

        user.add_folder(folder);

        return folder;
    }

    public update(user: User, folder: Folder): Folder {
        user.remove_folder(folder);
        user.add_folder(folder);

        return folder;
    }

    public delete(user: User, folder: Folder): Folder {
        user.remove_folder(folder);

        return folder;
    }
}

export default new FolderController();
