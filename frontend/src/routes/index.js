import Register from '~/components/Register';
import Login from '~/components/Login';
import MangerUsersPage from '~/components/MangerUsers';
import RoleUser from '~/components/RoleUser';
// Pages
import Home from '~/pages/Home';
import ProductPage from '~/pages/ProductPage';
import DetailProductPage from '~/pages/DetailProductPage';

//import layout
import { LayoutClient, LayoutClientNoSidebar, LayoutNoHeader } from '~/layouts';

//import config routes
import routes from '~/config/routes';
import GroupRole from '~/components/GroupRole';
import ProductPageChild from '~/pages/ProductPageChild';

//Public Routes
const publicRoutes = [
    { path: routes.home, component: Home, layout: LayoutClient },
    { path: routes.product, component: ProductPage, layout: LayoutClient },
    { path: routes.productChild, component: ProductPageChild, layout: LayoutClient },
    { path: routes.detailProduct, component: DetailProductPage, layout: LayoutClientNoSidebar },
    { path: routes.register, component: Register, layout: LayoutNoHeader },
    { path: routes.login, component: Login, layout: LayoutNoHeader },
];

const privateRoutes = [
    { path: routes.user, component: MangerUsersPage },
    { path: routes.role, component: RoleUser },
    { path: routes.groupRole, component: GroupRole },
];

export { publicRoutes, privateRoutes };
