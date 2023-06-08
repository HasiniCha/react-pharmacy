import React, { useState } from 'react';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const medicines = [
    'Aspirin',
    'Ibuprofen',
    'Paracetamol',
    'Amoxicillin',
    'Lisinopril',
    'Atorvastatin',
    'Omeprazole',
    'Metformin',
    'Simvastatin',
    'Prednisone',
    'Azithromycin',
    'Losartan',
    'Metoprolol',
    'Ciprofloxacin',
    'Gabapentin',
    'Amlodipine',
    'Warfarin',
    'Fluoxetine',
    'Escitalopram',
    'Tramadol'
  ];
  const company = [
    'ARMY AND AIR FORCE EXCHANGE SERVICE',
    'NorthStar Rx LLC',
    'Cardinal Health',
    'Airgas Northern California and Nevada, Inc.',
    'Nelco Laboratories, Inc.',
    'PD-Rx Pharmaceuticals, Inc.',
    'PharmaDerm, A division of Fougera Pharmaceuticals Inc.',
    'REMEDYREPACK INC.',
    'Natural Health Supply',
    'Menper Distributors, Inc.',
    'Natural Health Supply',
    'Akorn, Inc.',
    'Avon Products, Inc.',
    'Deb USA, Inc.',
    'Valeant Pharmaceuticals North America LLC',
    'Barr Laboratories Inc.',
    'PD-Rx Pharmaceuticals, Inc.',
    'Teva Respiratory, LLC',
    'Chain Drug Marketing Association Inc.',
  ];
  const diagnosis = [
    'Pain relief',
    'Pain relief and anti-inflammatory',
    'Pain and fever relief',
    'Antibiotic',
    'Hypertension management',
    'Cholesterol management',
    'Acid reflux treatment',
    'Diabetes management',
    'Cholesterol management',
    'Anti-inflammatory and immunosuppressant',
    'Antibiotic',
    'Hypertension management',
    'Hypertension management',
    'Antibiotic',
    'Neuropathic pain relief',
    'Hypertension management',
    'Anticoagulant',
    'Antidepressant',
    'Antidepressant',
    'Pain relief'
  ];

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
  };

  const handleSelect = (index) => {
    if (selectedMedicines.includes(index)) {
      setSelectedMedicines(selectedMedicines.filter((item) => item !== index));
    } else {
      setSelectedMedicines([...selectedMedicines, index]);
    }
  };

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <input
        type="search"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
      <button type="submit" className="search-button">
        <img src="./images/th.jpg" alt="Search" />
      </button>
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">Medicine</th>
            <th scope="col">Company</th>
            <th scope="col">Diagnosis</th>
            <th scope="col">Select</th>
          </tr>
        </thead>
        <tbody>
          {filteredMedicines.map((filteredMedicine) => {
            const index = medicines.indexOf(filteredMedicine);
            return (
              <tr key={index}>
                <td>{filteredMedicine}</td>
                <td>{company[index]}</td>
                <td>{diagnosis[index]}</td>
                <td>
                  <button
                    type="button"
                    className={`btn ${selectedMedicines.includes(index) ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleSelect(index)}
                  >
                    Select
                  </button>
                </td>
              </tr>
            );
          })}
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



