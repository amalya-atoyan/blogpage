import React, { useContext, useEffect, useState } from "react";
import customAxios from "../../axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import './MyPosts.css'

function MyPosts() {
  const currentUser = useContext(userContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    customAxios
      .get(`/posts?userId=${currentUser?.id}`)
      .then(({ data }) => {
        setPosts(data);
      })
  }, []);


  const delItem = async (id) => {
      try {
        await customAxios.delete(`/posts/${id}`);

        setPosts([...posts.filter((post) => post.id !== id)]);
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div className="myPostsDiv">
        {(
          posts.map((post) => (
            <div key={post.id} className="eachPost">
                <img src={post.img} className="myPostsImage" alt="myPostImg"/>
                <h1 className="postsTitle">{post.title}</h1>
                <p className="myPostsBody"> {post.body} </p>
                <button onClick={() => delItem(post.id)} className="btn">Delete</button>
                <button onClick={() => navigate(`edit/${post.id}`)} className="btn">Edit</button>
            </div>
          ))
        )}
    </div>
  );
}

export default MyPosts;
