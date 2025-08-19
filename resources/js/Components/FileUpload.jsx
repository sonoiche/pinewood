import React, { useEffect, useRef, useState } from 'react';
import InputError from './InputError';
import InputLabel from './InputLabel';

const FileUpload = ({ onFileUpload, errorMessage = '', ...props }) => {
    const fileInputRef = useRef(null);
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('No file chosen');

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    useEffect(() => {
        setMessage(errorMessage);
    }, [errorMessage]);

    useEffect(() => {
        onFileUpload(file);
    }, [file]);

    return (
        <>
            <InputLabel value={props.title} />
            <div className="flex items-center">
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept={props.accept}
                />
                <label
                    className="bg-blue-500 text-white my-1 px-4 py-1 rounded cursor-pointer hover:bg-blue-600 transition"
                    onClick={() => fileInputRef.current.click()}
                >
                    Choose File
                </label>
                <span className="ml-3 text-gray-700">{fileName}</span>
            </div>
            <InputError className="mt-1" message={message} />
        </>
    );
};

export default FileUpload;