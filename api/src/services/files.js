const fetch = require('../tools/fetch');
const downloadCsv = require('../tools/download-csv');

/**
 * Gets the data from the files
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function
 * @returns {Promise<void>}
 */
async function getData(req, res, next) {
    if (!req.accepts('application/json')) {
        return res.status(406).json({
            error: 'Not Acceptable: application/json is required'
        });
    }

    const headers = {
        'authorization': `Bearer ${process.env.SUPER_SECRET_KEY}`
    };  
    try {
        const filesResponse = await fetch(`${process.env.API_URL}/secret/files`, {
            headers: headers
        });

        const data = await Promise.allSettled(filesResponse.files.map(async (file) => {
            const fileLines = await downloadCsv(`${process.env.API_URL}/secret/file/${file}`, {
                headers: headers
            });

            return {
                file: file,
                lines: fileLines
            };
        })).then(results => {
            return results.map(result => {
                if (result.status === 'fulfilled') {
                    return result.value;
                } else {
                    return null;
                }
            }).filter(Boolean)
        })
        
        res.json(data);
    } catch (error) {
        next(error);
    }
  }
  
  module.exports = {
    getData,
  };
  