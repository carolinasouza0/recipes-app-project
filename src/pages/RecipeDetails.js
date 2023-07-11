import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function RecipeDetails() {
  const { id } = useParams();

  return (
    <div>
      <p>{ id }</p>
    </div>
  );
}

export default RecipeDetails;
