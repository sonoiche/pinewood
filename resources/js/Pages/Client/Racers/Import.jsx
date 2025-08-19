import { Head, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const RacerImport = () => {

  const { errors } = usePage().props;
  const [data, setData] = useState({
    fname: ''
  });

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'text/csv': [],
    },
    onDrop: async (files) => {
      const formData = new FormData();
      formData.append("file", files[0]);
      
      await axios.post("/client/import-roster", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(() => {
        router.get('/client/racers');
      });
    }
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    router.post('/client/racers', data);
  }

  return (
    <AuthenticatedLayout>
      <Head title="Import Roster" />
      <div className="w-full">
        <div className="bg-white rounded-lg form-container shadow-xl">
          <div className="bg-indigo-400 p-6 text-white">
            <h1 className="text-2xl font-semibold">Import Roster</h1>
            <p className="opacity-80">Please select a spreadsheet to import</p>
          </div>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 p-10">
              <section className="border-2 border-dashed border-gray-400 flex flex-col justify-center items-center py-10 rounded-lg">
                <div>
                  <div {...getRootProps({ className: 'dropzone cursor-pointer' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select file</p>
                    <em>(Only *.csv file will be accepted)</em>
                  </div>
                  {acceptedFiles.length > 0 && (
                    <div className="my-5">
                      <h4>Uploading File</h4>
                      <ul>{acceptedFileItems}</ul>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

export default RacerImport;