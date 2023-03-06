import React, { useState, useEffect, useContext } from 'react';
import '../styles/single.scss';
import Menu from '../components/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

export default function Single() {
 const [post, setPost] = useState({});
  const location = useLocation()
  const postId = location.pathname.split('/')[2];
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post.id}`);
      navigate('/');
    }catch(err) {
      console.log(err)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        console.log(res);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);
  return (
    <div className='single'>
      <div className='content'>
        <img src={post.img} alt='pic' />
        <div className='user'>
            <img src={post.img} alt='my' />
            <div className='info'>
              <span>{post.username}</span>
              <p>{moment(post.date).fromNow()}</p>
            </div>
            {currentUser.username === post.username &&
            <div className='edit'>
              <Link to='/write' state={post}>
                <img src='../assets/images/edit.png' alt='write' />
              </Link>
              <img src='../assets/images/delete.png' alt='delete' onClick={handleDelete} />
            </div>}
        </div>
        <h1 className='title'>{post.title}</h1>
        <p>{post.desc}<br/>{post.desc}<br/>{post.desc}<br/>{post.desc}</p>
      </div>
      <Menu cat={post.cat} />
    </div>
  )
}
