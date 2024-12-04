import Register from '~/components/Register';
import Login from '~/components/Login';
import MangerUsersPage from '~/components/MangerUsers';
import RoleUser from '~/components/RoleUser';
// Pages
import Home from '~/pages/Home';
import ProductPage from '~/pages/ProductPage';
import DetailProductPage from '~/pages/DetailProductPage';

//import layout
import {
    LayoutAccount,
    LayoutCategoryProduct,
    LayoutCheckout,
    LayoutClientNoSidebar,
    LayoutNoHeader,
    LayoutSearchProduct,
    MainLayout,
} from '~/layouts';

//import config routes
import routes from '~/config/routes';
import GroupRole from '~/components/GroupRole';
import ProductPageChild from '~/pages/ProductPageChild';
import CartPage from '~/pages/CartPage';
import NotFoundPage from '~/pages/NotFoundPage';
import PaymentPage from '~/pages/PaymentPage';
import AddressPage from '~/pages/AddressPage';
import PaymentSuccessPage from '~/pages/PaymentSuccessPage';
import AccountPage from '~/pages/OrderDetailPage';
import OrderPage from '~/pages/OrderPage';
import OrderDetailPage from '~/pages/OrderDetailPage';
import OrderPageAdmin from '~/pages/OrderPageAdmin';
import AdminLayout from '~/layouts/AdminLayout';
import DashBoardPage from '~/pages/DashBoardPage';
import ProductAdminPage from '~/pages/ProductAdminPage/index.';
import ImportProductPage from '~/pages/ImportProductPage';
import ReturnOrderPage from '~/pages/ReturnOrderPage';
import SearchPage from '~/pages/SearchPage';
import PageTest from '~/pages/PageTest';
import InfoUserPage from '~/pages/InforUserPage';
import EditPhonePage from '~/pages/EditPhonePage';
import EditEmailPage from '~/pages/EditEmailPage';
import EditPasswordPage from '~/pages/EditPasswordPage';
import UserAddressPage from '~/pages/UserAddressPage';
import ReviewPage from '~/pages/ReviewPage';
import ReturnOrderPageAdmin from '~/pages/ReturnOrderPageAdmin';
import ChatBox from '~/pages/ChatBox';
import AdminChat from '~/pages/AdminChat';

//Public Routes
const publicRoutes = [
    { path: '/chat-admin', component: AdminChat, layout: null },
    { path: '/chat', component: ChatBox, layout: null },
    { path: '/search', component: SearchPage, layout: LayoutSearchProduct },
    { path: routes.home, component: Home, layout: MainLayout },
    { path: routes.product, component: ProductPage, layout: LayoutCategoryProduct },
    { path: routes.productChild, component: ProductPageChild, layout: MainLayout },
    { path: routes.detailProduct, component: DetailProductPage, layout: LayoutClientNoSidebar },
    { path: routes.register, component: Register, layout: LayoutNoHeader },
    { path: routes.login, component: Login, layout: LayoutNoHeader },
    { path: '/test', component: PageTest, layout: LayoutNoHeader },
    { path: '*', component: NotFoundPage, layout: LayoutClientNoSidebar },
];

const privateRoutes = [
    // { path: '/admin/product', component: ProductAdminPage, layout: AdminLayout },
    // { path: '/admin/dash-board', component: DashBoardPage, layout: AdminLayout },
    // { path: routes.user, component: MangerUsersPage, layout: AdminLayout },
    // { path: routes.role, component: RoleUser, layout: AdminLayout },
    // { path: routes.groupRole, component: GroupRole, layout: AdminLayout },
    // { path: '/admin/order', component: OrderPageAdmin, layout: AdminLayout },
    { path: '/account/review-product', component: ReviewPage, layout: LayoutAccount },
    { path: '/import-product', component: ImportProductPage, layout: LayoutAccount },
    { path: '/account/address', component: UserAddressPage, layout: LayoutAccount },
    { path: '/account/info/edit-password', component: EditPasswordPage, layout: LayoutAccount },
    { path: '/account/info/edit-email', component: EditEmailPage, layout: LayoutAccount },
    { path: '/account/info/edit-phone', component: EditPhonePage, layout: LayoutAccount },
    { path: '/account/info', component: InfoUserPage, layout: LayoutAccount },
    { path: '/account/order', component: OrderPage, layout: LayoutAccount },
    { path: '/account/order/order-detail/:orderId', component: OrderDetailPage, layout: LayoutAccount },
    { path: '/account/return-order', component: ReturnOrderPage, layout: LayoutAccount },
    { path: '/payment/success', component: PaymentSuccessPage, layout: LayoutCheckout },
    { path: routes.addressPage, component: AddressPage, layout: LayoutCheckout },
    { path: routes.paymentPage, component: PaymentPage, layout: LayoutCheckout },
    { path: routes.cartPage, component: CartPage, layout: LayoutClientNoSidebar },
];

const adminRoutes = [
    { path: '/admin/return-order', component: ReturnOrderPageAdmin, layout: AdminLayout },
    { path: '/admin/product', component: ProductAdminPage, layout: AdminLayout },
    { path: '/admin/dash-board', component: DashBoardPage, layout: AdminLayout },
    { path: '/admin/order', component: OrderPageAdmin, layout: AdminLayout },
    { path: routes.user, component: MangerUsersPage, layout: AdminLayout },
    { path: routes.role, component: RoleUser, layout: AdminLayout },
    { path: routes.groupRole, component: GroupRole, layout: AdminLayout },
];
export { publicRoutes, privateRoutes, adminRoutes };
