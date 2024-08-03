import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './ImageSlider.scss';

const slides = [
    {
        src: 'https://salt.tikicdn.com/ts/tka/ef/67/6d/729b2d566ddc7d36dcb575192a56bc5f.png',
        alt: 'Image 1 for slides',
    },
    {
        src: 'https://cdn.hoanghamobile.com/i/home/Uploads/2024/05/17/galaxy-s24-ultra-wweb.jpg',
        alt: 'Image 2 for slides',
    },
    {
        src: 'https://cdn.hoanghamobile.com/i/home/Uploads/2024/05/27/web-banner-14-ultra.jpg',
        alt: 'Image 3 for slides',
    },
];

const ImageSlider = ({ data, props }) => {
    const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="custom-arrow custom-prev-arrow" onClick={onClick}>
                <FontAwesomeIcon icon={faChevronLeft} className="arrow arrow-left" />
            </div>
        );
    };

    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="custom-arrow custom-next-arrow" onClick={onClick}>
                <FontAwesomeIcon icon={faChevronRight} className="arrow arrow-right" />
            </div>
        );
    };

    const settings = {
        // dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        style: {
            
        }
    };

    return (
        <section className='container-slider'>
            <div> 
                <Slider {...settings}>
                    {slides.map((item, index) => (
                        <img src={item.src} key={index} alt={item.alt} />
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default ImageSlider;
