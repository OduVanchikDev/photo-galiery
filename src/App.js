import React, { useState, useEffect } from 'react';
import API from './api';
import InfiniteScroll from 'react-infinite-scroller';
import Masonry from 'react-masonry-css';
import Image from './image'
import vector from './img/search-outline.svg';
import Popup from './popup'

let pageNum = 4;

function App() {
  const [imagesArrey, setImagesArrey] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [photoSerchValue, setPhotoSerchValue] = useState('')
  const [popup, setPopup] = useState(false)
  const [fullImg, setFullImg] = useState({})

  const fetchImages = (pageNumber) => {
    API.get('/', { params: { page: pageNumber } })
      .then((res) => {
        setImagesArrey([...imagesArrey, ...res.data.hits])
        setTotalPages(res.data.totalHits / res.data.hits.length)
      })
      .catch((err) => console.log(err))
  }
  const fetchImagesSerch = (photoSerchValue) => {

    API.get('/', { params: { q: photoSerchValue } })
      .then((res) => {
        setImagesArrey([...res.data.hits])
        setTotalPages(res.data.totalHits / res.data.hits.length)
      })
      .catch((err) => console.log(err))
  }

  function handeleFotoSerch(e) {
    setPhotoSerchValue(e.target.value)
  }

  useEffect(() => {
    fetchImages(pageNum)
  }, [])
  const pointsMasonry = {
    default: 3,
    1200: 3,
    992: 3,
    768: 2,
    576: 1,
  }
  return (
    <>
      <div className="App">
        <section className='header'>
          <h2 className='photo-gallery'>PhotoGalery</h2>
          <from>
            <input type='text' className='input' value={photoSerchValue} placeholder='serch foto'
              onChange={handeleFotoSerch} />
            <img className='serch' src={vector} onClick={() => fetchImagesSerch(photoSerchValue)} />
          </from>
        </section>

        <div className='gallery'>
          <InfiniteScroll
            pageStart={0}
            loadMore={() => fetchImages(pageNum++)}
            hasMore={pageNum < totalPages ? true : false}
          >
            <Masonry
              breakpointCols={pointsMasonry}
              className='my-masonry-grid'
              columnClassName='my-masonry-grid_column'

            >
              {imagesArrey.map((image) => (
                <>
                  <Image onClick={() => { setPopup(!popup); setFullImg(image) }} key={image.userImageURL} {...image} />
                </>

              ))}
            </Masonry>
          </InfiniteScroll>

        </div>
      </div>
      {popup && <Popup {...fullImg} />}
    </>
  );
}

export default App;
