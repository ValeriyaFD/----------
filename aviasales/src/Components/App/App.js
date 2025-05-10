import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTicketsFromServer } from "../../aviasalesAPI";
import classes from "./App.module.scss";
import TransferFilter from "../TransferFilter/TransferFilter";
import UpperFilter from "../UpperFilter/UpperFilter";
import TicketList from "../TicketList/TicketList";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTicketsFromServer);
  }, [dispatch]);

  return (
    <div>
      <div className={classes.logo}>
        <img src="/logo.svg" alt="aviasales" />
      </div>
      <div className={classes.appMain}>
        <div className={classes.item1}>
          <TransferFilter />
        </div>
        <div className={classes.item2}>
          <UpperFilter />
        </div>
        <div className={classes.item3}>
          <TicketList />
        </div>
      </div>
    </div>
  );
}
