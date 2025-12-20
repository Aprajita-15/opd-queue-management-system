const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Hospital = require('./models/Hospital');
const Department = require('./models/Department');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Queue = require('./models/Queue');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected for seeding...');
};

const clearDatabase = async () => {
  await User.deleteMany({});
  await Hospital.deleteMany({});
  await Department.deleteMany({});
  await Doctor.deleteMany({});
  await Patient.deleteMany({});
  await Queue.deleteMany({});
  console.log('Database cleared!');
};

const seedData = async () => {
  try {
    await connectDB();
    await clearDatabase();

    const hospitals = [];
    const departments = [];
    const doctors = [];
    const patients = [];
    const queues = [];
    const users = [];

    /* -------------------- DATA -------------------- */

    const hospitalData = [
      {
        name: 'AIIMS — New Delhi',
        image: 'https://www.sikshapedia.com/public/data/colleges/aiims-delhi-new-delhi-delhi-ncr/aiims-delhi-new-delhi-delhi-ncr-banner.webp',
        address: { city: 'Delhi', state: 'Delhi', pincode: '110029' },
        contact: '+91-11-26588500',
        type: 'Super Speciality',
        status: 'active',
        bedAvailability: 290
      },
      {
        name: 'Medanta — Gurugram',
        image: 'https://yapita-production.s3.ap-south-1.amazonaws.com/uploads/facility/seo_image/f97cbbea-a019-4a36-bf3f-37e3134489a5/file.webp',
        address: { city: 'Gurugram', state: 'Haryana', pincode: '122001' },
        contact: '+91-124-4141414',
        type: 'Multi-Speciality',
        status: 'active',
        bedAvailability: 2
      },
      {
        name: 'Max Hospital — Saket',
        image: 'https://www.medijourney.co.in/uploads/51ba570fe68fc088e0a942bdf8700cdce7eb8b1e/1749885955max-smart-super-speciality-hospital-saket-new-delhi.webp',
        address: { city: 'Delhi', state: 'Delhi', pincode: '110017' },
        contact: '+91-11-26515050',
        type: 'Multi-Speciality',
        status: 'active',
        bedAvailability: 29
      },
      {
        name: 'Fortis — Gurugram',
        image: 'https://doctrepat.com/wp-content/uploads/2024/04/5.png',
        address: { city: 'Gurugram', state: 'Haryana', pincode: '122003' },
        contact: '+91-124-4962200',
        type: 'Multi-Speciality',
        status: 'active',
        bedAvailability: 200
      },
      {
        name: 'Sir Ganga Ram Hospital',
        image: 'https://images.indianexpress.com/2022/02/sir-ganga-ram-hospital.jpg',
        address: { city: 'Delhi', state: 'Delhi', pincode: '110060' },
        contact: '+91-11-25750000',
        type: 'General',
        status: 'active',
        bedAvailability: 119
      },
      {
        name: 'Amrita Hospital — Faridabad',
        image: 'https://doctorlistingingestionpr.blob.core.windows.net/provider/1674657383017_0018p000008SzWDAA0HospitalProfileImage_Screenshot%202023-01-25%20200414%20(2).png',
        address: { city: 'Faridabad', state: 'Haryana', pincode: '121002' },
        contact: '+91-129-2851234',
        type: 'Super Speciality',
        status: 'active',
        bedAvailability: 566
      },
      {
        name: 'Aster Medcity — Kochi',
        image: 'https://images.financialexpressdigital.com/2024/02/aster-healthcare.jpg',
        address: { city: 'Kochi', state: 'Kerala', pincode: '682034' },
        contact: '+91-484-6699999',
        type: 'Multi-Speciality',
        status: 'active',
        bedAvailability: 89
      },
      {
        name: 'Rajiv Gandhi Government General Hospital — Chennai',
        image: 'https://images.jdmagicbox.com/v2/comp/chennai/m1/044pxx44.xx44.170623075039.g8m1/catalogue/dr-thulasiraman-v-rajiv-gandhi-government-general-hospital--park-town-chennai-orthopaedic-doctors-9no8m.jpg',
        address: { city: 'Chennai', state: 'Tamil Nadu', pincode: '600003' },
        contact: '+91-44-25305000',
        type: 'Government',
        status: 'active',
        bedAvailability: 9
      }
    ];

    const departmentNames = [
      'Cardiology',
      'Orthopedics',
      'Neurology',
      'Pediatrics',
      'General Medicine',
      'Emergency',
      'Dermatology',
      'ENT',
      'Ophthalmology'
    ];

    const doctorData = [
      { name: 'Rajesh Kumar', specialization: 'Cardiologist', photo: 'https://c8.alamy.com/comp/2HBAKGP/portrait-of-young-indian-male-doctor-writing-prescription-on-paper-while-sitting-at-desk-outdoor-village-hospital-looking-at-camera-rural-healthcare-2HBAKGP.jpg' },
      { name: 'Priya Sharma', specialization: 'Cardiologist', photo: 'https://www.shutterstock.com/image-photo/happy-female-doctor-stethoscope-on-600nw-2527451925.jpg' },
      { name: 'Amit Patel', specialization: 'Orthopedic Surgeon', photo: 'https://media.istockphoto.com/id/1468678624/photo/nurse-hospital-employee-and-portrait-of-black-man-in-a-healthcare-wellness-and-clinic-feeling.jpg?s=612x612&w=0&k=20&c=AGQPyeEitUPVm3ud_h5_yVX4NKY9mVyXbFf50ZIEtQI=' },
      { name: 'Sneha Reddy', specialization: 'Orthopedic Surgeon', photo: 'https://www.shutterstock.com/image-photo/medicine-healthcare-profession-concept-smiling-260nw-2155207903.jpg' },
      { name: 'Vikram Singh', specialization: 'Neurologist', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD8ZHQEXFF5oSIzXifb0rWe70DxdMyW4nWvA&s' },
      { name: 'Anjali Mehta', specialization: 'Neurologist', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWiVCFu8-lyAiFwVPARLZJu0SbgcX3uyt9UA&s' },
      { name: 'Suresh Iyer', specialization: 'Pediatrician', photo: 'https://img.freepik.com/free-psd/doctor-preparing-routine-medical-check_23-2150493265.jpg?semt=ais_hybrid&w=740&q=80' },
      { name: 'Kavita Nair', specialization: 'Pediatrician', photo: 'https://st2.depositphotos.com/1499355/12350/i/450/depositphotos_123508612-stock-photo-female-doctor-wearing-wearing-uniform.jpg' },
      { name: 'Rahul Verma', specialization: 'General Physician', photo: 'https://media.istockphoto.com/id/1346124900/photo/confident-successful-mature-doctor-at-hospital.jpg?s=612x612&w=0&k=20&c=S93n5iTDVG3_kJ9euNNUKVl9pgXTOdVQcI_oDGG-QlE=' },
      { name: 'Pooja Desai', specialization: 'General Physician', photo: 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D' }
    ];

    const patientNames = [
      'Ramesh Kumar', 'Sunita Devi', 'Vijay Sharma', 'Geeta Patel', 'Mohit Singh',
      'Anita Gupta', 'Rajesh Verma', 'Kavita Rao', 'Sunil Reddy', 'Priya Desai'
    ];

    const symptoms = [
      'Chest pain', 'Headache', 'Fever', 'Stomach pain', 'Joint pain',
      'Skin allergy', 'Ear pain', 'Eye problem', 'Cold & cough'
    ];

    const workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const workingHoursOptions = [
      { start: '09:00 AM', end: '02:00 PM' },
      { start: '02:00 PM', end: '07:00 PM' }
    ];

    let doctorIndex = 0;
    let patientIndex = 0;

    /* -------------------- SEEDING -------------------- */

    for (let h = 0; h < hospitalData.length; h++) {
      const hospital = await Hospital.create(hospitalData[h]);
      hospitals.push(hospital);

      users.push(await User.create({
        email: `hospital${h + 1}@example.com`,
        password: 'password123',
        role: 'hospital',
        refId: hospital._id
      }));

      const hospitalDepartments = [];

      for (let d = 0; d < 3; d++) {
        const department = await Department.create({
          name: departmentNames[d],
          hospitalId: hospital._id,
          doctors: []
        });

        departments.push(department);
        hospitalDepartments.push(department._id);

        const departmentDoctors = [];

        for (let i = 0; i < 2; i++) {
          const docData = doctorData[doctorIndex % doctorData.length];

          const doctor = await Doctor.create({
            name: docData.name,
            photo: docData.photo,
            specialization: docData.specialization,
            departmentId: department._id,
            workingDays,
            workingHours: workingHoursOptions[doctorIndex % workingHoursOptions.length],
            queue: []
          });

          doctors.push(doctor);
          departmentDoctors.push(doctor._id);

          users.push(await User.create({
            email: `doctor${doctorIndex + 1}@example.com`,
            password: 'password123',
            role: 'doctor',
            refId: doctor._id
          }));

          const doctorQueue = [];

          for (let p = 0; p < 10; p++) {
            const patient = await Patient.create({
              name: patientNames[patientIndex % patientNames.length],
              age: 25 + Math.floor(Math.random() * 50),
              phone: `+91900000${patientIndex}`,
              symptoms: symptoms[Math.floor(Math.random() * symptoms.length)],
              status: p === 0 ? 'in-consultation' : 'waiting'
            });

            patients.push(patient);

            users.push(await User.create({
              email: `patient${patientIndex + 1}@example.com`,
              password: 'password123',
              role: 'patient',
              refId: patient._id
            }));

            const queueEntry = await Queue.create({
              doctorId: doctor._id,
              patientId: patient._id,
              position: p + 1,
              estimatedTime: (p + 1) * 15
            });

            queues.push(queueEntry);
            doctorQueue.push(queueEntry._id);

            patientIndex++;
          }

          await Doctor.findByIdAndUpdate(doctor._id, { queue: doctorQueue });
          doctorIndex++;
        }

        await Department.findByIdAndUpdate(department._id, { doctors: departmentDoctors });
      }

      await Hospital.findByIdAndUpdate(hospital._id, { departments: hospitalDepartments });
    }

    console.log('\n✅ DATABASE SEEDED SUCCESSFULLY');
    console.log(`Hospitals: ${hospitals.length}`);
    console.log(`Departments: ${departments.length}`);
    console.log(`Doctors: ${doctors.length}`);
    console.log(`Patients: ${patients.length}`);
    console.log(`Queues: ${queues.length}`);
    console.log(`Users: ${users.length}\n`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedData();