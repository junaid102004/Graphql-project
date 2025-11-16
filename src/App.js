import { Routes, Route } from "react-router-dom";
// import DistrictForm from "./components/DistrictForm";
import Home from "./components/Home.jsx";
import NewDistrictForm from "./components/NewDistrict.jsx";
import StudentCourseUI from "./components/StudentsData.jsx";
import CartItems from "./components/CartItems.jsx";
import Data from "./components/Data.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/data" element={<Data/>} />
      {/* <Route path="/district" element={<DistrictForm />} /> */}
      <Route path="/new-district" element={<NewDistrictForm />} />
      <Route path="/students-details" element={<StudentCourseUI/>} />
      <Route path="/cartDetails" element={<CartItems/>} />
    </Routes>
  );
}

export default App;
