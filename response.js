const createResponse = (status, message, data = null, pagination = null) => {
  return {
    status,
    message,
    data,
    pagination,
  };
};

module.exports = createResponse;
