import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteMultipleProductFormCart,
    handleCloseModalDelete,
    removeOneProductFromCart,
} from '~/redux/features/cartSlice';
import { toast } from 'react-toastify';
function ModalDeleteItem() {
    const { showModalDelete, itemsToRemove } = useSelector((state) => state.cart);
    const { userId } = useSelector((state) => state.account.account);

    const handleOnClickDeleteItemFromCart = () => {
        let isNumber = typeof itemsToRemove === 'number';

        if (isNumber) {
            dispatch(removeOneProductFromCart({ cartId: itemsToRemove, userId: userId }));
        }else {
            dispatch(deleteMultipleProductFormCart({itemsToDelete: itemsToRemove,userId: userId}))
        }
    };

    const dispatch = useDispatch();
    return (
        <Modal
            size="sm"
            className="d-flex align-items-center"
            show={showModalDelete}
            onHide={() => dispatch(handleCloseModalDelete())}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <FontAwesomeIcon icon={faTriangleExclamation} className="me-2 text-warning" />
                    Xóa sản phẩm
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có muốn xóa sản phẩm đang chọn không ?</Modal.Body>
            <Modal.Footer>
                <div>
                    <Button outline onClick={() => handleOnClickDeleteItemFromCart()}>
                        Xác nhận
                    </Button>
                </div>
                <div>
                    <Button normal onClick={() => dispatch(handleCloseModalDelete())}>
                        Hủy
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteItem;
