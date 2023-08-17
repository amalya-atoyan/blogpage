import React, { useContext, useRef, useState } from "react";
import customAxios from "../../axios";
import "./AddPost.css";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import { convertImageToBase64 } from "../../helpers/converters";



function AddPost() {
  const currentUser = useContext(userContext);
  const [img, setImg] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const [{ value: title }, { value: body }] = formRef.current;

    if (title.trim() && body.trim() && img) {
      await customAxios.post(`/posts`, {
        title,
        img,
        body,
        userId: currentUser.id,
      });
      navigate("/");
    }

    formRef.current.reset();
  };

  const changeImg = async (e) => {
    const img = await convertImageToBase64(e.target.files[0]);

    setImg(img);
  };

  return (
    <div className="addPostContainer">
        <form onSubmit={handleSubmit} ref={formRef} className="form2">
            <input type="text" placeholder="title" className="titleInput"/>
            <textarea placeholder="body" cols="50" rows="15"></textarea>
            {img && <img src={img} className="addImg" alt="addedImg" />}
            <input accept="image/*" onChange={changeImg} type="file" />
            <button className="addBtn">Add Post</button>
          </form>
    </div>
  );
}

export default AddPost;
