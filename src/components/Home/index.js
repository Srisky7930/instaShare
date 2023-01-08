import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Feeds from '../Feeds'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    homePage: [],
  }

  componentDidMount() {
    this.getHomePageData()
  }

  getProfilePosts = data => ({
    profilePic: data.profile_pic,
    userName: data.user_name,
    userId: data.user_id,
    postId: data.post_id,
    likesCount: data.likes_count,
    comments: data.comments.map(each => ({
      comment: each.comment,
      userId: each.user_id,
      userName: each.user_name,
    })),
    createdAt: data.created_at,
    postDetails: data.post_details,
  })

  getHomePageData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const homeData = data.posts
      const homePage = homeData.map(each => this.getProfilePosts(each))
      this.setState({
        homePage,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderHomePage = () => {
    const {homePage} = this.state
    return (
      <div>
        <ul>
          {homePage.map(each => (
            <Feeds eachFeed={each} key={each.user_id} />
          ))}
        </ul>
      </div>
    )
  }

  getLoaderView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderHomeDataPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomePage()
      case apiStatusConstants.inProgress:
        return this.getLoaderView()
      case apiStatusConstants.failure:
        return this.getFailureview()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">{this.renderHomeDataPage()}</div>
      </>
    )
  }
}

export default Home
