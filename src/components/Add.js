import React, { useState } from 'react'
import {collection, addDoc} from 'firebase/firestore'
import {db} from '../services/firebase'

const Add = () => {
  const [medicine, setMedicine] = useState();
  const [company, setCompany] = useState();
  const [diagnosis, setDiagnosis] = useState();
  const [column, setColumn] = useState();
  const [row, setRow] = useState();
  const [offset, setOffset] = useState();

  const addNewMedicine = async (e) => {
    e.preventDefault();
    try{
      if(medicine && column && row && offset) {
        const docRef = await addDoc(collection(db, "medicines"),{
          medicine, company, diagnosis, column, row, offset
        });
        console.log("Document written with ID: ", docRef.id);
      } else {
        alert("Please fill all the fields");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <form>
        <h2>Add new medicine</h2>
        <div className='input-container'>
          <label for="medicine">medicine</label>
          <input type="text" id="medicine" onChange={(e)=>{
            setMedicine(e.target.value);
          }}/>
        </div>
        <div className='input-container'>
          <label for="company">company</label>
          <input type="text" id="company" onChange={(e)=>{
            setCompany(e.target.value);
          }}/>
        </div>
        <div className='input-container'>
          <label for="diagnosis">dignosis</label>
          <input type="text" id="diagnosis" onChange={(e)=>{
            setDiagnosis(e.target.value);
          }}/>
        </div>
        <div className='input-container'>
          <label for="column">column</label>
          <input type="number" id="column" onChange={(e)=>{
            setColumn(e.target.value);
          }}/>
        </div>
        <div className='input-container'>
          <label for="row">row</label>
          <input type="number" id="row" onChange={(e)=>{
            setRow(e.target.value);
          }}/>
        </div>       
        <div className='input-container'>
          <label for="offset">offset</label>
          <input type="number" id="offset" onChange={(e)=>{
            setOffset(e.target.value);
          }}/>
        </div>
      
        <button id="addBtn" type="submit" onClick={(e)=>{addNewMedicine(e)}}>add</button>
    </form>
  )
}

export default Add