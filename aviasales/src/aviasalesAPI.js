import { setTickets, setLoading, setError } from "./reducers/ticketsSlice";

const MAX_RETRIES = 5; //попытки
const RETRY_DELAY = 1000; //время задержки

export async function fetchTicketsFromServer(dispatch) {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    const searchRes = await fetch(
      "https://aviasales-test-api.kata.academy/search",
    );
    const { searchId } = await searchRes.json();

    let allTickets = [];
    let stop = false;
    let retries = 0;

    while (!stop && retries < MAX_RETRIES) {
      try {
        const ticketRes = await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
        );

        if (!ticketRes.ok) throw new Error(`HTTP ${ticketRes.status}`);

        const data = await ticketRes.json();
        allTickets = [...allTickets, ...data.tickets];
        stop = data.stop;

        if (!stop) await new Promise((resolve) => setTimeout(resolve, 500));
        retries = 0;
      } catch (error) {
        retries++;

        if (retries >= MAX_RETRIES) {
          dispatch(setError("Не удалось загрузить билеты."));
          break;
        }

        //задержка
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      }
    }

    dispatch(setTickets(allTickets));
  } catch (error) {
    dispatch(setTickets([]));
    dispatch(setError("Ошибка: Request failed with status code 500"));
  } finally {
    dispatch(setLoading(false));
  }
}
