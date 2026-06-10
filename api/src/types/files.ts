type FilesList = {
    files: string[];
}

type FileLine = {
    file: string;
    text: string;
    number: string;
    hex: string;
}


type FileLineResponse = Omit<FileLine, 'file'>;

type FileData = {
    file: string;
    lines: FileLineResponse[];
}

export type { FilesList, FileLine, FileLineResponse, FileData };