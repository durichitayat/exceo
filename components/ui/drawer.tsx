import React, { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Drawer({ isOpen, onClose, children }: DrawerProps) {
  return (
    <Transition
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-40"
        onClose={onClose}
      >
        <div className="absolute inset-0 overflow-hidden">
          <TransitionChild
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-y-0 right-0 flex max-w-full">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="w-screen max-w-4xl">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  <div className="flex justify-end p-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  {children}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
