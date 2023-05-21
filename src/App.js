import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import NewsList from './pages/News/NewsList'
import { GetNewsById } from './pages/News/GetNewsById'
import { CreateNews } from './pages/News/CreateNews'
import { EditNews } from './pages/News/EditNews'
import { AddBranch } from './pages/Branch/AddBranch'
// import { DeleteNews } from './pages/News/DeleteNews'; // Unnecessary !!!!!
import { Button } from './components/Button';
import { useQuery, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Layout } from './components/Layout'
import { Route, Routes } from "react-router-dom"

function App() {

  // const queryClient = new QueryClient()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        //suspense: true,
      },
    }
  })

  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<NewsList />} />
          <Route path='/newsById/:id' element={<GetNewsById />} />
          <Route path='/addNews/' element={<CreateNews />} />
          <Route path='/editNews/:id' element={<EditNews />} />
          <Route path='/addBranch/' element={<AddBranch />} />
          {/* <Route path=':id' element={<PostPage />} /> */}
          {/* <Route path=':id/edit' element={<EditPostPage />} /> */}
          {/* <Route path='register' element={<RegisterPage />} /> */}
          {/* <Route path='login' element={<LoginPage />} /> */}
        </Routes>
        <ToastContainer position='bottom-right' autoClose={3000}/>
      </Layout>


      {/* <div >
        <GetNewsById/>
      </div> */}

      {/* <div>
        <CreateNews />
      </div> */}

      {/* <div>
        <Button title="Add News" addnews={CreateNews} />
      </div> */}

      {/* <div>
        <DeleteNews />
      </div> */}

    </>
  )
}

export default App;
