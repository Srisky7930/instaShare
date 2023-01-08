import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'

import {FaRegComment} from 'react-icons/fa'
import './index.css'

const Feeds = props => {
  const {eachFeed} = props
  const {
    profilePic,
    userName,
    userId,
    postId,
    likesCount,
    createdAt,
    postDetails,
  } = eachFeed
  const imageUrl = postDetails.image_url
  const captions = postDetails.caption

  return (
    <li className="profile-cards">
      <Link to={`/users/${userId}`}>
        <div to="/" className="profile-card">
          <div className="profile-name-card">
            <div>
              <img
                src={profilePic}
                alt="post author profile"
                className="profile-image"
              />
            </div>
            <div>
              <p className="profile-name"> {userName} </p>
            </div>
          </div>
          <div>
            <img src={imageUrl} alt="post" className="post-image" />
          </div>
          <div className="likes-comments-card">
            <div>
              <BsHeart className="like-logo" />
              <FaRegComment className="like-logo" />
              <BiShareAlt className="like-logo" />
            </div>
            <div>
              <p className="likes-count"> {likesCount} likes </p>
              <p className="caption"> {captions} </p>
            </div>
            <div>
              <p className="created-at"> {createdAt} </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default Feeds
