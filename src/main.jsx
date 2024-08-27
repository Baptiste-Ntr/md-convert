import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import '../src/styles/global.scss'
import { Home } from './Pages/Home.jsx'
import { Blocs } from './Pages/Blocs.jsx'
import { Images } from './Pages/Images.jsx'
import { Markdowns } from './Pages/Markdowns.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }, {
    path: '/blocs',
    element: <Blocs />
  }, {
    path: '/images',
    element: <Images />
  }, {
    path: '/markdown',
    element: <Markdowns />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
