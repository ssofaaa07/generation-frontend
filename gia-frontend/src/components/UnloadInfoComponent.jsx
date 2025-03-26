import React, { useState } from 'react';

const UnloadInfoComponent = ({ onFileChange }) => {
    return (
        <div>
            <label className="form-input-text-bold">2. Прикрепите файл с информацией по студентам:</label>
            <br/>
            <br/>
            <input type="file" onChange={onFileChange} required />
        </div>
    );
};

export default UnloadInfoComponent;