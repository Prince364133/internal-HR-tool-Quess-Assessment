import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertTriangle } from 'lucide-react';

export function DeleteConfirm({ isOpen, onClose, onConfirm, employeeName, isDeleting }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col items-center sm:items-start sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="text-center sm:text-left pt-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Delete Employee
                    </h3>
                    <div className="mt-2 text-sm text-gray-500">
                        Are you sure you want to delete <span className="font-semibold text-gray-900">{employeeName}</span>?
                        This action cannot be undone and will cascade to delete all associated attendance records.
                    </div>
                </div>
            </div>
            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 w-full">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                    disabled={isDeleting}
                    className="w-full sm:w-auto"
                >
                    Cancel
                </Button>
                <Button
                    type="button"
                    variant="danger"
                    onClick={onConfirm}
                    isLoading={isDeleting}
                    className="w-full sm:w-auto"
                >
                    Yes, Delete
                </Button>
            </div>
        </Modal>
    );
}
