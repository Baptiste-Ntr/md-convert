import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Blocs } from "./Pages/Blocs"
import { Home } from "./Pages/Home"
import { Images } from "./Pages/Images"
import { Markdowns } from "./Pages/Markdowns"
import { MDProvider } from "./Components/Context/MDContext"

function App() {

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

  return (
    <>
      <MDProvider>
        <RouterProvider router={router} />
      </MDProvider>
    </>
  )
}

export default App
