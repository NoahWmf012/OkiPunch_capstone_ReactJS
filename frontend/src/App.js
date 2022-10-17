import './App.scss';
import HomePage from './pages/Home';
import { Routes, Route } from "react-router-dom";
import AdminLogin from './pages/AdminLogin';
import EmployeeLogin from './pages/EmployeeLogin';
import AdminSecret from './pages/AdminSecret';
import EmployeeSecret from './pages/EmployeeSecret';
import RequireAdminAuth from './components/RequireAdminAuth';
import RequireEmAuth from './components/RequireEmAuth';
import {
  // AddNew,
  Announcement,
  ShowOneCalendar,
  EStatement,
  Layoff,
  QRReader,
  ShowAllList,
  ShowOneInfo,
} from './components/admin/index'

import {
  EmCalendar,
  EmEstatement,
  EmPersonalInfo,
  EmPunch,
  EmSideBar
} from './components/employee/index'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/admin_login' element={<AdminLogin />} />
        <Route path='/employee_login' element={<EmployeeLogin />} />
        <Route path='/admin' element={
          <RequireAdminAuth>
            <AdminSecret />
          </RequireAdminAuth>
        } >
          {/* <Route path='addnew' element={<AddNew />} />
          <Route path='announcement' element={<Announcement />} />
          <Route path='layoff' element={<Layoff />} /> */}
          <Route path='showonecalendar' element={<ShowOneCalendar />} />
          <Route path='adestatement' element={<EStatement />} />
          <Route path='qrreader' element={<QRReader />} />
          <Route path='showallemployee' element={<ShowAllList />} />
          <Route path='showoneinfo' element={<ShowOneInfo />} />
        </Route>
        <Route path='employee' element={
          <RequireEmAuth>
            <EmployeeSecret />
          </RequireEmAuth>}>
          <Route path='calendar' element={<EmCalendar />} />
          <Route path='estatement' element={<EmEstatement />} />
          <Route path='personalinfo' element={<EmPersonalInfo />} />
          <Route path='punch' element={<EmPunch />} />
          <Route path='sidebar' element={<EmSideBar />} />
        </Route>
        <Route path='*' element={<>Incorrect URL. Press <a href='/'>HERE</a> to the Home Page</>} />
      </Routes>
    </div>
  );
}

export default App;
