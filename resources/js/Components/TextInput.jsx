import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import InputError from './InputError';
import InputLabel from './InputLabel';

export default forwardRef(function TextInput(
  { type = 'text', isFocused = false, className = '', errorMessage = '', ...props },
  ref,
) {
  const localRef = useRef(null);
  const [message, setMessage] = useState('');
  const [fieldType, setFieldType] = useState(false);
  const [inputType, setInputType] = useState('text');

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  const handleKeyType = (e) => {
    if(e.target.value !== '') {
      setMessage('');
    } else {
      setMessage(errorMessage);
    }
  }

  const handleInputChange = () => {
    setFieldType(prevState => !prevState);
  }

  const handleTimeIconClick = () => {
    localRef.current?.focus();
    localRef.current?.showPicker();
  }

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  useEffect(() => {
    setMessage(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    if(fieldType) {
      setInputType('text');
    } else {
      setInputType(type);
    }
  }, [fieldType]);
    
  return (
    <>
      <div className='relative'>
        <InputLabel htmlFor={props.id} value={props.title} />
        <input
          {...props}
          type={inputType}
          className={
            `w-full form-input px-3 py-1.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500
            ${className}
            ${message ? 'border-red-500 focus:border-red-600' : 'bg-white focus:border-blue-600'}
          `}
          ref={localRef}
          onKeyUp={handleKeyType}
        />
          {type === 'password' && (
            <div className='absolute right-3 top-[35px] text-gray-600 cursor-pointer' onClick={handleInputChange}>
              {fieldType ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )}
            </div>
          )}
          {type === 'time' && (
            <div className='absolute right-3 top-[35px] text-gray-600 cursor-pointer' onClick={handleTimeIconClick}>
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg> */}
            </div>
          )}
      </div>
      <InputError className="mt-1" message={message} />
    </>
  );
});
