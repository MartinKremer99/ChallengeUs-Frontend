import React from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import Image from "next/image";

const ConfirmModal = ({ close, show, title, action }) => {
  const handleCancel = () => {
    toast.warning("Action canceled");
    close();
  };

  return (
    <div>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={show}
        onClose={close}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0" />

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <div className="mt-2">
              <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                  <div className="">
                    <div className="relative flex items-center h-10 my-auto">
                      <Image
                        className="mx-auto w-auto object-contain"
                        fill
                        src="/logo.png"
                        alt="ChallengeUs Logo"
                      />
                    </div>

                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                      {title}
                    </h2>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                      <button
                        type="button"
                        onClick={action}
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mb-3"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
