import { BooksSection } from "../BooksSection/BooksSection";
import { Heading } from "../Heading/Header";
import { Navigation } from "../Navigation/Navigation";
import { getBook } from "../../api/Books";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { useState } from "react";

export const Layout = () => {
  const [sortDirection, setSortDirection] = useState("");
  const [sortType, setSortType] = useState("");
  const [tagArray, setTagArray] = useState<string[]>([]);

  const getBooksQuery = useQuery(
    {
      queryFn: () => getBook(),
      queryKey: ["books"],
      retry: false,
    },
    queryClient
  );

  // Создаю массив items, из которого нарисую tags в dropdown
  let queryData = getBooksQuery && getBooksQuery.data ? getBooksQuery.data : [];

  let items: string[] = [];

  for (let i = 0; i < queryData?.length; i++) {
    if (queryData[i].tags) {
      let currentTagsArray = queryData[i].tags || [];
      for (let j = 0; j < currentTagsArray.length; j++) {
        if (!items.includes(currentTagsArray[j])) {
          items.push(currentTagsArray[j]);
        }
      }
    }
  }

  switch (getBooksQuery.status) {
    case "pending":
      return <div>Loading...</div>;
    case "success":
      return (
        <main>
          <Heading />
          <Navigation
            setSortDirection={setSortDirection}
            setSortType={setSortType}
            sortDirection={sortDirection}
            sortType={sortType}
            items={items}
            setTagArray={setTagArray}
            tagArray={tagArray}
          />
          <BooksSection
            data={getBooksQuery.data}
            sortType={sortType}
            sortDirection={sortDirection}
            tagArray={tagArray}
          />
        </main>
      );
    case "error":
      return <div>Ошибка при получении данных</div>;
  }
};
