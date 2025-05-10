import React from "react";
import classes from "./UpperFilter.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setSortBy } from "../../reducers/sortSlice";

export default function UpperFilter() {
  const sortBy = useSelector((state) => state.sort.sortBy);
  const dispatch = useDispatch();

  const handleSortChange = (sortType) => () => {
    dispatch(setSortBy(sortType));
  };

  return (
    <div className={classes.upperFilter}>
      <button
        className={`${classes.upperFilterButton} ${classes.borderLeft} ${
          sortBy === "price" ? classes.active : ""
        }`}
        onClick={handleSortChange("price")}
        aria-pressed={sortBy === "price"}
      >
        Самый дешёвый
      </button>
      <button
        className={`${classes.upperFilterButton} ${
          sortBy === "duration" ? classes.active : ""
        }`}
        onClick={handleSortChange("duration")}
        aria-pressed={sortBy === "duration"}
      >
        Самый быстрый
      </button>
      <button
        className={`${classes.upperFilterButton} ${classes.borderRight} ${
          sortBy === "optimal" ? classes.active : ""
        }`}
        onClick={handleSortChange("optimal")}
        aria-pressed={sortBy === "optimal"}
      >
        Оптимальный
      </button>
    </div>
  );
}
