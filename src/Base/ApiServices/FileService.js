import axios from 'axios';

const serverUrl = 'http://3.66.111.69:3000/';

const UploadDocument = async (formDataFile, token) => {
    try {
        console.log('FormDataFile:', formDataFile.get('file')); // Dodanie logu, aby sprawdzić plik

        const response = await axios.post(`${serverUrl}uploadFile`, formDataFile, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });

        console.log('Response from upload:', response.data);
        return response.data.filePath;
    } catch (error) {
        console.error('Error while uploading file:', error);
        throw new Error('Błąd podczas przesyłania pliku');
    }
};
    const DownloadDocument = async (filename, token) => {
        try {
            const response = await axios.get(`${serverUrl}download/${filename}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                responseType: 'blob',
            });

            console.log('File download response received');
            return response.data;
        } catch (error) {
            console.error('Error while downloading file:', error);
            throw new Error('Błąd podczas pobierania pliku');
        }
    };
    export { UploadDocument, DownloadDocument };
