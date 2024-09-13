import { Button, Modal } from "react-bootstrap";

export function ModalComponent({ title, content, showModal, handleClose }) {

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{content}</Modal.Body>
            </Modal>
        </>
    )
}