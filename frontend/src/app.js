import { Container, Navbar} from 'react-bootstrap';
import Table from './components/Table';
import FileLine from './components/Table/components/TableFileRow';
import Select from './components/FormSelect';
import './app.css';

function App() {
    const files = [
        {
            "file": "test9.csv",
            "lines": [
                {
                    "text": "BAeYrXxjSMagMWySEEhUxsHLCPFvj",
                    "number": "47839894",
                    "hex": "3d9ca557aa605439f6b17e7b02fb01bd"
                },
                {
                    "text": "wDMppuqVmsMKvNEMBZCslijGpb",
                    "number": "082215",
                    "hex": "1dac097edda7a96a4b619628809c6f40"
                },
            ]
        }
    ];

    const filesList = [
       "test9.csv",
       "test10.csv",
       "test11.csv",
       "test12.csv",
       "test13.csv",
       "test14.csv",
       "test15.csv",
    ];

    const headers = ['File Name', 'Text', 'Number', 'Hex'];

    return (
        <>
            <Navbar className="mb-4 navbar-component">
                <Container>
                    <Navbar.Brand href="#">React Test App</Navbar.Brand>
                </Container>
            </Navbar>

            <Container>
                <Select options={filesList} includeAll={true} onChange={() => {}} />
            </Container>

            <Container>
                <Table headers={headers}>
                    {files.map((file) => (
                        file.lines.map((line) => (
                            <FileLine key={file.file} fileName={file.file} text={line.text} number={line.number} hex={line.hex} />
                        ))
                    ))}
                </Table>
            </Container>
        </>
    );
}

export default App;