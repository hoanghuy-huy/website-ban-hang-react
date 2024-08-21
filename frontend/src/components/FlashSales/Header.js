import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './FlashSales.scss';

const cx = classNames.bind(styles);

function Header({ startTime, endTime }) {
    const [hoursOfTen, setHoursOfTen] = useState();
    const [minutesOfTen, setMinutesOfTen] = useState();
    const [secondsOfTen, setSecondsOfTen] = useState();
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();

    useEffect(() => {
        const interval = setInterval(() => {
            let currentTime = new Date().getTime();
            let leftTime = endTime - currentTime;

            if (leftTime > 0) {
                let hours = Math.floor(leftTime / (1000 * 60 * 60));
                let minutes = Math.floor((leftTime / (1000 * 60)) % 60);
                let seconds = Math.floor((leftTime / 1000) % 60);

                let formattedHours = hours.toString().padStart(2, '0');
                let formattedMinutes = minutes.toString().padStart(2, '0');
                let formattedSeconds = seconds.toString().padStart(2, '0');

                setHours(formattedHours % 10);
                setMinutes(formattedMinutes % 10);
                setSeconds(formattedSeconds % 10);
                setHoursOfTen(Math.floor(formattedHours / 10));
                setMinutesOfTen(Math.floor(formattedMinutes / 10));
                setSecondsOfTen(Math.floor(formattedSeconds / 10));
            } else {
                setHours(0);
                setMinutes(0);
                setSeconds(0);
                setHoursOfTen(0);
                setMinutesOfTen(0);
                setSecondsOfTen(0);
                return () => clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [seconds]);

    return (
        <div className={cx('flash-sales-header')}>
            <div className={cx('flash-sales-header-content')}>
                <div className='d-flex'>
                    <span className={cx("title")}>Flash Sale</span>
                    <div className={cx("timer")}>
                        <strong> {hoursOfTen} </strong>
                        <strong> {hours} </strong>
                        <span> : </span>
                        <strong> {minutesOfTen} </strong>
                        <strong> {minutes} </strong>
                        <span> : </span>
                        <strong> {secondsOfTen} </strong>
                        <strong> {seconds} </strong>
                    </div>
                </div>
                <div className={cx('see-more')}>
                    Xem tất cả
                </div>
            </div>
        </div>
    );
}

export default Header;
