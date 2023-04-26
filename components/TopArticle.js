import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";
import styles from "../styles/TopArticle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function TopArticle(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleBookmarkClick = () => {
    if (!user.token) {
      return;
    }

    fetch(`https://morningnews-backend-nine.vercel.app/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result && data.canBookmark) {
          if (props.isBookmarked) {
            dispatch(removeBookmark(props));
          } else {
            dispatch(addBookmark(props));
          }
        }
      });
  };

  let iconStyle = {};
  if (props.isBookmarked) {
    iconStyle = { color: "#E9BE59" };
  }

  return (
    <div className={styles.topContainer}>
      <img
        src="https://duet-cdn.vox-cdn.com/thumbor/0x0:2880x1602/1200x960/filters:focal(1798x742:1799x743):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/24609856/Screen_Shot_2023_04_25_at_12.09.31_PM.png"
        className={styles.image}
        alt={props.title}
      />
      <div className={styles.topText}>
        <h2 className={styles.topTitle}>{props.title}</h2>
        <FontAwesomeIcon
          onClick={() => handleBookmarkClick()}
          icon={faBookmark}
          style={iconStyle}
          className={styles.bookmarkIcon}
        />
        <h4>{props.author}</h4>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default TopArticle;
