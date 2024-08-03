import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Fragment } from 'react';
import { Oval } from 'react-loader-spinner';
import { privateRoutes, publicRoutes } from './routes';
import { DefaultLayout } from '~/layouts';
import { PrivateRoute } from './routes/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css'
function App() {
    const user = true;

    return (
        <>

            {user.isLoading ? (
                <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ minHeight: '100vh' }}
                >
                    <Oval
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <div>Loading...</div>
                </div>
            ) : (
                <Router>
                    <div className="App">
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                let Page = route.component;
                                let Layout = DefaultLayout;

                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) Layout = Fragment;

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}

                            {privateRoutes.map((route, index) => {
                                let Page = route.component;
                                let Layout = DefaultLayout;

                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) Layout = Fragment;

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <PrivateRoute>
                                                    <Page />
                                                </PrivateRoute>
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </div>
                </Router>
            )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}

export default App;
