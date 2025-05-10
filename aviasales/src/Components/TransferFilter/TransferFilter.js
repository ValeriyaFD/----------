import React from "react";
import classes from "./TransferFilter.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleAllFilters,
  toggleStopFilter,
} from "../../reducers/filtersSlice";

export default function TransferFilter() {
  const { allFilters, stops } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  return (
    <div className={classes.filter}>
      <div className={classes.header}>Количество пересадок</div>
      <ul className={classes.filterList}>
        {/* Все билеты */}
        <li className={classes.filterTask}>
          <input
            type="checkbox"
            id="filter-all"
            checked={allFilters}
            onChange={() => dispatch(toggleAllFilters())}
            className={classes.checkbox}
          />
          <label htmlFor="filter-all" className={classes.label}>
            Все
          </label>
        </li>
        {/*Без пересадок*/}
        <li className={classes.filterTask}>
          <input
            className={classes.checkbox}
            type="checkbox"
            id="filter-0"
            checked={stops[0]}
            onChange={() => dispatch(toggleStopFilter(0))}
          />
          <label htmlFor="filter-0" className={classes.label}>
            Без пересадок
          </label>
        </li>
        {/*1 пересадка*/}
        <li className={classes.filterTask}>
          <input
            className={classes.checkbox}
            type="checkbox"
            id="filter-1"
            checked={stops[1]}
            onChange={() => dispatch(toggleStopFilter(1))}
          />
          <label htmlFor="filter-1" className={classes.label}>
            1 пересадка
          </label>
        </li>
        {/*2 пересадки*/}
        <li className={classes.filterTask}>
          <input
            className={classes.checkbox}
            type="checkbox"
            id="filter-2"
            checked={stops[2]}
            onChange={() => dispatch(toggleStopFilter(2))}
          />
          <label htmlFor="filter-2" className={classes.label}>
            2 пересадки
          </label>
        </li>
        {/*3 пересадки*/}
        <li className={classes.filterTask}>
          <input
            className={classes.checkbox}
            type="checkbox"
            id="filter-3"
            checked={stops[3]}
            onChange={() => dispatch(toggleStopFilter(3))}
          />
          <label htmlFor="filter-3" className={classes.label}>
            3 пересадки
          </label>
        </li>
      </ul>
    </div>
  );
}
