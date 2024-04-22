export default function Input({ location, onChangeLocation }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for location..."
        value={location}
        onChange={(e) => onChangeLocation(e.target.value)}
      />
    </div>
  );
}
