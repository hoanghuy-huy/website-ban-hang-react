// import React, { useEffect } from 'react';
// import Menu from './Menu';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faList } from '@fortawesome/free-solid-svg-icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllCategories } from '~/redux/features/categorySlice/categorySlice';
// import './Sidebar.scss';

// const Sidebar = () => {
//     const dispatch = useDispatch();

//     const data = useSelector((state) => state.categories.categoryList);

//     useEffect(() => {
//         dispatch(fetchAllCategories());
//         // eslint-disable-next-line
//     }, []);
//     return (
//         <aside className="side-bar">
//             <div className="category-heading pb-2">
//                 <FontAwesomeIcon icon={faList} className="px-2" />
//                 Danh Mục
//             </div>
//             <div className="category-body px-2">
//                 {data && data.length > 0 &&
//                     data.map((item, index) => {
//                         return <Menu item={item} key={index} />;
//                     })}
//             </div>
//         </aside>
//     );
// };

// export default Sidebar;

import React from 'react';
import './Sidebar.scss';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <div className="title">Danh Mục</div>
            <div>
                <div className="category-container">
                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>
                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>                    <Link>
                        <div className="d-flex gap-3 category__item">
                           <div className='category__img'>
                                <Image
                                    src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                    height={32}
                                    width={32}
                                />
                           </div>
                            <div className="category__name">Nhà Sách Tiki</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
