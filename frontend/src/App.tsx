import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import MainLayout from './layouts/MainLayout'
import Question from './pages/Question'
import Topic from './pages/Topic'
import HomePage from './pages/HomePage'
import Result from './pages/Result'
import About from './pages/About';
import CreateTopic from './pages/CreateTopic';

import topicsData from './topics.json'


const App = () => {

  //define routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path="/topic/:id" element={<Topic topics={topicsData.topics} />} />
          <Route path="/topic/:id/result" element={<Result />} />
          <Route path="/createTopic" element={<CreateTopic/>}/>
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
