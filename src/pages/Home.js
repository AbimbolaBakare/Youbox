import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import { getAllVideos } from '../service/videoUploadService';

export const Home = () => {
  const [videoList, setVideoList] = useState([]);

// To get all uploaded vidoes
  async function getVideos() {
    const newDoc = await getAllVideos();
    const mappedData = newDoc.docs.map(doc => doc.data());
    setVideoList(mappedData)
  }

  useEffect(() => {
    getVideos()
  }, []);

  return (

    < >
      <Navigation />

      <section className="hero hero-bg d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">

            <div className="col-lg-6 col-md-10 col-12 d-flex flex-column justify-content-center align-items-center">
              <div className="hero-text">

                <h1 className="text-dark" data-aos="fade-up">YOUBOX</h1>

                <h5 data-aos="fade-up" data-aos-delay="100">Giving youtube a run for their money 😜</h5>
                <img src='/images/googleplay.png' alt='google' className='img-fluid' width='200'/>
                <img src='/images/app-store.png' alt='google' className='img-fluid' width='200'/>
              </div>
            </div>

            <div className="col-lg-6 col-12">
              <div className="hero-image" data-aos="fade-up" data-aos-delay="300">

                <img src="images/banner.svg" className="img-fluid" alt="video streaming" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='container mt-5'>
        <h1 className='text-center mt-5 mb-5'>LATEST VIDEOS</h1>
        <div className='row mt-3 mb-4'>
          {videoList.map((vid, i) => {
            return (
              <Link to={`watch/${vid.id}`} className='col-lg-4 text-center mb-5' key={i}>

                <video src={vid.video} preload="metadata" className='video'>
                  <source src={vid.video} type="video/mp4" />
                </video>

                <div className='p-2 pl-4 text-left video-description'>
                  <p className='d-inline video-title'>{vid.name}</p>
                  <p className='m-0'>{vid.createAt}</p>
                  <p>{vid.likes} likes</p>
                </div>

              </Link>
            )
          })

          }

        </div>
      </div>
<Footer/>
    </>
  )
};
