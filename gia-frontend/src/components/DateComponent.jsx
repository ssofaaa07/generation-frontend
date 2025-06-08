import React, { useState } from 'react';

const DateComponent = ({ schedules, onSchedulesChange }) => {
    const [orderInfo, setOrderInfo] = useState({
        orderNumber: '',
        orderDate: ''
    });

    const handleOrderInfoChange = (field, value) => {
        const newOrderInfo = { ...orderInfo, [field]: value };
        setOrderInfo(newOrderInfo);
        
        // Обновляем данные всех расписаний
        const updatedSchedules = schedules.map(schedule => ({
            ...schedule,
            orderNumber: newOrderInfo.orderNumber,
            orderDate: newOrderInfo.orderDate
        }));
        
        onSchedulesChange(updatedSchedules);
    };

    const handleScheduleChange = (index, field, value) => {
        const newSchedules = [...schedules];
        newSchedules[index] = { 
            ...newSchedules[index], 
            [field]: value,
            // Сохраняем актуальные данные приказа
            orderNumber: orderInfo.orderNumber,
            orderDate: orderInfo.orderDate
        };
        onSchedulesChange(newSchedules);
    };

    const handleAddSchedule = () => {
        const newSchedule = { 
            date: '',
            start: '',
            end: '',
            orderNumber: orderInfo.orderNumber,
            orderDate: orderInfo.orderDate
        };
        const newSchedules = [...schedules, newSchedule];
        onSchedulesChange(newSchedules);
    };

    const handleRemoveSchedule = (index) => {
        if (schedules.length <= 1) return;
        const newSchedules = schedules.filter((_, i) => i !== index);
        onSchedulesChange(newSchedules);
    };

    return (
        <div>
            <div className="form-input-schedule">
                <label className="form-input-text-bold">4. Расписание защит ВКР:</label>
                <br />
                <br />
                <div>
                    <span className="form-input-text">Расписание утверждено приказом № </span>
                    <input
                        type="text"
                        style={{ width: '50px' }}
                        value={orderInfo.orderNumber || ''}
                        onChange={(e) => handleOrderInfoChange('orderNumber', e.target.value)}
                    />
                    <span className="form-input-text"> от </span>
                    <input
                        type="date"
                        style={{ width: '100px' }}
                        value={orderInfo.orderDate || ''}
                        onChange={(e) => handleOrderInfoChange('orderDate', e.target.value)}
                    />
                </div>
                {schedules.map((schedule, index) => (
                    <div className="form-input-box" key={index}>
                        <div>
                        <span className="form-input-text">Дата проведения {index + 1} защиты </span>
                        <input
                            type="date"
                            style={{ width: '90px' }}
                            value={schedule.date || ''}
                            onChange={(e) => handleScheduleChange(index, 'date', e.target.value)}
                            required
                        />
                        <span className="form-input-text"> с </span>
                        <input
                            type="time"
                            style={{ width: '55px' }}
                            value={schedule.start || ''}
                            onChange={(e) => handleScheduleChange(index, 'start', e.target.value)}
                            required
                        />
                        <span className="form-input-text"> по </span>
                        <input
                            type="time"
                            style={{ width: '55px' }}
                            value={schedule.end || ''}
                            onChange={(e) => handleScheduleChange(index, 'end', e.target.value)}
                            required
                        />
                        <button className="btn-small" onClick={(e) => { e.preventDefault(); handleRemoveSchedule(index); }}>
                            -
                        </button>
                        </div>
                    </div>
                ))}
                <button className="btn-small" onClick={(e) => {
                    e.preventDefault();
                    handleAddSchedule();
                }}>
                    +
                </button>
            </div>
        </div>
    );
};

export default DateComponent;