export default (req, res, next) => {
  if (
    req.header("x-api-key") === process.env.API_KEY ||
    process.env.NODE_ENV === "development"
  ) {
    next();
  } else {
    res.sendStatus(403);
  }
};
