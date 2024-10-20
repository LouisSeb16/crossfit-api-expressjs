import { Response } from 'express';

declare global {
    namespace Express {
        interface Response {
            pagination?: {
                currentPage: number;
                totalItems: number;
                totalPages: number;
                limit: number;
                data: any[];
            };
        }
    }
}
