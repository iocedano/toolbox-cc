

/**
 * Validates the headers of the request
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function
 * @returns {void}
 */
function validateHeaders(req, res, next) {
    if (!req.accepts('application/json')) {
        return res.status(406).json({
            error: 'Not Acceptable: application/json is required',
        });
    }
    next();
}

module.exports = validateHeaders;