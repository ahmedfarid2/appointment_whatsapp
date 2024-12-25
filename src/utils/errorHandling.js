export const asyncHandler = (API) => {
  return (req, res, next) => {
    API(req, res, next).catch(async (err) => {
      console.log({ err: JSON.stringify(err) });
      return next(new Error(err, { cause: 500 }));
    });
  };
};

export const globalResponse = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err); 
  }

  console.error("Global Error:", err);
  const errorMessage =
    typeof err.message === "object" ? JSON.stringify(err.message) : err.message;
  res.status(err.cause || 500).json({ ErrorMsg: errorMessage });
};
