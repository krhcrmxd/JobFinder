"use client";
import { useCallback, useState } from "react";
const styles = {
    overlay: {
        position: "fixed" as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        minWidth: "300px",
        boxShadow: "0 0 10px rgba(0,0,0,0.25)",
    },
};
export type ModalProps = {
    children: React.ReactNode;
};

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => {
        setIsOpen(true);
        console.log(13);
    }, []);
    const close = useCallback(() => {
        setIsOpen(false);
        console.log(14);
    }, []);
    //const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

    const Modal: React.FC<ModalProps> = ({ children }) =>
        isOpen ? (
            <div
                style={styles.overlay}
                onClick={close}
            >
                <div
                    style={styles.modal}
                    onClick={(e) => e.stopPropagation()}
                    className="w-1/2"
                >
                    {children}
                </div>
            </div>
        ) : null;

    return { Modal, open, close };
};
