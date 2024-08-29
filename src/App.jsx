import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Blocs } from "./Pages/Blocs"
import { Home } from "./Pages/Home"
import { Images } from "./Pages/Images"
import { Markdowns } from "./Pages/Markdowns"
import { MDProvider } from "./Components/Context/MDContext"
import { FileProvider } from "./Components/Context/FileContext"

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
      <FileProvider>
        <MDProvider>
          <RouterProvider router={router} />
        </MDProvider>
      </FileProvider>
    </>
  )
}

export default App
