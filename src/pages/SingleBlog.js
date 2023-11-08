import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { HiArrowSmLeft } from "react-icons/hi"
import { Link, useLocation } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from 'react-redux';
import { getABlog } from "../features/blogs/blogSlice";


const SingleBlog = () => {
    const blogState = useSelector((state) => state?.blog?.singleBlog)
    const location = useLocation();
    const getBlogId = location.pathname.split("/")[2]
    const dispatch = useDispatch()
    useEffect(() => {
        getBlog();
    }, [])
    const getBlog = () => {
        dispatch(getABlog(getBlogId))
    }
    return (
        <>
            <Meta title={blogState?.title} />
            <BreadCrumb title={blogState?.title} />

            <Container class1="blog-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="single-blog-card">
                            <Link to="/blogs" className="d-flex align-items-center gap-10"><HiArrowSmLeft className="fs-4" />Go back to Blogs</Link>
                            <h3 className="title">{blogState?.title}</h3>
                            <img src={blogState?.images[0].url ? blogState?.images[0].url : "/images/blog-1.jpg"} className="im-fuild w-100 my-4" alt="blog " />
                            <p className='desc'
                                dangerouslySetInnerHTML={{ __html: blogState?.description }}
                            ></p >
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};
export default SingleBlog;