import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UnloadInfoComponent from './UnloadInfoComponent';
import CommissionForm from './CommissionForm';
import InfoFormComponent from './InfoFormComponent'

const GENERATION_URL = 'http://localhost:8080/generate';
const DIRECTIONS_URL = 'http://localhost:8080/direction'
const FACULTIES_URL = 'http://localhost:8080/faculty'

const GenerationFormComponent = () => {

    const chairpersonMemberName = 'Рындин Алексей Александрочвич'
    const chairpersonMemberPost = 'доктор технических наук, профессор, профессор кафедры систем автоматизированного проектирования и информационных систем ФГБОУ ВО «Воронежский государственный технический университет»'

    const secretaryMemderName = 'Копытина Екатерина Александровна'
    const secretaryMemberPost = 'кандидат технических наук, старший преподаватель кафедры информационных технологий управления факультета компьютерных наук ФГБОУ ВО «ВГУ»'

    const [file, setFile] = useState(null);
    const [direction, setDirection] = useState('');
    const [directions, setDirections] = useState([]);
    const [faculty, setFaculty] = useState('');
    const [faculties, setFaculties] = useState([]);
    const [qualification, setQualification] = useState('');
    const [formEducation, setFormEducation] = useState('');
    const [chairperson, setChairperson] = useState({ memberName: chairpersonMemberName, memberPost: chairpersonMemberPost });
    const [secretary, setSecretary] = useState({ memberName: secretaryMemderName, memberPost: secretaryMemberPost });
    const [commissionMembers, setCommissionMembers] = useState([{ memberName: '', memberPost: '' }]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDirections = async () => {
            try {
                const response = await axios.get(DIRECTIONS_URL);
                setDirections(response.data); // Сохраняем полученные направления в состояние
            } catch (error) {
                console.error('Ошибка при загрузке направлений:', error);
                setError('Не удалось загрузить направления обучения.');
            }
        };
        const fetchFaculties = async () => {
            try {
                const response = await axios.get(FACULTIES_URL);
                setFaculties(response.data); // Сохраняем полученные направления в состояние
            } catch (error) {
                console.error('Ошибка при загрузке направлений:', error);
                setError('Не удалось загрузить факультеты.');
            }
        };

        fetchDirections();
        fetchFaculties();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify({
            direction,
            faculty,
            qualification,
            formEducation,
            chairperson,
            secretary,
            commissionMembers,
        }));
        // formData.append('direction', direction);
        // formData.append('faculty', faculty);
        // formData.append('qualification', qualification);
        // formData.append('formEducation', formEducation)
        // formData.append('chairperson', chairperson);
        // formData.append('secretary', JSON.stringify(secretary));
        // formData.append('commissionMembers', JSON.stringify(commissionMembers)); // Члены комиссии как массив

        // // Добавляем данные о членах комиссии в FormData
        // commissionMembers.forEach((member, index) => {
        //     formData.append(`commissionMembers[${index}].fio`, member.fio);
        //     formData.append(`commissionMembers[${index}].post`, member.post);
        // });

        try {
            const response = await axios.post(GENERATION_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data; charset=UTF-8',
                },
                responseType: 'blob',
            });
            // Извлекаем имя файла из заголовка Content-Disposition
            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'Документы ГИА.zip'; // Значение по умолчанию

            if (contentDisposition && contentDisposition.includes('filename=')) {
                const fileNameMatch = contentDisposition.match(/filename\*?=([^;]+)/);
                if (fileNameMatch && fileNameMatch[1]) {
                    // Декодируем имя файла из UTF-8
                    fileName = decodeURIComponent(fileNameMatch[1].replace(/['"]/g, ''));
                }
            }

            // Создаем ссылку для скачивания файла
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // Используем имя файла из заголовка
            document.body.appendChild(link);
            link.click();

            // Очистка
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setError(null); // Сбрасываем ошибку, если запрос успешен
        } catch (error) {
            console.error('Error generating document', error);
            setError('Ошибка при генерации документа. Пожалуйста, попробуйте ещё раз.');
        }
    };

    return (<div>
        <div className="form-input-box">
            <form className="form-input" onSubmit={handleSubmit}>

                {/* Компонент для загрузки файла */}
                <UnloadInfoComponent
                    onFileChange={(e) => setFile(e.target.files[0])}
                />
            </form>
        </div>
        <br />
        <div className="form-input-box">
            <form className="form-input" onSubmit={handleSubmit}>

                {/* Компонент ввода информации */}
                <InfoFormComponent
                    onDirectionChange={(value) => setDirection(value)}
                    directions={directions}
                    onFacultyChange={(value) => setFaculty(value)}
                    faculties={faculties}
                    onQualificationChange={(value) => setQualification(value)}
                    onFormEducationChange={(value) => setFormEducation(value)}
                />
            </form>
        </div>
        <br />
        <div className="form-input-box">
            <form className="form-input" onSubmit={handleSubmit}>
                {/* Компонент для ввода информации о комиссии */}
                <CommissionForm
                    chairperson={chairperson}
                    secretary={secretary}
                    onChairpersonChange={setChairperson}
                    onSecretaryChange={setSecretary}
                    onCommissionMembersChange={setCommissionMembers}
                />
            </form>
        </div >
        <div class="btn-group">
            <button class="btn" type="submit" onClick={handleSubmit}>
                Сгенерировать пакет документов
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    </div>
    );
};

export default GenerationFormComponent;