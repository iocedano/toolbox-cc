const fetch = require('../tools/fetch');

async function getHealth(req, res, next) {
    url = `${process.env.API_URL}/system/ping`;

   
    try {
        const response = await fetch(url);

        if (response.ok) {
            res.json({ status: 'ok' });
        } else {
            res.status(500).json({ 
                status: 'error', 
                code: response.code, 
                message: `System ping failed with status code: ${response.code}`,
            });
        }
    } catch (error) {
        next(new Error(`Error getting health review status of the API: ${error.message}. Status code: ${error.statusCode}`));
    }
}

module.exports = {
    getHealth
};