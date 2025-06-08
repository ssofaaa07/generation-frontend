import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UnloadInfoComponent from './UnloadInfoComponent';
import CommissionForm from './CommissionForm';
import CommissionMembersForm from './CommissionMembersForm';
import CommissionAppellateForm from './CommissionAppellateForm';
import CommissionAppellateMembersForm from './CommissionAppellateMembersForm';
import InfoFormComponent from './InfoFormComponent';
import DateComponent from './DateComponent';

const GENERATION_URL = 'https://generation-gia-doc.onrender.com/documents/generate';
const DIRECTIONS_URL = 'https://generation-gia-doc.onrender.com/direction';
const FACULTIES_URL = 'https://generation-gia-doc.onrender.com/faculty';

const GenerationFormComponent = () => {
    // Значения по умолчанию
    const DEFAULT_VALUES = {
        chairpersonMemberName: 'Рындин Алексей Александрович',
        chairpersonMemberPost: 'доктор технических наук, профессор, профессор кафедры систем автоматизированного проектирования и информационных систем ФГБОУ ВО «Воронежский государственный технический университет»',
        chairpersonOrderNumber: '',
        chairpersonOrderDate: '2023-09-20',

        chairpersonAppellateMemberName: 'Чупандина Елена Евгеньевна',
        chairpersonAppellateMemberPost: 'доктор фармацевтических наук, профессор, декан фармацевтического факультета, первый проректор-проректор по учебной работе ФГБОУ ВО «ВГУ»',
        chairpersonAppellateOrderNumber: '0299',
        chairpersonAppellateOrderDate: '2024-04-12',
        
        secretaryMemberName: 'Копытина Екатерина Александровна',
        secretaryMemberPost: 'кандидат технических наук, старший преподаватель кафедры информационных технологий управления факультета компьютерных наук ФГБОУ ВО «ВГУ»',
        secretaryOrderNumber: '0300',
        secretaryOrderDate: '2024-04-12',
        
        direction: '09.03.03 Прикладная информатика',
        faculty: 'Факультет компьютерных наук',
        qualification: 'бакалавр',
        formEducation: 'очная',
        department: 'Информационных технологий управления',
        schedules: [
            {
                date: '2024-06-13',
                start: '09:00',
                end: '12:00',
                orderNumber: '0301',
                orderDate: '2024-04-12'
            },
            {
                date: '2024-06-14',
                start: '09:00',
                end: '12:00',
                orderNumber: '0301',
                orderDate: '2024-04-12'
            }
        ],
        commissionMembers: [
            {
                memberName: 'Воронцов Ярослав Александрович',
                memberPost: 'кандидат физико-математических наук, доцент, доцент кафедры информационных технологий управления факультета компьютерных наук ФГБОУ ВО «ВГУ»',
                orderNumber: '0288',
                orderDate: '2024-04-11'
            },
            {
                memberName: 'Ошивалов Андрей Владиславович',
                memberPost: 'кандидат технических наук, доцент, специалист технической поддержки ООО "ЗемСофт"',
                orderNumber: '0288',
                orderDate: '2024-04-11'
            },
            {
                memberName: 'Матвеев Михаил Григорьевич',
                memberPost: 'доктор технических наук, профессор, профессор, заведующий кафедры информационных технологий управления факультета компьютерных наук ФГБОУ «ВГУ»',
                orderNumber: '0288',
                orderDate: '2024-04-11'
            },
            {
                memberName: 'Пивоваров Валерий Васильевич',
                memberPost: 'генеральный директор ООО «Инлайн Консалтинг»',
                orderNumber: '0288',
                orderDate: '2024-04-11'
            },
            {
                memberName: 'Тихомиров Сергей Германович',
                memberPost: 'доктор технических наук, директор ООО «Совтех»',
                orderNumber: '0288',
                orderDate: '2024-04-11'
            }
        ],
        commissionAppellateMembers: [
            {
                memberName: 'Самодуров Александр Сергеевич',
                memberPost: 'кандидат технических наук, доцент, доцент кафедры информационных систем факультета компьютерных наук ФГБОУ ВО «ВГУ»',
                orderNumber: '0299',
                orderDate: '2024-04-12'
            },
            {
                memberName: 'Атанов Артем Викторович',
                memberPost: 'кандидат физико-математических наук, доцент, доцент кафедры цифровых технологий факультета компьютерных наук ФГБОУ ВО «ВГУ»',
                orderNumber: '0299',
                orderDate: '2024-04-12'
            },
            {
                memberName: 'Савинков Андрей Юрьевич',
                memberPost: 'доктор технических наук, профессор, профессор кафедры информационных систем факультета компьютерных наук ФГБОУ ВО «ВГУ»',
                orderNumber: '0299',
                orderDate: '2024-04-12'
            }
        ],
    };

    // Инициализация пустых состояний
    const [file, setFile] = useState(null);
    const [direction, setDirection] = useState('');
    const [directions, setDirections] = useState([]);
    const [faculty, setFaculty] = useState('');
    const [faculties, setFaculties] = useState([]);
    const [qualification, setQualification] = useState('');
    const [formEducation, setFormEducation] = useState('');
    const [department, setDepartment] = useState('');
    const [schedules, setSchedules] = useState([{ date: '', start: '', end: '', orderNumber: '', orderDate: ''}])
    const [chairperson, setChairperson] = useState({ memberName: '', memberPost: '', orderNumber: '', orderDate: '' });
    const [chairpersonAppellate, setChairpersonAppellate] = useState({ memberName: '', memberPost: '', orderNumber: '', orderDate: '' });
    const [secretary, setSecretary] = useState({ memberName: '', memberPost: '', orderNumber: '', orderDate: ''});
    const [commissionMembers, setCommissionMembers] = useState([{ memberName: '', memberPost: '', orderNumber: '', orderDate: ''}]);
    const [commissionAppellateMembers, setCommissionAppellateMembers] = useState([{ memberName: '', memberPost: '', orderNumber: '', orderDate: ''}]);
    const [error, setError] = useState(null);
    const [declineNames, setDeclineNames] = useState(false);


    useEffect(() => {
        const fetchDirections = async () => {
            try {
                const response = await axios.get(DIRECTIONS_URL);
                setDirections(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке направлений:', error);
                setError('Не удалось загрузить направления обучения.');
            }
        };

        const fetchFaculties = async () => {
            try {
                const response = await axios.get(FACULTIES_URL);
                setFaculties(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке факультетов:', error);
                setError('Не удалось загрузить факультеты.');
            }
        };

        fetchDirections();
        fetchFaculties();
    }, []);

    const handleSetDefaults = () => {
        setDirection(DEFAULT_VALUES.direction);
        setFaculty(DEFAULT_VALUES.faculty);
        setQualification(DEFAULT_VALUES.qualification);
        setFormEducation(DEFAULT_VALUES.formEducation);
        setDepartment(DEFAULT_VALUES.department);
        setSchedules(DEFAULT_VALUES.schedules);
        setChairperson({
            memberName: DEFAULT_VALUES.chairpersonMemberName,
            memberPost: DEFAULT_VALUES.chairpersonMemberPost,
            orderNumber: DEFAULT_VALUES.chairpersonOrderNumber,
            orderDate: DEFAULT_VALUES.chairpersonOrderDate
        });
        setChairpersonAppellate({
            memberName: DEFAULT_VALUES.chairpersonAppellateMemberName,
            memberPost: DEFAULT_VALUES.chairpersonAppellateMemberPost,
            orderNumber: DEFAULT_VALUES.chairpersonAppellateOrderNumber,
            orderDate: DEFAULT_VALUES.chairpersonAppellateOrderDate
        });
        setSecretary({
            memberName: DEFAULT_VALUES.secretaryMemberName,
            memberPost: DEFAULT_VALUES.secretaryMemberPost,
            orderNumber: DEFAULT_VALUES.secretaryOrderNumber,
            orderDate: DEFAULT_VALUES.secretaryOrderDate
        });
        setCommissionMembers(DEFAULT_VALUES.commissionMembers);
        setCommissionAppellateMembers(DEFAULT_VALUES.commissionAppellateMembers)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify({
            direction,
            faculty,
            qualification,
            formEducation,
            department,
            schedules,
            chairperson,
            secretary,
            commissionMembers,
            chairpersonAppellate,
            commissionAppellateMembers,
            declineNames
        }));

        try {
            const response = await axios.post(GENERATION_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data; charset=UTF-8',
                },
                responseType: 'blob',
            });

            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'Документы ГИА.zip';

            if (contentDisposition && contentDisposition.includes('filename=')) {
                const fileNameMatch = contentDisposition.match(/filename\*?=([^;]+)/);
                if (fileNameMatch && fileNameMatch[1]) {
                    fileName = decodeURIComponent(fileNameMatch[1].replace(/['"]/g, ''));
                }
            }

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setError(null);
        } catch (error) {
            console.error('Error generating document', error);
            setError('Ошибка при генерации документа. Пожалуйста, попробуйте ещё раз.');
        }
    };

    return (
        <div>
            <div className="form-input-box">
            <form className="form-input" onSubmit={handleSubmit}>
                    <UnloadInfoComponent
                        title={'2. Прикрепите файл с информацией по студентам:'}
                        onFileChange={(e) => setFile(e.target.files[0])}
                        onDeclineNamesChange={(value) => setDeclineNames(value)}
                    />
                </form>
            </div>
            <br />
            <div className="form-input-box">
                <form className="form-input" onSubmit={handleSubmit}>
                    <InfoFormComponent
                        onDirectionChange={(value) => setDirection(value)}
                        directions={directions}
                        directionValue={direction}
                        onFacultyChange={(value) => setFaculty(value)}
                        faculties={faculties}
                        facultyValue={faculty}
                        onQualificationChange={(value) => setQualification(value)}
                        qualificationValue={qualification}
                        onFormEducationChange={(value) => setFormEducation(value)}
                        formEducationValue={formEducation}
                        onDepartmentChange={(value) => setDepartment(value)}
                    />
                </form>
            </div>
            <br />
            <div className="form-input-box">
                <form className="form-input" onSubmit={handleSubmit}>
                    <DateComponent
                        schedules={schedules}
                        onSchedulesChange={setSchedules}
                    />
                </form>
            </div>
            <br />
            <div className="form-input-box">
                <form className="form-input" onSubmit={handleSubmit}>
                    <CommissionForm
                        chairperson={chairperson}
                        secretary={secretary}
                        onChairpersonChange={setChairperson}
                        onSecretaryChange={setSecretary}
                    />
                    <CommissionMembersForm
                        commissionMembers={commissionMembers}
                        onCommissionMembersChange={setCommissionMembers}
                    />
                </form>
            </div>
            <br />
            <div className="form-input-box">
                <form className="form-input" onSubmit={handleSubmit}>
                    <CommissionAppellateForm
                        chairperson={chairpersonAppellate}
                        onChairpersonChange={setChairpersonAppellate}
                    />
                    <CommissionAppellateMembersForm
                        commissionMembers={commissionAppellateMembers}
                        onCommissionMembersChange={setCommissionAppellateMembers}
                    />
                </form>
            </div>
            <div className="btn-group">
                <button
                    className="btn"
                    type="button"
                    onClick={handleSetDefaults}
                    style={{ marginRight: '10px' }}
                >
                    Заполнить значения по умолчанию
                </button>
                <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
                    Сгенерировать пакет документов
                </button>
                </div>
                <div className="btn-group">
                {error && <p style={{ color: 'red'}}>{error}</p>}
            </div>
        </div>
    );
};

export default GenerationFormComponent;