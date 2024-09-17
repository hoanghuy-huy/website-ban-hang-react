import Register from '~/components/Register';
import Login from '~/components/Login';
import MangerUsersPage from '~/components/MangerUsers';
import RoleUser from '~/components/RoleUser';
// Pages
import Home from '~/pages/Home';
import ProductPage from '~/pages/ProductPage';
import DetailProductPage from '~/pages/DetailProductPage';

//import layout
import { LayoutCategoryProduct , LayoutCheckout, LayoutClientNoSidebar, LayoutNoHeader, MainLayout } from '~/layouts';

//import config routes
import routes from '~/config/routes';
import GroupRole from '~/components/GroupRole';
import ProductPageChild from '~/pages/ProductPageChild';
import CartPage from '~/pages/CartPage';
import NotFoundPage from '~/pages/NotFoundPage';
import PaymentPage from '~/pages/PaymentPage';
import AddressPage from '~/pages/AddressPage';


//Public Routes
const publicRoutes = [
    { path: routes.home, component: Home, layout: MainLayout },
    { path: routes.product, component: ProductPage, layout: LayoutCategoryProduct },
    { path: routes.productChild, component: ProductPageChild, layout: MainLayout },
    { path: routes.detailProduct, component: DetailProductPage, layout: LayoutClientNoSidebar },
    { path: routes.register, component: Register, layout: LayoutNoHeader },
    { path: routes.login, component: Login, layout: LayoutNoHeader },
    { path: '*', component: NotFoundPage, layout: LayoutClientNoSidebar },
];

const privateRoutes = [
    { path: routes.addressPage, component: AddressPage, layout: LayoutCheckout },
    { path: routes.paymentPage, component: PaymentPage, layout: LayoutCheckout },
    { path: routes.cartPage, component: CartPage, layout: LayoutClientNoSidebar },
    { path: routes.user, component: MangerUsersPage },
    { path: routes.role, component: RoleUser },
    { path: routes.groupRole, component: GroupRole },
];

export { publicRoutes, privateRoutes };
