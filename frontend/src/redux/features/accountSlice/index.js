import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import httpRequest from '~/utils/httpRequest';

export const fetchDataAccount = createAsyncThunk('account/fetchDataAccount', async () => {
    const res = await httpRequest.get('account');
    let data = {};
    if (res && res.DT) {
        data.auth = localStorage.getItem('auth')
    }
    return data;
});

export const loginAccount = createAsyncThunk('account/loginAccount', async ({ valueLogin, password }) => {
    const res = await httpRequest.post('login', { valueLogin, password });
    if (res && res.EC === 0) {
        let email = res.DT.email
        let username = res.DT.username
        let userId = res.DT.userId
        // let roles = res.DT.groupWithRoleUser.Roles
        // let userGroup = res.DT.userGroup
        localStorage.setItem('auth', 'true')
        localStorage.setItem('token', res.DT.token)
        toast.success('Đăng nhập thành công');
        return res ? res.DT : [];
    } else {
        toast.error('Sai tài khoản hoặc mật khẩu');
        return;
    }
});

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        showLogin: false,
        loading: false,
        auth: false,
        error: false,
        navigate: false,
        account: {},
    },
    reducers: {
        showLoginForm: (state, action) => {
            if (!state.auth) {
                state.showLogin = !state.showLogin;
                if (action.payload === 'cart') {
                    state.navigate = true;
                } else {
                    state.navigate = false;
                }
            } else {
                return;
            }
        },
        logoutAccount: (state, action) => {
            state.auth = false
            state.account = {}
            localStorage.clear()
            window.location.reload(true)
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchDataAccount.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchDataAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.auth = action.payload.auth
            })
            .addCase(fetchDataAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            // login
            .addCase(loginAccount.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(loginAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                if (action.payload) {
                    state.account = action.payload;
                    state.auth = true;
                    state.showLogin = false;
                    if (state.navigate) {
                        window.location.href = '/cart/:123';
                    }
                }
            })
            .addCase(loginAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const { showLoginForm, logoutAccount } = accountSlice.actions;
export default accountSlice.reducer;
