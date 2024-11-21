import React, { useState, useEffect, useRef, Fragment } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { Backdrop, Chip, CircularProgress, Grid, Stack } from '@mui/material';
import axios from 'axios';

const ImageClassifier = () => {
    const [loading, setLoading] = useState(false);
    const [confidence, setConfidence] = useState(null);
    const [predictedClass, setPredictedClass] = useState(null);
    const [file, setFile] = useState(null);
    const labels = [
        'Bàn Ủi',
        'Bình đung siêu tốc',
        'Lò vi sống',
        'Máy hút bụi',
        'Máy lọc không khí',
        'Nồi cơm điện',
        'Quạt',
    ];
    const handleImageChange = (files) => {
        if (files.length > 0) {
            setFile(files[0]); // Lưu file để sử dụng khi gửi
            setPredictedClass(null); // Reset dự đoán
            setConfidence(null); // Reset độ tin cậy
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return; // Nếu không có file, không làm gì cả

        setLoading(true); // Bắt đầu trạng thái loading
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setPredictedClass(response.data.class); // Cập nhật lớp dự đoán
            setConfidence(response.data.confidence); // Cập nhật độ tin cậy
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoading(false); // Kết thúc trạng thái loading
        }
    };

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
                    <h1 style={{ textAlign: 'center', marginBottom: '1.5em' }}>MobileNetV3 Image Classifier</h1>
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
                            Predict
                        </button>
                    </form>
                    <Stack style={{ marginTop: '2em', width: '12rem' }} direction="row" spacing={1}>
                        <Chip
                            label={predictedClass === null ? 'Prediction:' : `Prediction: ${predictedClass}`}
                            style={{ justifyContent: 'left' }}
                            variant="outlined"
                        />
                        <Chip
                            label={confidence === null ? 'Confidence:' : `Confidence: ${confidence}%`}
                            style={{ justifyContent: 'left' }}
                            variant="outlined"
                        />{' '}
                        <Chip
                            label={labels[predictedClass] === null ? 'Labels:' : `Labels: ${labels[predictedClass]}`}
                            style={{ justifyContent: 'left' }}
                            variant="outlined"
                        />
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
