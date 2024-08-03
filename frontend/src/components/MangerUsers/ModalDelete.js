import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



function ModalDelete(props) {


    return (
        <>
            <Modal size='sm' show={props.showModalDelete} onHide={props.handleCloseModalDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>You want to delete the user {props.user.email}? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleCloseModalDelete}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={props.handleDeleteUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;
