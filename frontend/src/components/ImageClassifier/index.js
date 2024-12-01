import React, { useState, Fragment } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { Backdrop, Chip, CircularProgress, Grid, Stack } from '@mui/material';
import axios from 'axios';

const ImageClassifier = () => {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [file, setFile] = useState(null);

    const handleImageChange = (files) => {
        if (files.length > 0) {
            setFile(files[0]); // Lưu file để sử dụng khi gửi
            setResults([]); // Reset kết quả
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return; // Nếu không có file, không làm gì cả
    
        setLoading(true); // Bắt đầu trạng thái loading
        const formData = new FormData();
        formData.append('image', file); // Đảm bảo key là 'image'
    
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/compare_image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResults(response.data); // Cập nhật kết quả
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoading(false); // Kết thúc trạng thái loading
        }
    };

    console.log(results)

    return (
        <Fragment>
            <Grid
                container
                className="App"
                direction="column"
                alignItems="center"
                justifyContent="center"
                marginTop="12%"
            >
                <Grid item>
                    <h1 style={{ textAlign: 'center', marginBottom: '1.5em' }}>Image Search API</h1>
                    <form onSubmit={handleSubmit}>
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={'Drag and drop an image here or click to select one'}
                            onChange={handleImageChange}
                            maxFileSize={10000000}
                            filesLimit={1}
                            showAlerts={['error']}
                        />
                        <button type="submit" disabled={!file}>
                            Search
                        </button>
                    </form>
                    <Stack style={{ marginTop: '2em', width: '20rem' }} spacing={1}>
                        {results.map((result, index) => (
                            <Chip
                                key={index}
                                label={`ID: ${result.id}, Distance: ${result.distance}`}
                                style={{ justifyContent: 'left' }}
                                variant="outlined"
                            />
                        ))}
                    </Stack>
                </Grid>
            </Grid>

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Fragment>
    );
};

export default ImageClassifier;