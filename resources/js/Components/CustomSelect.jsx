import React, { useEffect, useState } from "react";
import CreatableSelect from 'react-select/creatable';
import InputLabel from "./InputLabel";
import InputError from "./InputError";

const CustomSelect = ({ options, onChange, selected = {}, errorMessage = '', ...props }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (selectedOption) => {
    setSelectedValues(selectedOption);
    if (onChange) {
      onChange(selectedOption);
    }
  };

  useEffect(() => {
    setMessage(errorMessage);
  }, [errorMessage]);

  return (
    <div className='relative'>
      <InputLabel htmlFor={props.id} value={props.title || 'Choose an Option'} />
      <div className={`w-full ${message ? 'border border-red-500 rounded-sm' : ''}`}>
        <CreatableSelect isClearable isSearchable options={options} onChange={handleChange} placeholder={props.placeholder} defaultValue={selected} />
      </div>
      <InputError className="mt-1" message={message} />
    </div>
  )
};

export default CustomSelect;