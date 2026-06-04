const API_URL = (process.env.API_URL || '').replace(/\/$/, '');

function getFilesData(fileName = '') {
    return fetch(`${API_URL}/api/files/data${fileName ? `?fileName=${fileName}` : ''}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error(error);
            return { files: [] };
        }
    );
}

function getListOfFiles() {
    return fetch(`${API_URL}/api/files/list`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error(error);
            return { files: [] };
        }
    );
}


export default { getListOfFiles, getFilesData };