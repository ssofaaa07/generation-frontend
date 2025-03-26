import './App.css'
import CommissionFormComponent from './components/CommissionForm'
import DownloadTemplateComponent from './components/DownloadTemplateComponent'
import GenerationFormComponent from './components/GenerationFormComponent'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    <div className="supply">
        <div className="title-box">
            <p className="title-text">Генерация документов, сопутствующих процессу государственной итоговой аттестации ФГБОУ ВО "ВГУ"</p>
        </div>
        <br/>
    <DownloadTemplateComponent />
    <br/>
    <GenerationFormComponent />
    </div>
      {/* <BrowserRouter>
        <Routes>
          {/* <div class="supply"> */}
            {/* <Route path='/' element={<DownloadTemplateComponent />}></Route> */}
          {/* </div> */}
          {/* <div class="supply"> */}
            {/* <Route path='/' element={<GenerationFormComponent />}></Route> */}
          {/* </div> */}
        {/* </Routes>
      </BrowserRouter> */}
    </>
  )
}

export default App
