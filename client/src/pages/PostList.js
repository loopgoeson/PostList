import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList= () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/posts?page=${page}`);
        setPosts(prevPosts => [...prevPosts, ...response.data]);
        setPage(prevPage => prevPage + 1);
        setHasMore(response.data.length > 0);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setLoading(false);
    };

    if (hasMore) {
      fetchPosts();
    }
  }, [page]); 

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-semibold text-center mb-8">MelodyVerse Post List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
      {!loading && !hasMore && <p className="text-center mt-4">No more posts to load.</p>}
    </div>
  );
};

export default PostList;
