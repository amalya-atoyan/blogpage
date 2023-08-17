import React, { useEffect, useState } from "react";
import customAxios from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
import "./AllPost.css";



function AllPost() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    customAxios
      .get("/posts")
      .then(({ data }) => {
        setPosts(data);
      })
  }, []);

  return (
    <div className="postContainer">
      {(
        posts.map((post) => (
          <div key={post.id} className="uniquePost">
            <img src={post.img} width={150} height={250} alt="postimg" className="postImg"/>
            <h2 className="postTitle">{post.title}</h2>
            <p className="postBody"> {post.body} </p>
          </div>
        ))
      )}
    </div>
  );
}

export default AllPost;

