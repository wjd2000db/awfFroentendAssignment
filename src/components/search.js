/* 
FILE          : SearchData.js
PROJECT       : SENG3080 - Frontend Programming Assignment
PROGRAMMER    : Yujin Jeong
FIRST VERSION : 2025-02-08
DESCRIPTION   : This component allows users to search for subreddits, view posts, and mark favorites.
*/

import React, { useState } from "react";
import FavouritePosts from "./favourite";
import "../css/search.css";

const SearchData = () => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [favouritePosts, setFavouritePosts] = useState([]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://www.reddit.com/r/${search}/hot.json?limit=10`);
      const data = await response.json();

      if (!data.data.children) {
        console.error("No data");
        return;
      }

      //filter stickied posts
      const filteredPosts = data.data.children
        .map(post => post.data)
        .filter(post => !post.stickied);

      setPosts(filteredPosts);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onClickFavourite = (post) => {
    const favouriteIds = JSON.parse(localStorage.getItem("favourites")) || [];

    if (!favouriteIds.includes(post.id)) {
      const updatedIds = [...favouriteIds, post.id];
      localStorage.setItem("favourites", JSON.stringify(updatedIds));
      setFavouritePosts([...favouritePosts, post]);
    }
  };

  const onRemoveFavourite = (postId) => {
    const updatedFavourites = favouritePosts.filter(post => post.id !== postId);
    setFavouritePosts(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites.map(post => post.id)));
  };

  return (
    <div className="searchContainer">
      <div className="searchContent">
        <div className="searchInputContainer">
          <input
            className="inputStyle"
            type="text"
            name="search"
            value={search}
            onChange={handleInputChange}
          />
          <button onClick={fetchData} className="buttonStyle">search</button>
        </div>

        {posts !== null&& (
          <div className="postContainer">
            {posts.map((post) => (
              <div key={post.id} className="postItem">
                <h3>{post.title}</h3>
                <button className={"buttonStyle"}
                onClick={() => onClickFavourite(post)}>
                favourite
                </button>
                <p>Score: {post.score}</p>
                <a
                  href={`https://www.reddit.com${post.permalink}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  comments
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="favouriteContent">
        <FavouritePosts favouritePosts={favouritePosts} onRemoveFavourite={onRemoveFavourite} />
      </div>
    </div>
  );
};

export default SearchData;
