import React, { useState} from 'react';
import HospitalList from '../components/HospitalList';
import DepartmentList from '../components/DepartmentList';
import DoctorList from '../components/DoctorList';
import DoctorQueue from '../components/DoctorQueue';
import HospitalDetails from '../components/HospitalDetails';
import axios from 'axios';

function Home({ token }) {
  const [view, setView] = useState('hospitals');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleHospitalSelect = async (hospital) => {
    setSelectedHospital(hospital);
    setView('hospitalDetails');

    try {
      const res = await axios.get(`http://localhost:5000/api/departments/hospital/${hospital._id}`);
      setDepartments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setView('doctors');
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setView('queue');
  };

  const handleBack = () => {
    if (view === 'queue') {
      setView('doctors');
      setSelectedDoctor(null);
    } else if (view === 'doctors') {
      setView('hospitalDetails');
      setSelectedDepartment(null);
    } else if (view === 'hospitalDetails') {
      setView('hospitals');
      setSelectedHospital(null);
      setDepartments([]);
    }
  };

  return (
    <div className="home">
      {view !== 'hospitals' && (
        <button onClick={handleBack} className="back-btn">← Back</button>
      )}

      {view === 'hospitals' && <HospitalList onSelect={handleHospitalSelect} />}
      
      {view === 'hospitalDetails' && selectedHospital && (
        <div>
          <HospitalDetails hospital={selectedHospital} />
          <DepartmentList hospitalId={selectedHospital._id} onSelect={handleDepartmentSelect} />
        </div>
      )}

      {view === 'doctors' && <DoctorList departmentId={selectedDepartment._id} onSelect={handleDoctorSelect} />}
      {view === 'queue' && <DoctorQueue doctor={selectedDoctor} token={token} />}
    </div>
  );
}

export default Home;
