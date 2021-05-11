module.exports = {
  respondError: (message, data) => ({
    error: {
      message,
      data,
    },
  }),
  respondItems: (items) => ({
    items,
    total: items.length,
  }),
  respondSuccess: (data) => ({
    success: true,
    ...data
  }),
};
