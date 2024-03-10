import { useModal } from "@/context/ModalContext";

export default function Modal({ title, onClose, isOpen, children }) {
  const { closeModal } = useModal();

  const handleClose = () => {
    if (onClose) onClose();
    else closeModal();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          {/* Background Blur */}
          <div className="fixed inset-0 bg-black opacity-50"></div>
          {/* Modal */}
          <div className="relative w-auto max-w-3xl mx-auto  ">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t space-x-4">
                <h3 className="text-xl font-medium text-primary">{title}</h3>
                <button
                  className="bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={handleClose}
                >
                  <span className="bg-transparent text-black  text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/* Modal Content */}
              <div className="relative py-4 px-7 flex-auto overflow-y-auto max-h-[450px]">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
