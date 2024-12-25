import {Component} from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'

import './index.css'

class Popular extends Component {
  state = {isLoading: true, popularMovieResponse: {}}

  componentDidMount() {
    this.getPopularMovieResponse()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResult: responseData.total_results,
    results: responseData.results.map(eachItem => ({
      id: eachItem.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachItem.poster_path}`,
      voteAverage: eachItem.vote_average,
      title: eachItem.title,
    })),
  })

  getPopularMovieResponse = async (page = 1) => {
    const API_KEY = '7c112f630a8fd0f38aa5ab7a740bb785'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, popularMovieResponse: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderPopularMoviesList = () => {
    const {popularMovieResponse} = this.state
    const {results} = popularMovieResponse

    return (
      <ul className="movie-list-container">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, popularMovieResponse} = this.state
    return (
      <>
        <NavBar />
        <div className="route-page-body">
          {isLoading
            ? this.renderLoadingView()
            : this.renderPopularMoviesList()}
        </div>
        <Pagination
          totalPages={popularMovieResponse.totalPages}
          apiCallBack={this.getPopularMovieResponse}
        />
      </>
    )
  }
}

export default Popular
