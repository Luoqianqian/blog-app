import { Link, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import '../styles/home.scss';
import { AuthContext } from "../context/authContext";
import axios from "../utils/axios";


const Home =() => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
      <div className="home">
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={post.img} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                {/* <p>{getText(post.desc)}</p> */}
                <p className="desc">{post.desc}</p>
                <button className="more">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Home;
