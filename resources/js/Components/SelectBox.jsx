import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Select from 'react-select';
import InputLabel from './InputLabel';
import InputError from './InputError';

export default forwardRef(function SelectBox(
  { onChange, selected = '', className = '', errorMessage = '', options = [], ...props },
  ref,
) {
  const localRef = useRef(null);
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  const handleChange = (option) => {
    if (option) {
      onChange(option.value);
      setSelectedOption(option);
      setMessage('');
    } else {
      setMessage(errorMessage);
    }
  };

  useEffect(() => {
    setMessage(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    const selectedOpt = options.find(opt => opt.value == selected);
    setSelectedOption(selectedOpt || null);
  }, [selected, options]);

  return (
    <>
      <div className='relative'>
        <InputLabel htmlFor={props.id} value={props.title || 'Choose an Option'} />
        <Select
          ref={localRef}
          id="dropdown"
          value={selectedOption}
          onChange={handleChange}
          options={options}
          className={`w-full ${className} ${message ? 'border-red-500' : ''}`}
          classNamePrefix="react-select"
          placeholder="--"
          styles={{
            control: (provided) => ({
              ...provided,
              borderColor: message ? 'red' : provided.borderColor,
              boxShadow: 'none',
              '&:hover': {
                borderColor: message ? 'red' : provided.borderColor,
              },
            }),
          }}
        />
      </div>
      <InputError className="mt-1" message={message} />
    </>
  );
});
