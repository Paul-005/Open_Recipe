export default function Recipecard({ data }) {
  return (
    <div class="col">
      <div class="card shadow-sm" whileHover={{ scale: 1.1 }}>
        <div class="card-body">
          <div className="card-title text-center fw-bold h2">
            {data.recipeName}
          </div>
          <p class="card-text  ">{data.RecipeContent.substr(0, 300)}...</p>
          <div class="d-flex justify-content-between align-items-center ">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">
                View
              </button>
              <button type="button" class="btn btn-sm btn-outline-secondary">
                Edit
              </button>
            </div>
            <small class="text-muted">9 mins</small>
          </div>
        </div>
      </div>
    </div>
  );
}
