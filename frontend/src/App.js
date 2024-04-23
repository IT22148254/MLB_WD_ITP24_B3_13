//import Layout from "./Components/Layout/Layout";
import { Outlet } from 'react-router-dom'
import Footer from "./Components/Common/Footer";
function App() {
  return (
    <>
      <main>
        <div style={{ height: "auto", width: "auto" }}>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default App;
