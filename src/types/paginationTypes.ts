export interface PaginatedResponse<T> {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    limit: number;
    data: T[];
};
