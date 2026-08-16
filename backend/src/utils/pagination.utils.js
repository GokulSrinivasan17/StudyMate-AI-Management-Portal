const getPaginationParams = (query) => {
  const page = parseInt(query.page, 10) > 0 ? parseInt(query.page, 10) : 1;
  const limit = parseInt(query.limit, 10) > 0 && parseInt(query.limit, 10) <= 100 ? parseInt(query.limit, 10) : 10;
  const skip = (page - 1) * limit;

  const sortBy = query.sortBy || 'createdAt';
  const sortOrder = query.sortOrder && query.sortOrder.toLowerCase() === 'asc' ? 'asc' : 'desc';

  return { page, limit, skip, sortBy, sortOrder };
};

const formatPaginatedResponse = (data, totalItems, page, limit) => {
  const totalPages = Math.ceil(totalItems / limit) || 1;
  return {
    items: data,
    meta: {
      totalItems,
      itemCount: data.length,
      itemsPerPage: limit,
      totalPages,
      currentPage: page,
    },
  };
};

module.exports = {
  getPaginationParams,
  formatPaginatedResponse,
};
