import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'


function App() {

  const Home = lazy(() => import('./pages/Home'))
  const ShowBooks = lazy(() => import('./pages/ShowBooks'))
  const CreateBooks = lazy(() => import('./pages/CreateBooks'))
  const EditBooks = lazy(() => import('./pages/EditBooks'))
  const DeleteBook = lazy(() => import('./pages/DeleteBook'))



  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/createBooks' element={<CreateBooks/>}/>
      <Route path='/books/:id' element={<ShowBooks/>}/>
      <Route path='/updateBooks/:id' element={<EditBooks/>}/>
      <Route path='/deleteBooks/:id' element={<DeleteBook/>}/>
      </Routes>
      </Suspense>
    </>
  )
}

export default App
