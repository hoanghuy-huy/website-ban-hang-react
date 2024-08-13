import React, { useState } from 'react';
import { forwardRef } from 'react';
import images from '~/assets/images';


const Image = forwardRef(({src, alt, ...props }, ref) => {
    const [fallBack, setFallBack] = useState(null)

    const handleError = () => {
        setFallBack(images.noImage)
    }

    return <img ref={ref}  style={{overflow: 'hidden'}} {...props} src={ fallBack || src} alt={alt} onError={handleError}/>;
});

export default Image;
