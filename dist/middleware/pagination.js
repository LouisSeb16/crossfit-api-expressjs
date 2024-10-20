"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paginate = (data) => {
    return (req, res, next) => {
        const { page = 1, limit = 5 } = req.query;
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
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
exports.default = paginate;
