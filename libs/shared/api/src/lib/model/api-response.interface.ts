export interface APIMetaInfo{
    version: string;
    type: 'object' | 'list' | 'none';
    count: number;
}

export interface APIResponse<T> {
    results?: T[] | T;
    info: APIMetaInfo;
}