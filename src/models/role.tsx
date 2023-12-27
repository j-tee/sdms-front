export interface RoleState {
    roles: Role[];
    status: string;
    message: string;
    isLoading: boolean;
}

export interface Role {
    id?: number;
    name: string;
}