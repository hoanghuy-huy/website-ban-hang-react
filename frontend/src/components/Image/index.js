import React, { useState, forwardRef, useEffect } from 'react';
import images from '~/assets/images';

const Image = forwardRef(({ src, alt, onChange, ...props }, ref) => {
    const [fallBack, setFallBack] = useState(null);

    const handleError = () => {
        setFallBack(images.noImage);
    };

    useEffect(() => {
        setFallBack(null); 
    }, [src]);

    return (
        <img
            ref={ref}
            style={{ overflow: 'hidden' }}
            {...props}
            src={fallBack || src}
            alt={alt}
            onError={handleError}
            onLoad={onChange}
        />
    );
});


export default Image;