import './App.css'
import DownloadTemplateComponent from './components/DownloadTemplateComponent'
import DownloadTemplateMarkComponent from './components/DownloadTemplateMarkComponent'
import GenerationFormComponent from './components/GenerationFormComponent'
import GenerationResultFormComponent from './components/GenerationResultFormComponent'
import React, { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div className="app">
        <div className="title-box">
          <p className="title-text">Генерация документов, сопутствующих процессу государственной итоговой аттестации ФГБОУ ВО "ВГУ"</p>
        </div>
      <div className="tab-switcher">
        <button 
          className={`tab-button ${activeTab === 'tab1' ? 'active' : ''}`}
          onClick={() => setActiveTab('tab1')}
        >
          Подготовка к проведению ГИА
        </button>
        <button 
          className={`tab-button ${activeTab === 'tab2' ? 'active' : ''}`}
          onClick={() => setActiveTab('tab2')}
        >
          Подведение результатов
        </button>
      </div>
      <div className="content">
        {activeTab === 'tab1' ? (
          <div className="tab-content">
            <div className="supply">
              <DownloadTemplateComponent />
              <GenerationFormComponent />
            </div>
          </div>
        ) : (
          <div className="tab-content">
            <div className="supply">
              <DownloadTemplateMarkComponent />
              <GenerationResultFormComponent />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
// function App() {

//   return (
//     <>
//     <div className="supply">
//         <div className="title-box">
//             <p className="title-text">Генерация документов, сопутствующих процессу государственной итоговой аттестации ФГБОУ ВО "ВГУ"</p>
//         </div>
//         <br/>
//     <DownloadTemplateComponent />
//     <br/>
//     <GenerationFormComponent />
//     </div>
//     </>
//   )
// }

// export default App
