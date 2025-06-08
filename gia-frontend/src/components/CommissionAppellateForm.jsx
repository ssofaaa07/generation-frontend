import React, { useState } from 'react';

const CommissionAppelateForm = ({ chairperson, onChairpersonChange }) => {

    const handleChairpersonChange = (e) => {
        const { field, value } = e;
        const updatedChairperson = { ...chairperson, [field]: value };
        onChairpersonChange(updatedChairperson); // Передаём обновлённые данные в родительский компонент
    };

    return (
        <div>
            <label className="form-input-text-bold">6. Введите информацию о ФИО и должности членов апелляционной комиссии:</label>
            <br />
            <br/>
            <span className="form-input-text">Председатель:</span>
            <input
                type="text"
                placeholder="Фамилия Имя Отчество"
                value={chairperson.memberName}
                onChange={(e) => handleChairpersonChange({ ...e.target, field: 'memberName' })}
                required
            />
            <br/>
            <textarea
                type="text"
                placeholder="Должность"
                value={chairperson.memberPost}
                onChange={(e) => handleChairpersonChange({ ...e.target, field: 'memberPost' })}
                required
            />
            <br />
            <div>
                <span className="form-input-text">Утвержден приказом № </span>
                <input
                    type="text"
                    style={{ width: '50px' }}
                    value={chairperson.orderNumber || ''}
                    onChange={(e) => handleChairpersonChange({ ...e.target, field: 'orderNumber' })}
                />
                <span className="form-input-text"> от </span>
                <input
                    type="date"
                    style={{ width: '100px' }}
                    value={chairperson.orderDate || ''}
                    onChange={(e) => handleChairpersonChange({ ...e.target, field: 'orderDate' })}
                />
            </div>
        </div>
    );
};

export default CommissionAppelateForm;