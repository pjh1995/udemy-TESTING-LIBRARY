export default function ScoopOption({ item }) {
  const { name, imagePath } = item;
  return (
    <div>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} width="75%" />
    </div>
  );
}
