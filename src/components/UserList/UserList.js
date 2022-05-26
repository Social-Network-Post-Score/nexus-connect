import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styles from "./UserList.module.css";
export default function UserLis(props) {
  const [userList, setUserList] = useState([]);

  const [searchResult, setSearchResult] = useState(userList);
  console.log("Search result: ", searchResult);

  const history = useHistory();

  const handleOnChange = (event) => {
    let word = event.target.value;
    let list = userList.filter((user) =>
      user.name.toLowerCase().startsWith(word)
    );
    setSearchResult(list);
    console.log(searchResult);
  };

  const getUserList = async () => {
    await axios
      .get("https://secret-castle-58335.herokuapp.com/api/users")
      .then((res) => {
        console.log(res);
        setUserList(res.data.users);
        setSearchResult(res.data.users);
      })
      .catch((err) => console.log(err));
  };

  const handleOnClick = (user) => {
    history.push(`/profile/${user._id}`);
  };

  useEffect(() => {
    console.log("Use effect", props);
    getUserList();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <h2>Find other users to follow.</h2>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="search by name..."
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <div className={styles.userContainer}>
        {searchResult.map((user) => {
          return (
            <div
              className={styles.userMain}
              onClick={() => handleOnClick(user)}
            >
              <div className={styles.userDp}>
                <img
                  src={`https://picsum.photos/seed/${user.email}/200/200`}
                  alt="user dp"
                ></img>
              </div>
              <div className={styles.userName}>{user.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
