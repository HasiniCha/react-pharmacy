import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, setDoc, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { SERVER_PATH } from '../services/Config';
import { async } from '@firebase/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [fetchedMedicines, setFetchedMedicines] = useState([]);
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
    const q = query(collection(db, "medicines"), where("inStock", "==", true));
    await getDocs(q).
    then((querySnapshot)=>{
      const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}));
      setMedicines(newData);
    })
  }

  const getUnavailableMedicines = async () => {
    const q = query(collection(db, "medicines"), where("inStock", "==", false));
    await getDocs(q).
    then((querySnapshot)=>{
      const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}));
      setFetchedMedicines(newData);
    })
  }

  const updateStock = async (doc_id) => {
    const medRef = doc(db, "medicines", doc_id);
    await updateDoc(medRef, {
      inStock: false
    }).then((result)=>{
      console.log(result);
    }).catch((err)=>{
      console.log(err);
    });
  }

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleReset = () => {
    setSearchInput('');
    setSelectedMedicines([]);
  };

  const processList = (list) => {
    let newlist = [];
    list.forEach(async (med)=>{
        newlist.push(`col:${med.column}|row:${med.row}|offset:${med.offset}`);
    })
    return newlist;
  }

  const handleSubmit = async () => {
    // Handle submit logic here
    // You can access the selected medicines using the selectedMedicines state
    selectedMedicines.sort((a, b) => {
      let columnA = Number(a.column);
      let columnB = Number(b.column);
      let offsetA = Number(a.offset);
      let offsetB = Number(b.offset);
      if (columnA === columnB) {
        // If "column" values are equal, sort based on "offset"
        return offsetA - offsetB;
      } else {
        // Sort based on "column" if they are different
        return columnA - columnB;
      }
    });

    let out = processList(selectedMedicines);
    console.log(selectedMedicines);
    console.log(out);

    fetch(SERVER_PATH+"fetch?list="+out.toString(), {
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
    
    selectedMedicines.forEach(async (med)=> {
      console.log(med.id);
      await updateStock(med.id);
    })

    getMedicines();
    getUnavailableMedicines();
  };

  const handleSelect = (med) => {
    if (selectedMedicines.includes(med)) {
      setSelectedMedicines(selectedMedicines.filter((item) => item !== med));
    } else {
      setSelectedMedicines([...selectedMedicines, med]);
    }
  };

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.medicine.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleRestore = async (doc_id) => {
    const medRef = doc(db, "medicines", doc_id);
    await updateDoc(medRef, {
      inStock: true
    }).then((result)=>{
      console.log(result);
    }).catch((err)=>{
      console.log(err);
    });

    getMedicines();
    getUnavailableMedicines();
  }

  useEffect(()=>{
    getMedicines();
    getUnavailableMedicines();
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
        <FontAwesomeIcon icon={faSearch} colo="#fff"/> Search
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
                    className={`btn ${selectedMedicines.includes(filteredMedicine) ? 'btn-primary' : 'btn-secondary'}`}
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
      
      <h3>Out of stock medicines</h3>
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
          {fetchedMedicines.length>0?fetchedMedicines.map((filteredMedicine) => {
            return (
              <tr key={filteredMedicine.id}>
                <td>{filteredMedicine.medicine}</td>
                <td>{filteredMedicine.company}</td>
                <td>{filteredMedicine.diagnosis}</td>
                <td>
                  <button
                    type="button"
                    className={`btn ${selectedMedicines.includes(filteredMedicine) ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleRestore(filteredMedicine.id)}
                  >
                    Restore
                  </button>
                </td>
              </tr>
            );
          }): "No items to show..."}
        </tbody>
      </table>

   
    </div>
  );
};

export default SearchBar;



