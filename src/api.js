import axios from 'axios';

const api = axios.create({
  baseURL: 'http://45.77.41.246/v1',
});

export const getDocuments = async () => {
  try {
    const response = await api.get('/documents');
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
};

export const uploadDocument = async (file) => {
  try {
    const formData = new FormData();
    formData.append('document', file);
    const response = await api.post('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    return null;
  }
};

export const searchDocuments = async (question) => {
  try {
    const response = await api.get('/documents/search', { params: { question } });
    return response.data;
  } catch (error) {
    console.error('Error searching documents:', error);
    return { documents: [], summary: '' };
  }
};

export const downloadDocument = async (fileName) => {
  try {
    const response = await api.get(`/documents/download/${fileName}`, { responseType: 'blob' });
    return response.data;
  }
  catch (error) {
    console.error('Error downloading document:', error);
    return null;
  }
}

export const deleteAllDocuments = async () => {
  try {
    const response = await api.delete('/documents/purge/docs');
    return response.data;
  } catch (error) {
    console.error('Error deleting all documents:', error);
    return null;
  }
};
