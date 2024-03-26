
import Sidebar from "./components/Sidebar";
import { Attributes } from "./components/Attributes";
import { UserForm } from "./components/UserForm";
import {Routes,Route} from "react-router-dom";
const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
         <Route path="/" Component={Attributes}/>
          <Route path="/user" Component={UserForm}/>
      </Routes>
    </div>
  )
}

export default App;