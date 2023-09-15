"use client";


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dropdown({DropdownValue}:{DropdownValue:any}) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    async function fetchOptions() {

      try {
         const url = 'http://localhost/ce-project/backend/languages';
        const response = await axios.get(url);
        const data = response.data;
        setOptions(data?.data);
        
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    }

    fetchOptions();
  }, []);

  const handleSelection = (event:any) => {
    setSelected(event.target.value);
    DropdownValue(event.target.value);
  };



  return (
    
    <select value={selected} onChange={handleSelection} className = "w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500">
      <option value="">Please select spoken language</option>
      {options.map((option:any) => (
        <option key={option.id} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;