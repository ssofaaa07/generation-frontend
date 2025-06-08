import React, { useState } from 'react';

const CommissionAppellateMembersForm = ({ commissionMembers, onCommissionMembersChange }) => {
    const [orderInfo, setOrderInfo] = useState({
        orderNumber: '',
        orderDate: ''
    });

    const handleOrderInfoChange = (field, value) => {
        const newOrderInfo = { ...orderInfo, [field]: value };
        setOrderInfo(newOrderInfo);
        
        // Обновляем данные всех членов комиссии
        const updatedMembers = commissionMembers.map(member => ({
            ...member,
            orderNumber: newOrderInfo.orderNumber,
            orderDate: newOrderInfo.orderDate
        }));
        
        onCommissionMembersChange(updatedMembers);
    };

    const handleMemberChange = (index, field, value) => {
        const newMembers = [...commissionMembers];
        newMembers[index] = { 
            ...newMembers[index], 
            [field]: value,
            // Сохраняем актуальные данные приказа
            orderNumber: orderInfo.orderNumber,
            orderDate: orderInfo.orderDate
        };
        onCommissionMembersChange(newMembers);
    };

    const handleAddMember = () => {
        const newMember = { 
            memberName: '', 
            memberPost: '',
            orderNumber: orderInfo.orderNumber,
            orderDate: orderInfo.orderDate
        };
        const newMembers = [...commissionMembers, newMember];
        onCommissionMembersChange(newMembers);
    };

    const handleRemoveMember = (index) => {
        if (commissionMembers.length <= 1) return;
        const newMembers = commissionMembers.filter((_, i) => i !== index);
        onCommissionMembersChange(newMembers);
    };

    return (
        <div>
            <br />
            <div className="form-input-commission">
                <label className="form-input-text">Члены апелляционной комиссии:</label>
                <div>
                    <span className="form-input-text">Утверждены приказом № </span>
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
                {commissionMembers.map((member, index) => (
                    <div classNane="form-input-box" key={index} >
                        <label className="form-input-text" >{index + 1}</label>
                        <input
                            type="text"
                            placeholder="Фамилия Имя Отчество"
                            value={member.memberName}
                            onChange={(e) => handleMemberChange(index, 'memberName', e.target.value)}
                            required
                        />
                        <button className="btn-small" onClick={(e) => { e.preventDefault(); handleRemoveMember(index); }}>
                        -
                        </button>
                        <br/>
                        <textarea
                            type="text"
                            placeholder="Должность"
                            value={member.memberPost}
                            onChange={(e) => handleMemberChange(index, 'memberPost', e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button className="btn-small" onClick={(e) => {
                        e.preventDefault();
                        handleAddMember();
                    }}>
                        +
                </button>
                </div>
            {/* </div> */}
        </div>
    );
};

export default CommissionAppellateMembersForm;