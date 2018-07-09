import React, { Component } from 'react';
import PropTypes from 'prop-types'

class LocList extends Component {

    static propTypes = {
        locations: PropTypes.array.isRequired,
        filterLocation: PropTypes.func.isRequired
    }

    // 筛选条件
    state = {
        query: ''
    }

     // 当input的value值改变时更新state
    changeQuery = (query) => {
        this.setState({
            query: query.trim()
        }) 
    }

    
    render() {

        const { filterLocation, locations } = this.props;
        const { query} = this.state;

        return (
            <div className="locList">
                <h3 className="header-title">北京金融街</h3>
                <div className="search-input-wrapper">
                    <input 
                        type="text" 
                        placeholder="Search by title"
                        value={query}
                        aria-label="search input"
                        label="search input"
                        tabIndex="2"
                        onChange={(event) => { this.changeQuery(event.target.value)}}
                    />
                    <button 
                        className="searchBtn"
                        aria-label="search button"
                        label="search button"
                        tabIndex="3"
                        onClick={(event) => (filterLocation(event, this.state.query))}
                    >
                        Filter
                    </button>
                </div>
                <ul className="loc-list">
                    {locations.map((loc, index) => (
                        <li key={loc.title} 
                            tabIndex={4 + {index}}
                            onClick={(event) => {
                                this.changeQuery(loc.title)
                                filterLocation(event, loc.title)}
                            }>
                            {loc.title}
                        </li>
                    ))}               
                </ul>
            </div>

        )
    }
}

export default LocList

