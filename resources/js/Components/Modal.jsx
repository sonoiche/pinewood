import { useEffect, useState } from "react";

const Modal = ({ open }) => {
  const [isOpen, setIsOpen] = useState(open);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="text-center">
      <div
        className={`fixed inset-0 bg-black bg-opacity-75 transition-opacity duration-300 ease-in-out z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleModal}
      ></div>
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 w-full max-w-md transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-800">Modal Title</h3>
            <button
              onClick={toggleModal}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <img 
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/eda84f29-ef4f-4a91-8240-a0d31b5e9594.png" 
              alt="Modern dashboard interface with analytics charts on a dark background" 
              className="w-full rounded-lg mb-4"
            />
            <p className="text-gray-600">
              This is a React modal component with smooth transitions. The backdrop has a dark overlay
              and the modal itself has scaling animations when opening and closing.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={toggleModal}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={toggleModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;