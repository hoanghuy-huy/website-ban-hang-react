import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import './AccountAction.scss';
import AuthForm from '../AuthForm';
import { useDispatch } from 'react-redux';
import { showLoginForm } from '~/redux/features/accountSlice';

const AccountActions = (props) => {

    const dispatch = useDispatch()

    return (
        <div className="action-user text-center">
            <div onClick={() => dispatch(showLoginForm())}>
                <FontAwesomeIcon className="icon user pe-1" icon={faUser} />
                <span title="account" className="d-none d-xxl-inline">
                    Account
                </span>
            </div>
            <AuthForm />
        </div>
    );
};

export default AccountActions;
