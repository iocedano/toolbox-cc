import { useState, useEffect } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Table from './components/Table';
import FileLine from './components/Table/components/TableFileRow';
import Select from './components/FormSelect';
import { default as filesApi } from './api/files';
import './app.css';
import { useSelector, useDispatch } from 'react-redux';
import { setFileList, setFilesData } from './store/fileSlice';

function App() {
    const filesList = useSelector(state => state.files.list);
    const files = useSelector(state => state.files.files);
    const [selectedFile, setSelectedFile] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        filesApi.getListOfFiles().then(data => {
            dispatch(setFileList(data.files));
        });
    }, [dispatch]);

    useEffect(() => {
        filesApi.getFilesData(selectedFile).then(data => {
            dispatch(setFilesData(data));
        });
    }, [dispatch, selectedFile]);

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