import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { Navigation } from '../components/Navigation'
import { fetchOneVideoAction } from '../redux/actions/video/videoActions';
import { addComment, incrementLikes } from '../service/videoActivitiesService';
import { getOneVideo } from '../service/videoUploadService';
import { toast } from 'react-toastify';

export const WatchVideo = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false);
    const videoId = props.match.params.slug;
    const oneVideo = useSelector(state => state.fetchOneVideoReducer.data)
    const user = useSelector(state => state.user.data)
    const [data, setData] = useState({
        comment: '',
        by: user.displayName ? user.displayName : 'anonymous',
        createdAt: (new Date).toDateString()
    });

    function refresh() {
        setTimeout(function () {
            watchVideo(videoId)
        }, 1000);
    }

    // To increment likes
    const increment = async (val) => {
        await incrementLikes(videoId, val).then(() => {
            toast.success('Like added successfully')
            refresh()
        }).catch(() => {
            toast.error('An error occured')
        })
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setData((data) => ({ ...data, [name]: value }));
    }


    // To get one vidoe
    const watchVideo = async () => {
        getOneVideo(videoId).then((res) => {
            const data = res.docs.map(vid => vid.data());
            dispatch(fetchOneVideoAction(data[0]))
        }).catch((error) => {
            console.log(error.message)
        })

    };

    // To submit a comment
    const submitComment = async () => {
        setisLoading(true)
        await addComment(videoId, data).then(() => {
            setisLoading(false)
            toast.success('Comment added successfully')
            refresh()
        }).catch(() => {
            toast.error('An error occured')
        })
    }

    useEffect(() => {
        watchVideo(videoId)
    }, []);

    const base_url = 'https://you-box.web.app/' //Base url for our app
    const videoLink = base_url + props.location.pathname

    const copyVideoLink = () => {
        navigator.clipboard.writeText(videoLink);
        toast.success('Video linked copied successfully. You can now share with friends and family')
    };

    return (
        <div>
            <Navigation />
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <video controls className='one-video'>
                            <source src={oneVideo.video} type="video/mp4" />
                        </video>
                    </div>

                    <div className='col-lg-12 mb-3'>
                        <h4 className='d-inline'>{oneVideo.name}</h4>
                        <span className='ml-5 font-weight-bolder'>{oneVideo.likes} likes</span>
                        <span className='ml-5'><button onClick={() => increment(1)} className='btn btn-success'>Like this video</button></span>
                        <span className='ml-5'><button onClick={copyVideoLink} className='btn btn-primary'>Copy video link</button></span>
                    </div>
                    <div className='col-lg-12'>
                        <textarea onChange={handleChange} name='comment' value={data.comment} placeholder='Add a comment' rows='2' className='w-75' />
                        { }
                        <button className='btn btn-primary ml-5' onClick={submitComment}>
                            {isLoading === true ? <Loader /> : 'Submit Comment'}
                        </button>
                    </div>

                    <div className='col-lg-12'>
                        {oneVideo.comments && oneVideo.comments.length === 0 || oneVideo.comments === undefined ?
                            <div>
                                <p>No comments yet. Add a comment in the textbox above</p>
                            </div>
                            :
                            <div>
                                {oneVideo.comments && oneVideo.comments.map((comment, i) => {
                                    return (
                                        <div key={i} className='mb-3' style={{ borderBottom: '1px solid #ccc' }}>
                                            <p className='m-0 text-capitalize d-inline font-weight-bolder'>{comment.by}</p>
                                            <p className='d-inline ml-3 font-weight-bolder'>{comment.createdAt}</p>
                                            <p className='text-capitalize m-0'>{comment.comment}</p>
                                        </div>

                                    )
                                })

                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
