import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'

import SearchMoviesContext from '../../context/SearchMoviesContext'

import './index.css'

const SearchQuery = () => {
  const renderEmptyView = () => (
    <div className="empty-view-container">
      <h1>No result found</h1>
      <p>Do not get worried, Try to search again</p>
    </div>
  )

  const renderMoviesList = searchResponse => {
    const {results} = searchResponse
    console.log(results)
    if (results === undefined) {
      return renderEmptyView()
    }
    return (
      <ul className="movie-list-container">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  const renderSearchResultViews = value => {
    const {searchResponse, apiStatus} = value
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderMoviesList(searchResponse)
      default:
        return renderEmptyView()
    }
  }

  return (
    <SearchMoviesContext.Consumer>
      {value => {
        const {searchResponse, onTriggerSearchQuery} = value
        return (
          <>
            <NavBar />
            <div className="route-page-body">
              {renderSearchResultViews(value)}
            </div>
            <Pagination
              totalPages={searchResponse.totalPages}
              apiCallBack={onTriggerSearchQuery}
            />
          </>
        )
      }}
    </SearchMoviesContext.Consumer>
  )
}

export default SearchQuery