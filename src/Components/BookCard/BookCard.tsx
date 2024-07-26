import { Book } from "../../api/Books";
import "../../index.css";
import "./style.css";
import "./media.css";

export const BookCard = ({
  title,
  author,
  data,
  price,
  tags,
  illustrator,
}: Book) => {
  return (
    <li className="section-books__list-item">
      <div className="section-books-card">
        <h2 className="section-books-card__heading">
          <span className="padding-left"></span>
          {title}
        </h2>
        <ul className="list-reset section-book__list">
          <li className="section-books-card__list-item">{author}</li>
          <li className="section-books-card__list-item">{data}</li>
          <li className="section-books-card__list-item">{price}</li>
          <li className="section-books-card__list-item">{illustrator}</li>
        </ul>
        <div className="section-book__list-item-buttons">
          {tags &&
            tags.map((buttonName, index) => (
              <div
                key={index}
                className="section-book__list-item-buttons-wrapper"
              >
                <span className="section-books-card__tag">
                  {buttonName}
                </span>
              </div>
            ))}
        </div>
      </div>
    </li>
  );
};
