"use client";

import React from "react";

interface ConfirmationDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: "danger" | "primary" | "success" | "warning";
    onConfirm: () => void;
    onCancel: () => void;
    icon?: "warning" | "danger" | "question" | "info";
    loading?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    open,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmVariant = "primary",
    onConfirm,
    onCancel,
    icon = "question",
    loading = false,
}) => {
    if (!open) return null;

    const getIconElement = () => {
        const iconClasses = "h-6 w-6";

        switch (icon) {
            case "warning":
                return (
                    <svg className={`${iconClasses} text-yellow-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                );
            case "danger":
                return (
                    <svg className={`${iconClasses} text-red-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                );
            case "info":
                return (
                    <svg className={`${iconClasses} text-blue-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case "question":
            default:
                return (
                    <svg className={`${iconClasses} text-gray-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    const getConfirmButtonClasses = () => {
        const baseClasses = "px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

        switch (confirmVariant) {
            case "danger":
                return `${baseClasses} text-white bg-red-600 border border-transparent hover:bg-red-700 focus:ring-red-500`;
            case "success":
                return `${baseClasses} text-white bg-green-600 border border-transparent hover:bg-green-700 focus:ring-green-500`;
            case "warning":
                return `${baseClasses} text-white bg-yellow-600 border border-transparent hover:bg-yellow-700 focus:ring-yellow-500`;
            case "primary":
            default:
                return `${baseClasses} text-white bg-blue-600 border border-transparent hover:bg-blue-700 focus:ring-blue-500`;
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl transform transition-all duration-200 scale-100">
                <div className="flex items-start mb-4">
                    <div className="flex-shrink-0 mr-3">
                        {getIconElement()}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {title}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={getConfirmButtonClasses()}
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Loading...
                            </div>
                        ) : (
                            confirmText
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;