export const asyncHandler = (API) => {
  return (req, res, next) => {
    API(req, res, next).catch(async (err) => {
      console.log({ err: JSON.stringify(err) });
      return next(new Error(err, { cause: 500 }));
    });
  };
};

export const globalResponse = (err, req, res, next) => {
  if (err) {
    console.log({ err });

    if (req.error) {
      return res.status(err["cause"] || 500).json({ ErrorMsg: req.error });
    }
    return res.status(err["cause"] || 500).json({ ErrorMsg: err.message });
  }
};
