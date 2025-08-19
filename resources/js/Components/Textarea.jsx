import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import InputError from './InputError';
import InputLabel from './InputLabel';

export default forwardRef(function Textarea(
    { className = '', isFocused = false, errorMessage = '', ...props },
    ref,
) {
    const localRef = useRef(null);
    const [message, setMessage] = useState('');

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const handleKeyType = (e) => {
        if(e.target.value !== '') {
            setMessage('');
        } else {
            setMessage(errorMessage);
        }
    }

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    useEffect(() => {
        setMessage(errorMessage);
    }, [errorMessage]);

    return (
        <>
            <InputLabel htmlFor={props.id} value={props.title} />
            <textarea
                {...props}
                className={
                    'w-full form-input px-4 py-2 h-36 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none ' +
                    className
                }
                ref={localRef}
                onKeyUp={handleKeyType}
            />
            <InputError className="mt-1" message={message} />
        </>
    );
});
