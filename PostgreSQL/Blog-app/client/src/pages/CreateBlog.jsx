import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
  const [value, setValue] = React.useState("");
  return (
    <div>
      <h1>Create Blog</h1>
      <form>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="content">Content:</label>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" name="author" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
