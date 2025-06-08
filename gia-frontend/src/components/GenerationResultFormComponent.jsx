import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UnloadInfoComponent from './UnloadInfoComponent';
import DateResultComponent from './DateResultComponent';

const GENERATION_URL = 'https://generation-gia-doc.onrender.com/results/documents/generate';

const GenerationResultFormComponent = () => {
    // Значения по умолчанию
    const DEFAULT_VALUES = {
        schedule:
            {
                date: '2024-06-14',
                start: '12:00',
                end: '14:00',
                orderNumber: '0301',
                orderDate: '2024-04-12'
            }
    };

    // Инициализация пустых состояний
    const [file, setFile] = useState(null);
    const [schedule, setSchedule] = useState({ date: '', start: '', end: '', orderNumber: '', orderDate: ''})
    const [error, setError] = useState(null);

    const handleSetDefaults = () => {
        setSchedule(DEFAULT_VALUES.schedule);
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify({
            schedule,
        }));

        try {
            const response = await axios.post(GENERATION_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data; charset=UTF-8',
                },
                responseType: 'blob',
            });

            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'Результаты ГИА.zip';

            if (contentDisposition && contentDisposition.includes('filename=')) {
                const fileNameMatch = contentDisposition.match(/filename\*?=([^;]+)/);
                if (fileNameMatch && fileNameMatch[1]) {
                    fileName = decodeURIComponent(fileNameMatch[1].replace(/['"]/g, ''));
                }
            }

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setError(null);
        } catch (error) {
            console.error('Error generating document', error);
            setError('Ошибка при генерации документа. Пожалуйста, попробуйте ещё раз.');
        }
    };

    return (
        <div>
            <div className="form-input-box">
            <form className="form-input" onSubmit={handleSubmit}>
                    <UnloadInfoComponent
                        title={'2. Прикрепите файл с результатами ГИА:'}
                        onFileChange={(e) => setFile(e.target.files[0])}
                        onDeclineNamesChange={(value) => setDeclineNames(value)}
                    />
                </form>
            </div>
            <br />
            <div className="form-input-box">
                <form className="form-input" onSubmit={handleSubmit}>
                    <DateResultComponent
                        schedules={schedule}
                        onSchedulesChange={setSchedule}
                    />
                </form>
            </div>
            <div className="btn-group">
                <button
                    className="btn"
                    type="button"
                    onClick={handleSetDefaults}
                    style={{ marginRight: '10px' }}
                >
                    Заполнить значения по умолчанию
                </button>
                <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
                    Сгенерировать пакет документов
                </button>
                </div>
                <div className="btn-group">
                {error && <p style={{ color: 'red'}}>{error}</p>}
            </div>
        </div>
    );
};

export default GenerationResultFormComponent;