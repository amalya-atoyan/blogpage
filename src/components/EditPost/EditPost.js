import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import customAxios from "../../axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import { convertImageToBase64 } from "../../helpers/converters";
import './EditPost.css'

function EditPost() {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    customAxios.get(`posts/${id}`).then(({ data }) => {
      setCurrentPost(data);
    });
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const [{ value: title }, _, { value: body }] = formRef.current;

    await customAxios.patch(`posts/${id}`, {
      ...currentPost,
      title,
      body,
    });
    navigate("/myposts");
  };

  const changeImg = async (e) => {
    const img = await convertImageToBase64(e.target.files[0]);

    setCurrentPost({ ...currentPost, img });
  };

  return (
    <div className="addPostCont">
      <form onSubmit={handleSubmit} ref={formRef} className="form2">
          <input
            defaultValue={currentPost?.title}
            type="text"
            placeholder="title"
            className="titleInput"
          />
          {currentPost?.img && (
            <img src={currentPost?.img}  className="editImg" alt="editedImg"/>
          )}
          <input accept="image/*" onChange={changeImg} type="file" className="fileInput" />
          <textarea
            defaultValue={currentPost?.body}
            placeholder="body"
            cols="50"
            rows="15"
          ></textarea>
          <button className="saveBtn">Save Post</button>
      </form>
    </div>
  );
}

export default EditPost;
