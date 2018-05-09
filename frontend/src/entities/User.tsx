import Folder from './Folder';
import Role from './Role';

class User {
    private user_id: number;
    private email: string;
    private name: string;
    private roles: Role[];
    private folders: Folder[];

    constructor(user_id: number, email: string, name: string, roles: Role[], folders: Folder[]) {
        this.user_id = user_id;
        this.email = email;
        this.name = name;
        this.roles = roles;
        this.folders = folders;
    }

    public get_user_id(): number {
        return this.user_id;
    }

    public get_email(): string {
        return this.email;
    }

    public set_email(email: string): User {
        this.email = email;
        return this;
    }

    public get_name(): string {
        return this.name;
    }

    public set_name(name: string): User {
        this.name = name;
        return this;
    }

    public get_roles(): Role[] {
        return this.roles;
    }

    public set_roles(roles: Role[]): User {
        this.roles = roles;
        return this;
    }

    public add_role(role: Role): User {
        this.roles.push(role);
        return this;
    }

    public remove_role(role: Role): User {
        this.roles = this.roles.filter((r) => {
            return r != role;
        });

        return this;
    }

    public get_folders(): Folder[] {
        return this.folders;
    }

    public set_folders(folders: Folder[]): User {
        this.folders = folders;
        return this;
    }

    public add_folder(folder: Folder): User {
        this.folders.push(folder);
        return this;
    }

    public remove_folder(folder: Folder): User {
        this.folders = this.folders.filter((f) => {
            return f.get_folder_id() != folder.get_folder_id();
        });

        return this;
    }
}

export default User;
