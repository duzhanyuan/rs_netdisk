class Role {
    private role_id: number;
    private name: string;

    public constructor(role_id: number, name: string) {
        this.role_id = role_id;
        this.name = name;
    }

    public get_role_id(): number {
        return this.role_id;
    }

    public get_name(): string {
        return this.name;
    }

    public set_name(name: string): Role {
        this.name = name;

        return this;
    }
}

export default Role;
