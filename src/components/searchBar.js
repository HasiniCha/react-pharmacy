import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { SERVER_PATH } from '../services/Config';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [medicines, setMedicines] = useState([]);

  // const medicines = [
  //   'Aspirin',
  //   'Ibuprofen',
  //   'Paracetamol',
  //   'Amoxicillin',
  //   'Lisinopril',
  //   'Atorvastatin',
  //   'Omeprazole',
  //   'Metformin',
  //   'Simvastatin',
  //   'Prednisone',
  //   'Azithromycin',
  //   'Losartan',
  //   'Metoprolol',
  //   'Ciprofloxacin',
  //   'Gabapentin',
  //   'Amlodipine',
  //   'Warfarin',
  //   'Fluoxetine',
  //   'Escitalopram',
  //   'Tramadol'
  // ];
  // const company = [
  //   'ARMY AND AIR FORCE EXCHANGE SERVICE',
  //   'NorthStar Rx LLC',
  //   'Cardinal Health',
  //   'Airgas Northern California and Nevada, Inc.',
  //   'Nelco Laboratories, Inc.',
  //   'PD-Rx Pharmaceuticals, Inc.',
  //   'PharmaDerm, A division of Fougera Pharmaceuticals Inc.',
  //   'REMEDYREPACK INC.',
  //   'Natural Health Supply',
  //   'Menper Distributors, Inc.',
  //   'Natural Health Supply',
  //   'Akorn, Inc.',
  //   'Avon Products, Inc.',
  //   'Deb USA, Inc.',
  //   'Valeant Pharmaceuticals North America LLC',
  //   'Barr Laboratories Inc.',
  //   'PD-Rx Pharmaceuticals, Inc.',
  //   'Teva Respiratory, LLC',
  //   'Chain Drug Marketing Association Inc.',
  // ];
  // const diagnosis = [
  //   'Pain relief',
  //   'Pain relief and anti-inflammatory',
  //   'Pain and fever relief',
  //   'Antibiotic',
  //   'Hypertension management',
  //   'Cholesterol management',
  //   'Acid reflux treatment',
  //   'Diabetes management',
  //   'Cholesterol management',
  //   'Anti-inflammatory and immunosuppressant',
  //   'Antibiotic',
  //   'Hypertension management',
  //   'Hypertension management',
  //   'Antibiotic',
  //   'Neuropathic pain relief',
  //   'Hypertension management',
  //   'Anticoagulant',
  //   'Antidepressant',
  //   'Antidepressant',
  //   'Pain relief'
  // ];

  const getMedicines = async () => {
    await getDocs(collection(db, "medicines")).
    then((querySnapshot)=>{
      const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}));
      setMedicines(newData);
    })
  }

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleReset = () => {
    setSearchInput('');
    setSelectedMedicines([]);
  };

  const handleSubmit = () => {
    // Handle submit logic here
    // You can access the selected medicines using the selectedMedicines state
    console.log(selectedMedicines);
    fetch(SERVER_PATH+"fetch?list="+selectedMedicines.toString(), {
      method: 'get',
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    })
    .then(function (data) {
        console.log('Request succeeded with JSON response', data);
    })
    .catch(function (error) {
        console.log('Request failed', error);
    }); 
  };

  const handleSelect = (med) => {
    if (selectedMedicines.includes(med)) {
      setSelectedMedicines(selectedMedicines.filter((item) => item !== med));
    } else {
      setSelectedMedicines([...selectedMedicines, `col:${med.column}|row:${med.row}|offset:${med.offset}`]);
    }
  };

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.medicine.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(()=>{
    getMedicines();
  }, [])

  return (
    <div className='medContainer'>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
        id="searchbar"
      />
      <button type="submit" className="search-button btn">
        <img src="./images/th.jpg" alt="Search" />
      </button>
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">Medicine</th>
            <th scope="col">Company</th>
            <th scope="col">Diagnosis</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {medicines.length>0?filteredMedicines.map((filteredMedicine) => {
            return (
              <tr key={filteredMedicine.id}>
                <td>{filteredMedicine.medicine}</td>
                <td>{filteredMedicine.company}</td>
                <td>{filteredMedicine.diagnosis}</td>
                <td>
                  <button
                    type="button"
                    className={`btn ${selectedMedicines.includes(`col:${filteredMedicine.column}|row:${filteredMedicine.row}|offset:${filteredMedicine.offset}`) ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleSelect(filteredMedicine)}
                  >
                    Select
                  </button>
                </td>
              </tr>
            );
          }): "Please wait a moment..."}
        </tbody>
      </table>

      <div>
        <button type="button" class="btn btn-dark" onClick={handleReset}>
          Reset
        </button>
        <button type="button" class="btn btn-dark" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default SearchBar;



