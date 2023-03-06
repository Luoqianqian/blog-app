import React, { useState } from 'react';
import '../styles/write.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../utils/axios';
import moment from 'moment';

export default function Writer() {
  const state = useLocation().state;
  const navigate = useNavigate();

  const [value, setValue] = useState('');
  const [cat, setCat] = useState('all');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/upload', formData);
      return res.data;
    } catch(err) {
      console.log(err);
    }
    
  }

  const handleClick = async () => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      state
      ? axios.put(`/posts/${state.id}`, {
        title,
        desc: value,
        cat,
        img: file? imgUrl : '',
      })
      : await axios.post(`/posts/`, {
        title,
        desc: value,
        cat,
        img: file? imgUrl : '',
        data: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      })
      navigate('/');
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className='write'>
      <div className='content'>
        <input 
          type='text'
          placeholder='Title'
          onChange={() => setTitle(e.target.value)}
        />
        <div className='editorContainer'>
          <ReactQuill 
            className='editor'
            theme="snow" 
            value={value} 
            onChange={setValue} 
          />
        </div>
        <div className='upload'>
          <input 
            id='file' 
            type='file' 
            style={{display: 'none'}} 
            onChange={() => setFile(e.target.fileS[0])}
          />
          <label htmlFor='file'> 上传图片 </label>
        </div>
      </div>
      <div className='menu'>
        <div className='buttons'>
          <button onClick={handleClick}>发布</button>
          <button>暂存草稿</button>
        </div>
        <div className='item'>
          <h1>分类</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "all"}
              name="cat"
              value="all"
              id="all"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="all">全部</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">艺术</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">科技</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">摄影</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "pet"}
              name="cat"
              value="pet"
              id="pet"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="pet">宠物</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">食物</label>
          </div>
        </div>
      </div>
    </div>
  )
}
