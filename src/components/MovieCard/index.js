import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails
  return (
    <li className="movie-card-container">
      <img src={posterPath} alt={title} className="movie-card-image" />
      <div>
        <h1 className="movie-title">{title}</h1>
        <p className="movie-rating">Rating: {voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`}>
        <button type="button" className="view-details">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard
