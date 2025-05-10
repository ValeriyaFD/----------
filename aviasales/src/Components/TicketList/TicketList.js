import React, { useState } from "react";
import classes from "./TicketList.module.scss";
import Ticket from "../Ticket/Ticket";
import { useSelector } from "react-redux";

export default function TicketList() {
  const [displayedTicketsCount, setDisplayedTicketsCount] = useState(5);

  //достаю данные
  const ticketsState = useSelector((state) => state.tickets);
  const filters = useSelector((state) => state.filters);
  const sort = useSelector((state) => state.sort);

  //проверяю на массив
  const tickets = Array.isArray(ticketsState.data) ? ticketsState.data : [];

  //фильт по пересадкам
  const filteredTickets = tickets.filter((ticket) => {
    const oneStops = ticket.segments?.[0]?.stops?.length ?? 0;
    return filters.stops[oneStops];
  });

  //фильтр по цене, длительности и оптимальности
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sort.sortBy === "price") return a.price - b.price;
    if (sort.sortBy === "duration") {
      const totalDurationA = a.segments[0].duration + a.segments[1].duration;
      const totalDurationB = b.segments[0].duration + b.segments[1].duration;
      return totalDurationA - totalDurationB;
    }
    if (sort.sortBy === "optimal") {
      const scoreA =
        a.price + 0.5 * (a.segments[0].duration + a.segments[1].duration);
      const scoreB =
        b.price + 0.5 * (b.segments[0].duration + b.segments[1].duration);
      return scoreA - scoreB;
    }
    return 0;
  });

  //показать больше
  const displayedTickets = sortedTickets.slice(0, displayedTicketsCount);
  const handleLoadMore = () => {
    setDisplayedTicketsCount((prev) => prev + 5);
  };

  //проверка на загрузку
  if (ticketsState.loading) {
    return <div className={classes.loading}>Загрузка билетов...</div>;
  }

  //проверка на ошибку получения пачки билетов
  if (ticketsState.error) {
    return <p className={classes.errorMessage}>{ticketsState.error}</p>;
  }

  return (
    <div className={classes.list}>
      {displayedTickets.length > 0 ? (
        displayedTickets.map((ticket, index) => (
          <Ticket key={index} ticket={ticket} />
        ))
      ) : (
        <p className={classes.noTickets}>
          Рейсов, подходящих под заданные фильтры, не найдено.
        </p>
      )}

      {displayedTickets.length > 0 &&
        displayedTicketsCount < sortedTickets.length && (
          <button className={classes.buttonMore} onClick={handleLoadMore}>
            Показать ещё 5 билетов!
          </button>
        )}
    </div>
  );
}
