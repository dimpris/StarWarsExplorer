export interface ResourceListItem {
    name: string;
    title: string;
    url: string;
    created: string;
}

export interface ResourceListResponse {
    count: number;
    next: string;
    previous: string;
    results: Array<ResourceListItem>;
}