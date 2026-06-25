function CategoryFilters({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="category-filters">
      <button
        className={`filter-btn ${activeCategory === 'All' ? 'active' : ''}`}
        onClick={() => onCategoryChange('All')}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.name}
          className={`filter-btn ${activeCategory === cat.name ? 'active' : ''}`}
          style={activeCategory === cat.name ? { backgroundColor: cat.color, borderColor: '#888' } : {}}
          onClick={() => onCategoryChange(cat.name)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilters
