import React, { useEffect, useState } from 'react';
import { apiDeleteUser, apiGetAllUser } from '~/services/userService';
import ReactPaginate from 'react-paginate';
import Button from 'react-bootstrap/Button';
import ModalUserDelete from './ModalDelete';
import ModalUser from './ModalUser';
import { toast } from 'react-toastify';


const MangerUsersPage = () => {
    const [listUsers, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line
    const [currentLimit, setCurrentLimit] = useState(2);
    const [totalPages, setTotalPages] = useState(0);
    const [showModalDelete, setShowDeleteModal] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [showCreateUserModal, setShow] = useState(false);
    const [modalActions, setModalActions] = useState('');


    const handleCloseCreateUserModal = () => {
        setModalActions('')
        setShow(false);
    };

    const handleShow = () => {
        setModalActions('')
        setShow(true);
    };

    const handleCloseModalDelete = () => {
        setDataModal({});
        setShowDeleteModal(false);
    };

    const handleShowModalDelete = (user) => {
        setDataModal(user);
        setShowDeleteModal(true);
    };

    const handleDeleteUser = async () => {
        setShowDeleteModal(false);
        const res = await apiDeleteUser(dataModal.id);

        if (res && res.EC === 0) {
            toast.success(res.EM);
            fetchDataUser();
        } else {
            toast.error(res.EM);
        }
    };
    
    
    useEffect(() => {
        fetchDataUser();
        setDataModal({})
        // eslint-disable-next-line
    }, [currentPage]);

    const fetchDataUser = async (page) => {
        const response = await apiGetAllUser(currentPage, currentLimit);

        if (response && response.EC === 0) {
            setListUsers(response.DT.users);
            setTotalPages(response.DT.totalPages);
        }
    };
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleEditModal = (user) => {
        setModalActions('EDIT');
        setShow(true);
        setDataModal(user)
    };
    
    return (
        <div className="container">
            <div className="user-header">
                <h3>Table Users</h3>
            </div>
            <div className="user-container">
                <Button variant="success" onClick={() => handleShow()}>
                    Create New User
                </Button>
                <ModalUser
                    title={modalActions === 'EDIT' ? 'Edit User' : 'Create New User'}
                    show={showCreateUserModal}
                    handleClose={handleCloseCreateUserModal}
                    actions={modalActions}
                    user={dataModal}
                    fetchDataUser={fetchDataUser}
                />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers.length > 0 ? (
                            <>
                                {listUsers.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.email}</td>
                                        <td>{item.Group ? item.Group.name : ''}</td>
                                        <td>
                                            <Button variant="warning" onClick={() => handleEditModal(item)}>
                                                Edit
                                            </Button>{' '}
                                            <Button variant="danger" onClick={() => handleShowModalDelete(item)}>
                                                Delete
                                            </Button>
                                            <ModalUserDelete
                                                handleCloseModalDelete={handleCloseModalDelete}
                                                showModalDelete={showModalDelete}
                                                user={dataModal}
                                                handleDeleteUser={handleDeleteUser}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </>
                        ) : (
                            <tr>
                                <td>user not found</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="user-footer">
                <>
                    {totalPages > 0 && (
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={totalPages}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    )}
                </>
            </div>
        </div>
    );
};

export default MangerUsersPage;
