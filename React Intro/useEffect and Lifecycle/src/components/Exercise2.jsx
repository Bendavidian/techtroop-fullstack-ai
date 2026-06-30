import { useState, useEffect } from 'react'
import { getPosts } from '../data/mockPosts.js'
import PostCard from './PostCard.jsx'

function Exercise2() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let isMounted = true

    const fetchPosts = async () => {
      try {
        const data = await getPosts()
        if (isMounted) {
          setPosts(data.slice(0, 10))
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load posts.")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchPosts()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="posts-section">
      <h2 className="posts-title">Top Posts</h2>
      {loading && <p className="loading">Loading posts...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="posts-grid">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Exercise2
