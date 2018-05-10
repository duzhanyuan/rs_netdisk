import User from '../entities/User';

class AuthService {
    private static token: string | undefined = undefined;
    private static user: User | undefined = undefined;

    public get_user(): User | undefined {
        return AuthService.user;
    }

    public set_user(user: User): User {
        AuthService.user = user;

        return AuthService.user;
    }

    public delete_user() {
        AuthService.user = undefined;
    }

    public get_token(): string | undefined {
        return AuthService.token;
    }

    public set_token(token: string): string {
        AuthService.token = token;

        return AuthService.token;
    }

    public delete_token() {
        AuthService.token = undefined;
    }

    public is_authenticated(): boolean {
        return AuthService.user !== undefined && AuthService.token !== undefined;
    }

    public has_role(match: string): boolean {
        if ( AuthService.user === undefined ) {
            return false;
        }

        return AuthService.user.get_roles().some(role => {
            return role.get_name() === match;
        });
    }
}

export default new AuthService();
