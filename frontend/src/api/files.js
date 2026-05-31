function getFilesData(fileName = '') { 
    return fetch(`${process.env.API_URL}/files/data${fileName ? `?fileName=${fileName}` : ''}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error));
}

function getListOfFiles() { 
    return fetch(`${process.env.API_URL}/files/list`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error));
}


export default { getListOfFiles, getFilesData};