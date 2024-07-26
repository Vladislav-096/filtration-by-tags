import { useState } from "react";
import { DropdownMenu } from "../DropDownMenu/DropdownMenu";
import "./media.css";
import "./style.css";

export type items = {
  label: string;
  key: string;
};

interface Navigation {
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
  setSortType: React.Dispatch<React.SetStateAction<string>>;
  sortDirection: string;
  sortType: string;
  items: string[];
  setTagArray: React.Dispatch<React.SetStateAction<string[]>>;
  tagArray: string[];
}

export const Navigation = ({
  setSortDirection,
  setSortType,
  sortDirection,
  sortType,
  items,
  setTagArray,
  tagArray,
}: Navigation) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function toggleState() {
    setDropdownOpen(true);
  }

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const defaultBtnClasses = "btn-reset section-navigation__button";

  return (
    <section className="section-navigation">
      <div className="container">
        <div className="section section-navigation__inner">
          <ul className="list-reset section-navigation__list">
            <li className="section-navigation__list-item">
              <button
                className={
                  sortDirection == "asc" && sortType == "price"
                    ? `${defaultBtnClasses} section-navigation__button-default-arrow`
                    : `${defaultBtnClasses} section-navigation__button-reverse-arrow`
                }
                onClick={() => {
                  toggleSortDirection();
                  setSortType("price");
                }}
              >
                price
              </button>
            </li>
            <li className="section-navigation__list-item">
              <button
                className={
                  sortDirection == "asc" && sortType == "author"
                    ? `${defaultBtnClasses} section-navigation__button-default-arrow`
                    : `${defaultBtnClasses} section-navigation__button-reverse-arrow`
                }
                onClick={() => {
                  toggleSortDirection();
                  setSortType("author");
                }}
              >
                author
              </button>
            </li>
            <li className="section-navigation__list-item">
              <button
                className={
                  sortDirection == "asc" && sortType == "date"
                    ? `${defaultBtnClasses} section-navigation__button-default-arrow`
                    : `${defaultBtnClasses} section-navigation__button-reverse-arrow`
                }
                onClick={() => {
                  toggleSortDirection();
                  setSortType("date");
                }}
              >
                date
              </button>
            </li>
          </ul>
          <div className="section-navigation__tags-wrapper">
            <ul className="list-reset section-navigation__list">
              <li className="section-navigation__list-item">
                <button
                  onClick={() => {
                    toggleState();
                  }}
                  className={
                    !dropdownOpen
                      ? `${defaultBtnClasses} section-navigation__button-tags section-navigation__button-tags-default-arrow`
                      : `${defaultBtnClasses} section-navigation__button-tags section-navigation__button-tags-reverse-arrow pointer-events-none`
                  }
                >
                  Tags
                </button>
              </li>
              <li className="section-navigation__list-item">
                <button
                  onClick={() => setTagArray([])}
                  className={defaultBtnClasses}
                >
                  reset rules
                </button>
              </li>
            </ul>
            <DropdownMenu
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
              items={items}
              setTagArray={setTagArray}
              tagArray={tagArray}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
