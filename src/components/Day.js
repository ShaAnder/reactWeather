/**
 * Day Component for our functional version of classy weather
 * @param {date, max, min, code, isToday} -> props passed down from the weather component to our child component, this will model the details for each day
 * @returns JSX for each day that we're modelling
 * @author shaAnder
 */
export function Day({ date, max, min, code, isToday }) {
  // we take the weatherIcon function from the original class based code and place it here, as it's only needed in this component, nothing changes, it's just working in the scope of Day
  function getWeatherIcon(wmoCode) {
    const icons = new Map([
      [[0], "☀️"],
      [[1], "🌤"],
      [[2], "⛅️"],
      [[3], "☁️"],
      [[45, 48], "🌫"],
      [[51, 56, 61, 66, 80], "🌦"],
      [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
      [[71, 73, 75, 77, 85, 86], "🌨"],
      [[95], "🌩"],
      [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
  }

  // The same applies to formatDay, we only really need this in Day as we're modelling the days here
  function formatDay(dateStr) {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(dateStr));
  }

  // Now we return our jsx (not render :) )
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{!isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
      </p>
    </li>
  );
}
