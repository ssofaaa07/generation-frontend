import React, { useState } from 'react';

const CommissionForm = ({ chairperson, secretary, onChairpersonChange, onSecretaryChange, onCommissionMembersChange }) => {
    const [commissionMembers, setCommissionMembers] = useState([{ memberName: '', memberPost: '' }]);

    const handleCommissionMemberChange = (index, field, value) => {
        const newMembers = [...commissionMembers];
        newMembers[index][field] = value;
        setCommissionMembers(newMembers);
        onCommissionMembersChange(newMembers); // Передаём обновлённые данные в родительский компонент
    };

    const handleAddCommissionMember = () => {
        const newMembers = [...commissionMembers, { memberName: '', memberPost: '' }];
        setCommissionMembers(newMembers);
        onCommissionMembersChange(newMembers); // Передаём обновлённые данные в родительский компонент
    };

    const handleRemoveCommissionMember = (index) => {
        const newMembers = commissionMembers.filter((_, i) => i !== index); // Удаляем элемент по индексу
        setCommissionMembers(newMembers);
        onCommissionMembersChange(newMembers); // Передаём обновлённые данные в родительский компонент
    };

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
            <label className="form-input-text-bold">4. Введите информацию о ФИО и должности членов ГЭК:</label>
            <br />
            <br/>
            <label className="form-input-text">Председатель ГЭК:</label>
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
            <div className="form-input-commission">
                <label className="form-input-text">Члены комиссии:</label>
                <button className="btn-small" onClick={handleAddCommissionMember}>
                        +
                </button>
                </div>
                {commissionMembers.map((member, index) => (
                    <div classNane="form-input-box" key={index} >
                        <label className="form-input-text" >{index + 1}</label>
                        <input
                            type="text"
                            placeholder="Фамилия Имя Отчество"
                            value={member.memberName}
                            onChange={(e) => handleCommissionMemberChange(index, 'memberName', e.target.value)}
                            required
                        />
                        <button className="btn-small" onClick={(e) => { e.preventDefault(); handleRemoveCommissionMember(index); }}>
                        -
                        </button>
                        <br/>
                        <textarea
                            type="text"
                            placeholder="Должность"
                            value={member.memberPost}
                            onChange={(e) => handleCommissionMemberChange(index, 'memberPost', e.target.value)}
                            required
                        />
                    </div>
                ))}
            {/* </div> */}
        </div>
    );
};

export default CommissionForm;