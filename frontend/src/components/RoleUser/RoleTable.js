import React, { forwardRef, useImperativeHandle } from 'react';
import { useEffect, useState } from 'react';
import { apiDeleteRole, apiGetAllRole } from '~/services/roleService';
import { toast } from 'react-toastify';

const RoleTable = (props, ref) => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useImperativeHandle(ref, () => ({
        fetchData: fetchData,
    }));

    const fetchData = async () => {
        const res = await apiGetAllRole();

        if (res && res.EC === 0) {
            setRoles(res.DT);
        } else {
            toast(res.EM);
        }
    };

    const handleDeleteRole = async (role) => {
        const res = await apiDeleteRole(role.id);

        if (res && res.EC === 0) {
            toast.success(res.EM);
            fetchData();
        } else {
            toast.error(res.EM);
        }
    };
    return (
        <div>
            <h4>{props.title}</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Url</th>
                        <th scope="col">Description</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((item) => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.url}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => handleDeleteRole(item)} className="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default forwardRef(RoleTable);
