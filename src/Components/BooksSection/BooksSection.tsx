import { BookList } from "../../api/Books";
import { BookCard } from "../BookCard/BookCard";
import { useEffect, useState } from "react";
import "./style.css";

interface BooksSection {
  data: BookList;
  sortType: string;
  sortDirection: string;
  tagArray: string[];
}

export const BooksSection = ({
  data,
  sortType,
  sortDirection,
  tagArray,
}: BooksSection) => {
  const [dataState, setDataState] = useState(data);

  const sortData = () => {
    let sortedData = [...dataState];

    switch (sortType) {
      case "author":
        sortedData = sortedData.sort((a, b) => {
          if (a.author && b.author) {
            return sortDirection === "asc"
              ? a.author.localeCompare(b.author)
              : b.author.localeCompare(a.author);
          }
          // Возвращаем 0 если одно из значений не определено
          return 0;
        });
        break;

      case "price":
        sortedData = sortedData.sort((a, b) => {
          // Проверяем, что price не undefined
          const aPrice = a.price ?? 0;
          const bPrice = b.price ?? 0;
          return sortDirection === "asc" ? aPrice - bPrice : bPrice - aPrice;
        });
        break;

      case "date":
        sortedData = sortedData.sort((a, b) => {
          // Преобразование строк в объекты Date

          const aDate = new Date(a.data || 0);
          const bDate = new Date(b.data || 0);

          // Проверка на допустимость преобразования
          if (isNaN(aDate.getTime())) return 0; // Если aDate не является допустимой датой
          if (isNaN(bDate.getTime())) return 0; // Если bDate не является допустимой датой

          return sortDirection === "asc" || sortDirection === ""
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        });
        break;
      default:
        // В случае, если sortType не задан или не соответствует ожидаемым значениям
        // Возвращаем неотсортированный массив данных
        break;
    }

    setDataState(sortedData);
  };

  useEffect(() => {
    sortData();
  }, [sortDirection]);

  // console.log("tag", tagArray);

  function tagFilter(arr1: BookList, arr2: string[]) {
    // Фильтруем arr1 по условию
    return arr1.filter((item) => {
      // Проверяем, содержит ли все теги из arr2 в item.tags
      return arr2.every((tag) => item.tags && item.tags.includes(tag));
    });
  }

  return (
    <section className="section-books">
      <div className="container">
        <div className="section section-books__inner">
          <ol className="list-reset section-books__list">
            {tagArray.length > 0
              ? tagFilter(dataState, tagArray).map((book, index) => (
                  <BookCard
                    key={index}
                    title={book.title}
                    author={book.author}
                    data={book.data}
                    price={book.price}
                    tags={book.tags}
                    illustrator={book.illustrator}
                  />
                ))
              : dataState.map((book, index) => (
                  <BookCard
                    key={index}
                    title={book.title}
                    author={book.author}
                    data={book.data}
                    price={book.price}
                    tags={book.tags}
                    illustrator={book.illustrator}
                  />
                ))}
          </ol>
          <div className="section-books__total">
            <p className="section-books__total-descr">
              <span className="section-books__total-span">TOTAL:</span>{" "}
              <span>
                {data.reduce(
                  (total, item) =>
                    item.price ? total + item.price : total + 0,
                  0
                )}
                $
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
