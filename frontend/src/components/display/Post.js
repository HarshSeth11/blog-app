import React from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import "../componentsStyle/Post.css"

export default function Post(props) {
    const location = useLocation();
    console.log(location);
  return (
    <div>
        <div>
            < Navbar />
        </div>
        <div className="post">
            <img src={location.state.element.img} alt="" className='img' />
            <h1>{location.state.element.title}</h1>
            <div className='author'>
                <p>Author Name</p>
                <div className='controls'>
                    <i class="fa-solid fa-pen-to-square"></i>
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
            <p className='text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam beatae rerum enim deleniti molestiae fuga laboriosam sequi? Neque, officiis eaque enim laborum quibusdam, deleniti consequuntur ex, amet voluptatum officia possimus similique hic. Dicta aliquam consequuntur, voluptas iure error aperiam iusto deleniti corrupti sit assumenda omnis est quidem dolores incidunt neque nemo expedita sed veritatis ipsum eum. Suscipit voluptate corporis quasi sit voluptas debitis voluptatum iusto optio tempora. Tenetur quod ut, veniam repellat repellendus, dolores commodi harum fugiat soluta culpa autem aliquid facilis assumenda eveniet iusto quibusdam, ab minima accusantium hic obcaecati sit natus ipsam? Doloremque nisi fuga commodi maiores veniam?
            </p>
            <div className="comment-section">
                <div>
                    <textarea placeholder='Write the comment here...' className='comment-input' name="" id="" cols="30" rows="10"></textarea>
                    <button className="submit">Submit</button>
                </div>
                <div className="comments">
                    <div className='comment-user'>
                        <i class="fa-solid fa-user"></i>
                        <h5>user name</h5>
                    </div>
                    <p className='comment-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, officiis.</p>
                </div>
            </div>
        </div>
    </div>
  )
}
