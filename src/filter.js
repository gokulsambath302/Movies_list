import React from 'react'

const filter = () => {

    const MovieFilter = () => {
        const [filter, setFilter] = useState(null);
      
        const handleFilter = (condition) => {
          setFilter(condition);
        };
      
        const filteredMovies = filter === "before"
          ? movies.filter(movie => movie.year < 2005)
          : filter === "after"
          ? movies.filter(movie => movie.year >= 2005)
          : movies;

  return (
    <div>
      
    </div>
  )
}
}

export default filter
