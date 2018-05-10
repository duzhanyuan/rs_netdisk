import Folder from '../entities/Folder';
import Role from '../entities/Role';
import User from '../entities/User';

class UserService {
    public make_user(user_id: number, name: string, email: string, roles: Role[], folders: Folder[]): User {
        return new User(user_id, name, email, roles, folders);
    }
}

export default new UserService();
