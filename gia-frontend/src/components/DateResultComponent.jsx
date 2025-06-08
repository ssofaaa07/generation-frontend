import React, { useState } from 'react';

const DateComponent = ({ onScheduleChange }) => {
    const [schedule, setSchedule] = useState({
        date: '', 
        start: '', 
        end: '', 
        orderDate: '', 
        orderNumber: ''
    });

    const handleFieldChange = (field, value) => {
        const updatedSchedule = {
            ...schedule,
            [field]: value
        };
        setSchedule(updatedSchedule);
        onScheduleChange(updatedSchedule);
    };

    return (
        <div>
            <div className="form-input-schedule">
                <label className="form-input-text-bold">Заседание ГЭК о присвоении квалификации выпускникам:</label>
                <br />
                <br />
                <div className="form-input-box">
                    <div>
                        <span className="form-input-text">Дата проведения заседания </span>
                        <input
                            type="date"
                            style={{ width: '90px' }}
                            onChange={(e) => handleFieldChange('date', e.target.value)}
                            required
                        />
                        <span className="form-input-text"> с </span>
                        <input
                            type="time"
                            style={{ width: '55px' }}
                            onChange={(e) => handleFieldChange('start', e.target.value)}
                            required
                        />
                        <span className="form-input-text"> по </span>
                        <input
                            type="time"
                            style={{ width: '55px' }}
                            onChange={(e) => handleFieldChange('end', e.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DateComponent;