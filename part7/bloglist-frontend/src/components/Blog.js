import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, userId, returnNewBlog }) => {
  const dispatch = useDispatch()

  const [detailVisible, setdetailVisible] = useState(false)

  const blogStyle = {
    display: blog.id !== '' ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showDetails = { display: detailVisible ? '' : 'none' }

  const increaseLikeofBlog = async () => {
     dispatch(updateBlog({...blog, likes: blog.likes + 1}))
  }

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      dispatch(removeBlog(blog.id))
      setdetailVisible(false)
    }
  }

  const currentBlog = returnNewBlog(blog.id)
  console.log("oba", currentBlog)
  const removeStyle = {
    display: currentBlog.user && userId === currentBlog.user ? '' : 'none'
  }

  return(
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button className='viewHideButton' onClick={() => setdetailVisible(!detailVisible)}>{detailVisible ? 'hide' : 'view'}</button>
      <div className='blog-details' style={showDetails}>
        <ul>
          <li className='url-li' >
            {blog.url}
          </li>
          <li className='likes-li' >
            {blog.likes}
            <button className='likeButton' onClick={increaseLikeofBlog}>like</button>
          </li>
          <li>
            {blog.user ? blog.user.name : null}
          </li>
          <div style={removeStyle}>
            <button onClick={handleRemoveBlog}>remove</button>
          </div>
        </ul>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired
}

export default Blog