import React from 'react';
import '../Home.scss';
import Image from '~/components/Image';
const BoothOffer = () => {
    return (
        <section className="Banner-Offer">
            <div className="title">
                Gian hàng ưu đãi
            </div>
            <div className="box-banner">
                <div className="box-banner-item">
                    <Image src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/18/92/1892d8bcc35b55e2c3f65a162f588377.jpg" />
                </div>
                <div className="box-banner-item">
                    <Image src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/18/92/1892d8bcc35b55e2c3f65a162f588377.jpg" />
                </div>
                <div className="box-banner-item">
                    <Image src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/18/92/1892d8bcc35b55e2c3f65a162f588377.jpg" />
                </div>
                <div className="box-banner-item">
                    <Image src="https://cdnv2.tgdd.vn/mwg-static/dmx/Banner/18/92/1892d8bcc35b55e2c3f65a162f588377.jpg" />
                </div>
            </div>
        </section>
    );
};

export default BoothOffer;
