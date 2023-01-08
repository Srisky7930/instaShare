import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'
import ReactSlick from '../ReactSlick'
import Stories from '../Stories'

import './index.css'

class UserProfile extends Component {
  state = {
    userProfile: {},
    posts: [],
    stories: [],
  }

  componentDidMount() {
    this.getProfileData()
  }

  getsPosts = data => ({
    id: data.id,
    image: data.image,
  })

  getStories = data => ({
    id: data.id,
    image: data.image,
  })

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiProfileUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiProfileUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const userData = data.user_details
      const userProfile = {
        followersCount: userData.followers_count,
        followingCount: userData.following_count,
        id: userData.id,
        postsCount: userData.posts_count,
        profilePic: userData.profile_pic,
        userBio: userData.user_bio,
        userId: userData.user_id,
        userName: userData.user_name,
      }
      const posts = userData.posts.map(each => this.getsPosts(each))
      const stories = userData.stories.map(each => this.getStories(each))
      this.setState({
        userProfile,
        posts,
        stories,
      })
    }
  }

  renderUserProfile = () => {
    const {userProfile, posts, stories} = this.state
    const {
      userName,
      profilePic,
      postsCount,
      followersCount,
      followingCount,
      userId,
      userBio,
    } = userProfile
    return (
      <>
        <Header />
        <div>
          <div>
            <h1 className="user-name"> {userName} </h1>
          </div>
          <div className="user-profile-data">
            <div>
              <img src={profilePic} alt="a" className="profile-pic" />
            </div>
            <div className="card">
              <p className="count"> {postsCount} </p>
              <p className="text"> posts </p>
            </div>
            <div className="card">
              <p className="count"> {followersCount} </p>
              <p className="text"> followers </p>
            </div>
            <div className="card">
              <p className="count"> {followingCount} </p>
              <p className="text"> following </p>
            </div>
          </div>
          <div>
            <p className="user-id">{userId} </p>
            <p className="user-bio"> {userBio} </p>
          </div>
          <div>
            <ReactSlick eachItem={posts} />
          </div>
          <div className="posts-card">
            <p className="post-heading"> Posts </p>
          </div>
          <div className="stories">
            {stories.map(each => (
              <Stories eachItem={each} key={each.id} />
            ))}
          </div>
        </div>
      </>
    )
  }

  render() {
    const {posts, stories} = this.state
    return <div>{this.renderUserProfile()}</div>
  }
}

export default UserProfile
