import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class MovieDetails extends Component {
  state = {movieDetails: {}}

  componentDidMount() {
    this.getMovieDetail()
  }

  getMovieDetail = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const API_KEY = '7c112f630a8fd0f38aa5ab7a740bb785'
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({movieDetails: data})
    }
    console.log(data)
  }

  render() {
    const {movieDetails} = this.state
    const {title, overview, tagline} = movieDetails
    const posterPath = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
    return (
      <div className="movie-details-container">
        <div className="movie-top-container">
          <div className="movie-details">
            <div>
              <h1 className="title">{title}</h1>
              <p className="tagline">{tagline}</p>
            </div>
            <div>
              <p>Released Date: {movieDetails.release_date}</p>
              <p>Rating {movieDetails.vote_average}</p>
              <p>{overview}</p>
            </div>
          </div>
          <img src={posterPath} alt={title} className="movie-card-image" />
        </div>
        <Link to="/">
          <button type="button">Back</button>
        </Link>
      </div>
    )
  }
}

export default MovieDetails
