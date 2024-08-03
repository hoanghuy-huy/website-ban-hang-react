import { useEffect, useState } from 'react'


const useDebounce = (valueInput, delay) => {
    const [value,setValue] = useState(valueInput)

    useEffect(() => {
        const timer  = setTimeout(() => {
            setValue(valueInput)
        }, delay);

        return () => clearTimeout(timer)
        // eslint-disable-next-line
    },[valueInput])
    
    return value;
}

export default useDebounce