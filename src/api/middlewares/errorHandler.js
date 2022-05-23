module.exports = {
  // Handle errors
  errorHandler: (err, req, res, next) => {
    res.json({
      success: false,
      data: null,
      error: err.message,
    });
  },
};
