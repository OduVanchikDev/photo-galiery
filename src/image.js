import React, { useState } from 'react'

const Image = (props) => {


  const { tags, webformatURL, id, user } = props
  return (
    <>
      <div onClick={() => props.onClick()} className='item'>

        <div>
          <img src={webformatURL} alt={tags} key={id + 'qw'} className='inm-fluid' />
          <h5 key={id + '2ed'}>{user}</h5>
        </div>

      </div>

    </>
  )
}

export default Image
