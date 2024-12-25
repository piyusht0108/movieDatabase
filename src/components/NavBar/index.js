import {Link, withRouter} from 'react-router-dom'

import SearchMoviesContent from '../../context/SearchMoviesContext'

import './index.css'

const NavBar = props => {
  const renderSearchBar = () => (
    <SearchMoviesContent.Consumer>
      {value => {
        const {onTriggerSearchQuery, onChangeSearchInput, searchInput} = value
        const onChangeHandler = event => onChangeSearchInput(event.target.value)
        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchQuery()
          history.push('/search')
        }

        return (
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search"
            />
            <button
              type="button"
              className="search-btn"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        )
      }}
    </SearchMoviesContent.Consumer>
  )
  return (
    <div className="navbar-container">
      <div className="logo-container">
        <h1 className="page-logo">MovieDB</h1>
      </div>
      <div className="navbar-right-section">
        <ul className="nav-items-list">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Popular
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/top-rated">
              Top Rated
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/upcoming">
              Upcoming
            </Link>
          </li>
        </ul>
        {renderSearchBar()}
      </div>
    </div>
  )
}

export default withRouter(NavBar)
