import React from 'react'
import Navbar from '../components/navbar'
import { fetchBlogs2 } from '../apiView';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ScrollProgress from '../components/scrollProgress';

const blogView = () => {

  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      const data = await fetchBlogs2(id);
      setBlog(data);
    };
    getBlog();
  }, [id]);

  const [progress, setProgress] = useState(0);

  const handleScroll = (e) => {
    const element = e.target;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    setProgress(scrolled);
  };

if(!blog){
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
     <p>Loading blog.....</p>      
    </div>
  )
}

 return(
   <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <Navbar/>
      <ScrollProgress progressPercentage={progress}/>
      <div 
      onScroll={handleScroll}
      className="mt-3.5 p-4 max-w-3xl mx-auto bg-white shadow-md rounded-lg   overflow-y-scroll h-full border border-gray-300" style={{maxHeight: "800px"}}>
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-600 mb-4">By {blog.author}</p>
        <p className="text-gray-600 mb-4">Posted on: {new Date(blog.created_at).toLocaleDateString()}</p>
        <p
          className="text-gray-800"
           dangerouslySetInnerHTML={{ __html: blog.content }}
        ></p>
      </div>
   </div>
 )  

}

export default blogView
