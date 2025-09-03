module.exports = (page, limit, total) => {
    const totalPages = Math.ceil(total / limit) || 1;
    return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1
    };
    };