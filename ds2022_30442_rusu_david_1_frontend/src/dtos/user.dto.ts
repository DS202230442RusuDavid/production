import Role from "./role.dto";

export default interface User {
    id: number | null,
    email: string,
    role: Role,
}