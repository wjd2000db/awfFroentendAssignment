import React from "react";
import "../css/favourite.css";  

const FavouritePosts = ({ favouritePosts, onRemoveFavourite }) => {
  return (
    <div className="favouriteContainer">
      <h2>Favourite Posts</h2>
      {favouritePosts.length > 0 ? (
        favouritePosts.map((post) => (
          <div key={post.id} className="favouritePost">
            <h3>{post.title}</h3>
            <p>Score: {post.score}</p>
            <a 
              href={`https://www.reddit.com${post.permalink}`} 
              target="_blank"
              rel="noreferrer"
            >
              comments
            </a>
            <br/>
            <button onClick={() => onRemoveFavourite(post.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p className="noFavourites">No favourite posts</p>
      )}
    </div>
  );
};

export default FavouritePosts;
