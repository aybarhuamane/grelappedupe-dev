export interface IRole {
    id: number
    name: string
}

export interface IRoleList {
    id: number
    name: string
}

export interface IRoleFilter {
    name?: string
    page?: number
    ordering?: string
}
