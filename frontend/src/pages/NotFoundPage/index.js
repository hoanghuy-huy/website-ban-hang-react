import React from 'react'
import Button from '~/components/Button/Button'
import Image from '~/components/Image'

const NotFoundPage = () => {
  return (
    <div className='not-found-page' style={{ height: 380, backgroundColor: 'var(--white)'}} >
        <div className='container'>
            <div className='not-found-page-container' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20}}>
                <div className='img mt-4'>
                    <Image  style={{height: 200, width: 200}} src={'https://salt.tikicdn.com/ts/brickv2og/3c/7c/9b/1d101c4757843340d812828590283374.png'}/>
                </div>
                <div className='title'>
                    Trang của bạn tìm kiếm không tồn tại
                </div>
                <div>
                    <Button normal to='/'> Tiếp tục mua sắp</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotFoundPage