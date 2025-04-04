export const successResponse = (res, message, data = {}, status = 200) => {
    return res.status(status).json({
      success: true,
      status,
      message,
      data,
    });
  };
  
  export const errorResponse = (res, message, status = 500, error = null) => {
    return res.status(status).json({
      success: false,
      status,
      message,
      error: error ? error.toString() : null,
    });
  };
  