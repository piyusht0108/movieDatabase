import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SearchQuery from './components/SearchQuery'
import MovieDetails from './components/MovieDetails'

import SearchMoviesContext from './context/SearchMoviesContext'

import './App.css'

const API_KEY = '7c112f630a8fd0f38aa5ab7a740bb785'

// write your code here
class App extends Component {
  state = {searchResponse: {}, apiStatus: 'INITIAL', searchInput: ''}

  onChangeSearchInput = text => {
    this.setState({searchInput: text})
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

  onTriggerSearchQuery = async (page = 1) => {
    this.setState({apiStatus: 'IN_PROGRESS'})
    const {searchInput} = this.state
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const updatedData = this.getUpdatedData(data)
    console.log(updatedData)
    this.setState({searchResponse: updatedData, apiStatus: 'SUCCESS'})
  }

  render() {
    const {searchResponse, apiStatus, searchInput} = this.state
    return (
      <SearchMoviesContext.Provider
        value={{
          searchResponse,
          searchInput,
          apiStatus,
          onTriggerSearchQuery: this.onTriggerSearchQuery,
          onChangeSearchInput: this.onChangeSearchInput,
        }}
      >
        <div>
          <Switch>
            <Route exact path="/" component={Popular} />
            <Route exact path="/top-rated" component={TopRated} />
            <Route exact path="/upcoming" component={Upcoming} />
            <Route exact path="/search" component={SearchQuery} />
            <Route exact path="/movie/:id" component={MovieDetails} />
          </Switch>
        </div>
      </SearchMoviesContext.Provider>
    )
  }
}

export default App
