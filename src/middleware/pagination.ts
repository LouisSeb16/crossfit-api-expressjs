import { Request, Response } from 'express';

const paginate = (data: any[]) => {
    return (req: Request, res: Response, next: any): void => {

        const { page = 1, limit = 5 } = req.query;

        const pageNum = parseInt(page as string, 10);

        const limitNum = parseInt(limit as string, 10);

        const totalItems = data.length;

        const startIndex = (pageNum - 1) * limitNum;

        const endIndex = pageNum * limitNum;

        const paginatedData = data.slice(startIndex, endIndex);

        const totalPages = Math.ceil(totalItems / limitNum);

        res.pagination = {
            currentPage: pageNum,
            totalItems,
            totalPages,
            limit: limitNum,
            data: paginatedData
        };

        next();
    };
};

export default paginate;
