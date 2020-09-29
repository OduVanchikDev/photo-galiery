import React, { useState } from 'react'

function imgName(str) {
  let getNameArray = str.split('/')
  let name = getNameArray[getNameArray.length - 1];
  return [...name].slice(0, -4).join('')
}

export default function Popup(props) {

  const [popup, setPopup] = useState(true)
  const { largeImageURL, user, downloads } = props

  return (
    <>
      <section className={popup ? 'popup-body' : 'popup-body disabled'} onClick={() => setPopup(!popup)}>
        <div className='popup' >
          <img src={largeImageURL} />
          <div className='popup-menu'>
            <p>photografer: {user}</p>
            <p>downloads: {downloads}</p>
            <a href={largeImageURL} type="application/octet-stream" download={imgName(largeImageURL)}>add</a>
          </div>
        </div>

      </section>
    </>
  )
}
