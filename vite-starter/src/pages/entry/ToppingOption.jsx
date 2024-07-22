export default function ToppingOption({ item }) {
  const { name, imagePath } = item;
  return (
    <div>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
    </div>
  );
}
