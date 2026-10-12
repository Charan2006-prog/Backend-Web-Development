module.exports = function timing(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const elapsed = Date.now() - start;
    const requestId = req.id ? `[${req.id.slice(0, 8)}] ` : '';

    console.log(`${requestId}${req.method} ${req.path} took ${elapsed}ms`);
  });

  next();
};