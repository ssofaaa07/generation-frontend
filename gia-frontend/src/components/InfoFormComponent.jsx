import React, { useState } from 'react';

const InfoFormComponent = ({ onDirectionChange, directions, onFacultyChange, faculties, onQualificationChange, onFormEducationChange, onDepartmentChange}) => {
    const [faculty, setFaculty] = useState('');
    const [direction, setDirection] = useState(''); // Состояние для хранения введённого значения
    const [qualification, setQualification] = useState(''); 
    const [formEducation, setFormEducation] = useState('');
    const [department, setDepartment] = useState('');

    const handleFacultyChange = (e) => {
        const value = e.target.value;
        setFaculty(value); // Обновляем состояние
        onFacultyChange(value); // Передаём значение в родительский компонент
    };
    
    const handleDirectionChange = (e) => {
        const value = e.target.value;
        setDirection(value); // Обновляем состояние
        onDirectionChange(value); // Передаём значение в родительский компонент
    };

    const handleQualificationChange = (e) => {
        const value = e.target.value;
        setQualification(value); // Обновляем состояние
        onQualificationChange(value); // Передаём значение в родительский компонент
    };

    const handleFormEducationChange = (e) => {
        const value = e.target.value;
        setFormEducation(value); // Обновляем состояние
        onFormEducationChange(value); // Передаём значение в родительский компонент
    };

    const handleDepartmentChange = (e) => {
        const value = e.target.value;
        setDepartment(value); // Обновляем состояние
        onDepartmentChange(value); // Передаём значение в родительский компонент
    };

    return (
        <div>
            <label className="form-input-text-bold">3. Введите информацию:</label>
            <br/>
            <br/>
            <label className="form-input-text">Факультет:</label>
            <input
                type="text"
                list="faculties-list" // Связываем с выпадающим списком
                placeholder="Факультет"
                value={faculty}
                onChange={handleFacultyChange}
                required
            />
            <datalist id="faculties-list">
                {faculties.map((faculty, index) => (
                    <option key={index} value={faculty}>
                        {faculty}
                    </option>
                ))}
            </datalist>
            <br/>
            <label className="form-input-text">Направление обучения:</label>
            <input
                type="text"
                list="directions-list" // Связываем с выпадающим списком
                placeholder="Направление обучения"
                value={direction}
                onChange={handleDirectionChange}
                required
            />
            <datalist id="directions-list">
                {directions.map((direction, index) => (
                    <option key={index} value={direction}>
                        {direction}
                    </option>
                ))}
            </datalist>
            <br/>
            <label className="form-input-text">Кафедра:</label>
            <input
                type="text"
                list="department-list" // Связываем с выпадающим списком
                placeholder="Кафедра"
                value={department}
                onChange={handleDepartmentChange}
                required
            />
            <datalist id="department-list">
                <option value="">Выберите кафедру</option>
                <option value="Информационных технологий управления">Информационных технологий управления</option>
                <option value="Информационных систем">Информационных систем</option>
                <option value="Программирования и информационных технологий">Программирования и информационных технологий</option>
                <option value="Цифровых технологий">Цифровых технологий</option>
                <option value="Технологий обработки и защиты информации">Технологий обработки и защиты информации</option>
            </datalist>
            <br/>
            <label className="form-input-text">Квалификация:</label>
            <input
                type="text"
                list="qualification-list" // Связываем с выпадающим списком
                placeholder="Квалификация"
                value={qualification}
                onChange={handleQualificationChange}
                required
            />
            <datalist id="qualification-list">
                <option value="">Выберите квалификацию</option>
                <option value="Бакалавр">Бакалавр</option>
                <option value="Магистр">Магистр</option>
                <option value="Аспирант">Аспирант</option>
            </datalist>
            <br/>
            <label className="form-input-text">Форма обучения:</label>
            <input
                type="text"
                list="form-education-list" // Связываем с выпадающим списком
                placeholder="Форма обучения"
                value={formEducation}
                onChange={handleFormEducationChange}
                required
            />
            <datalist id="form-education-list">
                <option value="">Выберите форму обучения</option>
                <option value="Очная">Очная</option>
                <option value="Заочная">Заочная</option>
                <option value="Очно-заочная">Очно-заочная</option>
            </datalist>
            <br/>
        </div>
    );
};

export default InfoFormComponent;