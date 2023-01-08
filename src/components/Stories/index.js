import './index.css'

const Stories = props => {
  const {eachItem} = props
  const {image} = eachItem
  return (
    <div className="stories-container">
      <img src={image} alt="a" className="stories-image" />
    </div>
  )
}

export default Stories
