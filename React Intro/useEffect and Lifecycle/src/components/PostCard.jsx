function PostCard(props) {
  return (
    <div className="post-card">
      <h3 className="post-title">{props.post.title}</h3>
      <p className="post-body">{props.post.body}</p>
    </div>
  )
}

export default PostCard
