function errorHandler(err, req, res, next) {
    console.error(err);

    const statusCode = err.statusCode || 500;

    const errorResponse = {
        error: {
            message: err.message || 'Ocurrió un error inesperado.',
            status: statusCode
        }
    };

    if (process.env.NODE_ENV !== 'production') {
        errorResponse.error.stack = err.stack;
    }

    res.status(statusCode).json(errorResponse);
}
export default errorHandler;
