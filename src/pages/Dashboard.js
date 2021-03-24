import { CloudinaryContext } from 'cloudinary-react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { history } from '../redux/store/history';
import { openUploadWidget } from '../service/cloudinary/cloudinaryService';
import { getUserVideos, uploadVideo } from '../service/videoUploadService';
import { toast } from 'react-toastify';
import { fetchUserVideoAction } from '../redux/actions/video/videoActions';
import { Footer } from '../components/Footer';

export const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.data)
    const [video, setVideo] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [vidName, setVidName] = useState('');
    const [fileName, setFileName] = useState('');
    const videoList = useSelector(state => state.fetchUserVideoReducer.userVideo)

    const form = {
        video: video,
        thumbnail: thumbnail,
        likes: 0,
        name: vidName,
        user_id: user.uid,
        createAt: (new Date).toDateString(),
        id: `${Math.floor(Math.random() * 900000000000000000)}`,
        createdBy: user.displayName,
        comments: []
    };

    // For cloudinary upload
    const beginUpload = tag => {
        const uploadOptions = {
            cloudName: "dnzomfhtt",
            tags: [tag],
            uploadPreset: "Upload"
        };

        openUploadWidget(uploadOptions, (error, photos) => {
            if (!error) {
                if (photos.event === 'success') {
                    setVideo(photos.info.secure_url)
                    setThumbnail(photos.info.thumbnail_url)
                    setFileName(photos.info.original_filename)
                }
            } else {
                console.log(error);
            }
        })
    };

    // To submit an uploaded video
    function submit() {
        if (video && thumbnail && vidName) {
            uploadVideo(form).then(() => {
                toast.success('Video uploaded successfully')
                setVidName('')
                setThumbnail('')
                setFileName('')
                getVideos()
            })

        }
    };

    // To get a list of a logged in user's video
    async function getVideos() {
        if (user.length === 0) {
            history.push('/')
            toast.error('You need to log in first. Click on the google button on the nav bar to proceed')
        } else {
            const newDoc = await getUserVideos(user);
            const mappedData = newDoc.docs.map(doc => doc.data());
            dispatch(fetchUserVideoAction(mappedData))
        }

    }

    useEffect(() => {
        getVideos()
    }, []);

    return (
        <CloudinaryContext cloudName='dnzomfhtt'>
            <Navigation />

            {/* LATEST VIDEOS */}

            <section className="pb-0" >
                {videoList.length === 0 ?
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-lg-7 mx-auto col-md-10 col-12">
                                <div data-aos="fade-up" data-aos-delay="200" className='mt-5'>
                                    <img src="images/empty2.svg" className="img-fluid" alt="empty state" />
                                    <h5 className='text-center mt-3'>You have not uploaded any video yet. Click on the button below to begin</h5>
                                </div>
                                <div className='text-center'>
                                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                                        Upload video
                                        </button>

                                    {/* MODAL TO UPLOAD A VIDEO FOR A FIRST TIMER */}
                                    <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLongTitle">Upload a video to YouBox</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="form-group">
                                                        <label>Video name</label>
                                                        <input type="text" className="form-control" placeholder="Enter your video name" name='vidName'
                                                            value={vidName} onChange={(e) => setVidName(e.target.value)} />
                                                    </div>
                                                    <div >
                                                        <button className='btn btn-secondary btn-lg btn-block' onClick={() => beginUpload()}>Click to select a video to upload</button>
                                                        {fileName && thumbnail ?
                                                            <div className='d-block mt-5'>
                                                                <img src={thumbnail} alt='thumbnail' />
                                                                <p>{fileName}</p>
                                                            </div>
                                                            :
                                                            ''
                                                        }

                                                    </div>
                                                    <small>Maximum fil upload size is 10MB</small>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary" onClick={submit}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* MODAL TO UPLOAD A VIDEO FOR A FIRST TIMER */}
                                </div>
                            </div>

                        </div>
                    </div>
                    :
                    <div className='container'>
                        <h1 className='text-center mt-5 mb-5'>MY VIDEOS</h1>
                        <div className='text-right'>
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                                Upload new video
                                        </button>

                            {/* MODAL TO UPLOAD SUBSEQUENT VIDEOS */}
                            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Upload a video to YouBox</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label>Video name</label>
                                                <input type="text" className="form-control" placeholder="Enter your video name" name='vidName'
                                                    value={vidName} onChange={(e) => setVidName(e.target.value)} />
                                            </div>
                                            <div >
                                                <button className='btn btn-secondary btn-lg btn-block' onClick={() => beginUpload()}>Click to select a video to upload</button>
                                                {fileName && thumbnail ?
                                                    <div className='d-block mt-5'>
                                                        <img src={thumbnail} alt='thumbnail' />
                                                        <p>{fileName}</p>
                                                    </div>
                                                    :
                                                    ''
                                                }
                                            </div>
                                            <small>Maximum file upload size is 10MB</small>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" onClick={submit}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* MODAL TO UPLOAD SUBSEQUENT VIDEOS */}
                        </div>

                        {/* VIDEO LIST */}

                        <div className='row mt-3 mb-4'>
                            {videoList.map((vid, i) => {
                                return (
                                    <Link to={`watch/${vid.id}`} style={{ cursor: 'pointer' }} className='col-lg-4 text-center mb-5' key={i}>

                                        <video preload="metdata" className='video'>
                                            <source src={vid.video} type="video/mp4" />
                                        </video>

                                        <div className='p-2 pl-4 text-left video-description'>
                                            <p className='d-inline video-title'>{vid.name}</p> <i className="fa fa-thumbs-up text-secondary text-right" aria-hidden="true"></i>
                                            <p className='m-0'> {user.displayName}</p>
                                            <p className='m-0'>{user.createAt}</p>
                                            <p>{vid.likes} likes</p>
                                        </div>

                                    </Link>
                                )
                            })}

                        </div>
                        {/* VIDEO LIST */}
                    </div>

                }

            </section>
            <Footer/>
        </CloudinaryContext>
    )
}
