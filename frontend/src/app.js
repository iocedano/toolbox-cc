import { useState, useEffect } from 'react';
import { Container, Navbar} from 'react-bootstrap';
import Table from './components/Table';
import FileLine from './components/Table/components/TableFileRow';
import Select from './components/FormSelect';
import { default as filesApi } from './api/files';
import './app.css';

function App() {
    const [filesList, setFilesList] = useState([]);
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');

    useEffect(() => {
        filesApi.getListOfFiles().then(data => {
            setFilesList(data.files);
        });
    }, []);

    useEffect(() => {
        filesApi.getFilesData(selectedFile).then(data => {
            setFiles(data);
        });
    }, [selectedFile]);

    const onSelectFile = (event) => {
        const file = event.target.value;
        setSelectedFile(file === 'all' ? '' : file);
    }

    const headers = ['File Name', 'Text', 'Number', 'Hex'];

    return (
        <>
            <Navbar className="mb-4 navbar-component">
                <Container>
                    <Navbar.Brand href="#">React Test App</Navbar.Brand>
                </Container>
            </Navbar>

            <Container>
                <Select options={filesList} includeAll={true} onChange={onSelectFile} />
            </Container>

            <Container>
                <Table headers={headers}>
                    {files.map((file) => (
                        file.lines.map((line) => (
                            <FileLine key={line.hex} fileName={file.file} text={line.text} number={line.number} hex={line.hex} />
                        ))
                    ))}
                </Table>
            </Container>
        </>
    );
}

export default App;