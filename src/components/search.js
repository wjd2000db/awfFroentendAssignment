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

  // FUNCTION       : searchData
  // DESCRIPTION    : Handles the search functionality, fetching data from Reddit, displaying the search results, 
  //                  and allowing users to mark posts as favourites or remove them from favorites.
  // PARAMETERS     : None
  // RETURNS        : JSX element containing the search bar, search results, and favourite posts sections.
const SearchData = () => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [favouritePosts, setFavouritePosts] = useState([]);

  // FUNCTION       : handleInputChange
  // DESCRIPTION    : Updates the search query when the user types in the search input field.
  // PARAMETERS     : event (object) - The event object from the input field change.
  // RETURNS        : None
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };


  // FUNCTION       : fetchData
  // DESCRIPTION    : Fetches the 10 posts from the Reddit API and filters out stickied posts.
  // PARAMETERS     : None
  // RETURNS        : None
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

  // FUNCTION       : onClickFavourite
  // DESCRIPTION    : Adds the selected post to the list of favorite posts and stores the post ID in the local storage.
  // PARAMETERS     : post - The post object that the user wants to set as a favourite.
  // RETURNS        : None
  const onClickFavourite = (post) => {
    const favouriteIds = JSON.parse(localStorage.getItem("favourites")) || [];

    if (!favouriteIds.includes(post.id)) {
      const updatedIds = [...favouriteIds, post.id];
      localStorage.setItem("favourites", JSON.stringify(updatedIds));
      setFavouritePosts([...favouritePosts, post]);
    }
  };

  // FUNCTION       : onRemoveFavourite
  // DESCRIPTION    : Removes the selected post from the list of favorite posts and deletes the post ID from local storage.
  // PARAMETERS     : postId : String - post id
  // RETURNS        : None
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
