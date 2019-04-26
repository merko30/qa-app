module.exports = errorHandler = (err, req, res, next) => {
  console.log(err.message);
  const message = err.message || "Something went wrong";
  res.status(err.status || 500).json({ message });
};
