import { ChangeEvent, useEffect, useRef } from "react";
// import "../../index.css";
import "./style.css";

interface DropDownMenu {
  items: string[];
  dropdownOpen: boolean;
  setTagArray: React.Dispatch<React.SetStateAction<string[]>>;
  tagArray: string[];
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DropdownMenu = ({
  items,
  dropdownOpen,
  tagArray,
  setTagArray,
  setDropdownOpen,
}: DropDownMenu) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function chooseTag(tagName: string) {
    if (!tagArray.includes(tagName)) {
      setTagArray((prevTags) => [...prevTags, tagName]);
    } else {
      for (let i = 0; i < tagArray.length; i++) {
        if (tagArray[i] == tagName) {
          let tempArr = [...tagArray];
          tempArr.splice(i, 1);
          setTagArray(tempArr);
        }
      }
    }
  }
  return (
    <div
      ref={dropdownRef}
      className={!dropdownOpen ? "dropdown" : "dropdown dropdown-open "}
    >
      {items.map((item, index) => (
        <button
          style={{ border: "2px solid #fff" }}
          key={index}
          className={
            !tagArray.includes(item)
              ? "btn-reset section-books-card__tag"
              : "btn-reset section-books-card__tag section-books-card__tag-chosen"
          }
          onClick={() => chooseTag(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
