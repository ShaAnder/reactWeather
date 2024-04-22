import { Day } from "./Day";

/**
 * Weather component that handles rendering all of our days
 * @param {weather, displayLocation} -> these two props are passed down, we destructure the weather prop to allow for getting the individual attributes
 * @returns JSX for the weather component
 * @author shaAnder
 */
export function Weather({ weather, displayLocation }) {
  // we destructure our weather here to allow us ti pass the props down more effectively to the day component
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  return (
    <div>
      <h2>Weather {displayLocation}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <Day
            date={date}
            max={max.at(i)}
            min={min.at(i)}
            code={codes.at(i)}
            key={date}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
}
