import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import Landing from './pages/Landing';
import MainLayout from './layouts/MainLayout'
import Question from './pages/Question'
import ViewTopic from './pages/ViewTopic'
import HomePage from './pages/HomePage'
import Result from './pages/Result'
import About from './pages/About';
import CreateTopic from './pages/CreateTopic';
import NotFoundPage from './pages/NotFoundPage';


const App = () => {

  //define routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/' element={<Landing />} />
        <Route element={<MainLayout />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path="/topic/:id" element={<ViewTopic />} />
          <Route path="/topic/:id/result" element={<Result />} />
          <Route path="/createTopic" element={<CreateTopic premade={false}/>}/>
          <Route path="/topic/:id/update" element={<CreateTopic premade={true}/>}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Route>
        <Route path='/topic/:id/question/:q' element={<Question />} />
      </>
    )
  )


  return <>
    <RouterProvider router={router} />
    <ToastContainer position="top-center" autoClose={2000} hideProgressBar pauseOnHover={false}/>
  </>
}

export default App
