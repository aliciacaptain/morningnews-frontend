import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";
import { addHiddenArticles } from "../reducers/hiddenArticles";
import Image from "next/image";
import styles from "../styles/Article.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Article(props) {
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

  const handleHiddenClick = () => {
    dispatch(addHiddenArticles(props.title));
  };

  let iconStyle = {};
  if (props.isBookmarked) {
    iconStyle = { color: "#E9BE59" };
  }

  return (
    <div className={styles.articles}>
      <div className={styles.articleHeader}>
        <h3>{props.title}</h3>
        <FontAwesomeIcon
          onClick={() => handleBookmarkClick()}
          icon={faBookmark}
          style={iconStyle}
          className={styles.bookmarkIcon}
        />
        <FontAwesomeIcon
          onClick={() => handleHiddenClick()}
          icon={faEyeSlash}
          className={styles.hiddenIcon}
        />
      </div>
      <h4 style={{ textAlign: "right" }}>- {props.author}</h4>
      <div className={styles.divider}></div>
      <Image
        src="https://duet-cdn.vox-cdn.com/thumbor/0x0:2880x1602/1200x960/filters:focal(1798x742:1799x743):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/24609856/Screen_Shot_2023_04_25_at_12.09.31_PM.png"
        alt={props.title}
        width={600}
        height={314}
      />
      <p>{props.description}</p>
    </div>
  );
}

export default Article;
