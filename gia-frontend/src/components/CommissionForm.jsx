import React, { useState } from 'react';

const CommissionForm = ({ chairperson, secretary, onChairpersonChange, onSecretaryChange }) => {

    const handleChairpersonChange = (e) => {
        const { field, value } = e;
        const updatedChairperson = { ...chairperson, [field]: value };
        onChairpersonChange(updatedChairperson); // Передаём обновлённые данные в родительский компонент
    };

    const handleSecretaryChange = (e) => {
        const { field, value } = e;
        const updatedSecretary = { ...secretary, [field]: value };
        onSecretaryChange(updatedSecretary); // Передаём обновлённые данные в родительский компонент
    };

    return (
        <div>
            <label className="form-input-text-bold">5. Введите информацию о ФИО и должности членов государственной экзаменационной комиссии:</label>
            <br />
            <br />
            <span className="form-input-text">Председатель ГЭК:</span>
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
            <br />
            <label className="form-input-text">Секретарь ГЭК:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
                type="text"
                placeholder="Фамилия Имя Отчество"
                value={secretary.memberName}
                onChange={(e) => handleSecretaryChange({ ...e.target, field: 'memberName' })}
                required
            />
            <br/>
            <textarea
                type="text"
                placeholder="Должность"
                value={secretary.memberPost}
                onChange={(e) => handleSecretaryChange({ ...e.target, field: 'memberPost' })}
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

export default CommissionForm;