import React from "react";
import classes from "./Ticket.module.scss";

export default function Ticket({ ticket }) {
  //формат времени
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  //время прилёта
  const formatArrivalTime = (dateString, duration) => {
    const departure = new Date(dateString);
    departure.setMinutes(departure.getMinutes() + duration);
    return departure.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  //фильтр списка пересадок
  const formatStops = (stops) => {
    if (stops.length === 0) return "БЕЗ ПЕРЕСАДОК";
    if (stops.length === 1) return "1 ПЕРЕСАДКА";
    if (stops.length > 1) return `${stops.length} ПЕРЕСАДКИ`;
    return stops.join(", ");
  };

  //имена пересадок
  const nameStops = (stops) => {
    if (stops.length === 0) return "";
    return stops.join(", ");
  };

  return (
    <div className={classes.ticket}>
      <div className={classes.ticketHeader}>
        <div className={classes.ticketPrice}>
          {ticket.price.toLocaleString()} Р
        </div>
        <div className={classes.ticketImg}>
          <img
            src={`//pics.avs.io/99/36/${ticket.carrier}.png`}
            alt={`${ticket.carrier} логотип`}
            className={classes.airlineLogo}
          />
        </div>
      </div>
      <div className={classes.ticketInfo}>
        <p className={`${classes.ticketText} ${classes.grey}`}>
          {ticket.segments[0].origin} → {ticket.segments[0].destination}
        </p>
        <p className={`${classes.ticketText} ${classes.grey}`}>В ПУТИ</p>
        <p className={`${classes.ticketText} ${classes.grey}`}>
          {formatStops(ticket.segments[0].stops)}
        </p>
        <p className={`${classes.ticketText} ${classes.lowerCase}`}>
          {formatTime(ticket.segments[0].date)} -{" "}
          {formatArrivalTime(
            ticket.segments[0].date,
            ticket.segments[0].duration,
          )}
        </p>
        <p className={`${classes.ticketText} ${classes.lowerCase}`}>
          {Math.floor(ticket.segments[0].duration / 60)}ч{" "}
          {ticket.segments[0].duration % 60}м
        </p>
        <p className={classes.ticketText}>
          {nameStops(ticket.segments[0].stops)}
        </p>
        <p className={`${classes.ticketText} ${classes.grey}`}>
          {ticket.segments[1].origin} → {ticket.segments[1].destination}
        </p>
        <p className={`${classes.ticketText} ${classes.grey}`}>В ПУТИ</p>
        <p className={`${classes.ticketText} ${classes.grey}`}>
          {formatStops(ticket.segments[1].stops)}
        </p>
        <p className={`${classes.ticketText} ${classes.lowerCase}`}>
          {formatTime(ticket.segments[1].date)} -{" "}
          {formatArrivalTime(
            ticket.segments[1].date,
            ticket.segments[1].duration,
          )}
        </p>
        <p className={`${classes.ticketText} ${classes.lowerCase}`}>
          {Math.floor(ticket.segments[1].duration / 60)}ч{" "}
          {ticket.segments[1].duration % 60}м
        </p>
        <p className={classes.ticketText}>
          {nameStops(ticket.segments[1].stops)}
        </p>
      </div>
    </div>
  );
}
