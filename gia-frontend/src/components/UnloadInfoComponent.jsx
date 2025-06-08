import React, { useState } from 'react';

const UnloadInfoComponent = ({ onFileChange, onDeclineNamesChange, title }) => {
    const [declineNames, setDeclineNames] = useState(false);
    const [fileError, setFileError] = useState('');

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setDeclineNames(isChecked);
        onDeclineNamesChange(isChecked);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (!file) {
            setFileError('Прикрепите файл в формате .xlsx');
            return;
        }

        // Проверяем расширение файла
        const allowedExtensions = ['.xlsx'];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        
        if (!allowedExtensions.includes(fileExtension)) {
            setFileError('Допустим только формат .xlsx');
            return;
        }

        setFileError('');
        onFileChange(e); // Передаём событие дальше, если всё в порядке
    };

    return (
        <div>
            <label className="form-input-text-bold">{title}</label>
            <br />
            <br />
            <label className="form-input-text">Загрузите таблицу:</label>
            <input type="file" onChange={handleFileChange} required/>
            {fileError && <div className="form-input-text" style={{ color: 'red' }}>{fileError}</div>}
            <br /> 
            <label className="checkbox-container">
                <input 
                    type="checkbox" 
                    checked={declineNames} 
                    onChange={handleCheckboxChange} 
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Учитывать склонение ФИО</span>
            </label>
        </div>
    );
};

export default UnloadInfoComponent;