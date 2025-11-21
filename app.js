document.addEventListener("DOMContentLoaded", () => {
  const recipeList = document.getElementById("recipeList");
  const msg = document.getElementById("msg");

  const addRecipeBtn = document.getElementById("addRecipeBtn");
  const modalBg = document.getElementById("modalBg");
  const saveBtn = document.getElementById("saveBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const homeBackBtn = document.getElementById("homeBackBtn");

  const recipeName = document.getElementById("recipeName");
  const recipeDesc = document.getElementById("recipeDesc");
  const recipeImg = document.getElementById("recipeImg");
  const recipeTime = document.getElementById("recipeTime");
  const recipeDifficulty = document.getElementById("recipeDifficulty");
  const recipeIngredients = document.getElementById("recipeIngredients");
  const recipeSteps = document.getElementById("recipeSteps");
  const editId = document.getElementById("editId");

  const searchInput = document.getElementById("searchInput");
  const difficultyFilter = document.getElementById("difficultyFilter");
  const timeFilter = document.getElementById("timeFilter");

  const viewModalBg = document.getElementById("viewModalBg");
  const viewTitle = document.getElementById("viewTitle");
  const viewImg = document.getElementById("viewImg");
  const viewDesc = document.getElementById("viewDesc");
  const viewTime = document.getElementById("viewTime");
  const viewDifficulty = document.getElementById("viewDifficulty");
  const viewIngredients = document.getElementById("viewIngredients");
  const viewSteps = document.getElementById("viewSteps");
  const closeViewBtn = document.getElementById("closeViewBtn");

  // --- STORAGE FUNCTIONS ---
  function getRecipes() {
    const persistentDefaults = [
      {
        id: 1,
        name: "Mushroom Curry",
        description: "Creamy, spicy mushroom curry.",
        img: "https://www.cookwithkushi.com/wp-content/uploads/2020/03/IMG_3557_11-1024x650-1.jpg",
        prepTime: 20,
        difficulty: "Medium",
        ingredients: ["Mushroom", "Cream", "Garlic"],
        steps: ["Chop mushrooms", "Cook garlic & cream", "Add mushrooms", "Simmer & serve"]
      },
      {
        id: 2,
        name: "Paneer Butter Masala",
        description: "Rich and creamy paneer curry.",
        img: "https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-butter-masala-1.jpg",
        prepTime: 30,
        difficulty: "Medium",
        ingredients: ["Paneer", "Tomatoes", "Butter", "Cream", "Spices"],
        steps: ["Prepare tomato gravy", "Add paneer cubes", "Add cream & butter", "Simmer & serve"]
      },

      {
        id: 3,
        name: "Chicken Biryani",
        description: "Fragrant layered rice with chicken.",
        img: "https://vismaifood.com/storage/app/uploads/public/e12/7b7/127/thumb__700_0_0_0_auto.jpg",
        prepTime: 60,
        difficulty: "Hard",
        ingredients: ["Rice", "Chicken", "Spices", "Yogurt", "Onions"],
        steps: ["Marinate chicken", "Cook rice", "Layer & bake"]
      },

      {
        id: 4,
        name: "Vegetable Stir Fry",
        description: "Quick and healthy vegetable stir fry.",
        img: "https://images.themodernproper.com/production/posts/VegetableStirFry_9.jpg?w=800&q=82&auto=format&fit=crop&dm=1703377301&s=fec7d0fbeb1b2b6b56acf09df106e7ad",
        prepTime: 15,
        difficulty: "Easy",
        ingredients: ["Broccoli", "Carrot", "Bell pepper", "Soy sauce", "Garlic"],
        steps: ["Chop vegetables", "Heat oil", "Stir fry vegetables", "Add sauce & serve"]
      },

      {
        id: 5,
        name: "Egg Curry",
        description: "Spicy and flavorful egg curry.",
        img: "https://www.spicebangla.com/wp-content/uploads/2024/08/Egg-Masala-Curry.webp",
        prepTime: 25,
        difficulty: "Medium",
        ingredients: ["Eggs", "Onions", "Tomatoes", "Spices", "Oil"],
        steps: ["Boil eggs", "Prepare onion-tomato gravy", "Add spices", "Add eggs & simmer"]
      },
      {
        id: 6,
        name: "Bhindi Masala",
        description: "Stir-fried okra with spices.",
        img: "https://www.whiskaffair.com/wp-content/uploads/2020/11/Bhindi-Masala-2-1.jpg",
        prepTime: 20,
        difficulty: "Easy",
        ingredients: ["Bhindi (Okra)", "Onion", "Tomato", "Spices", "Oil"],
        steps: ["Chop okra", "Fry onions & spices", "Add okra & cook until done"]
      },
      {
        id: 7,
        name: "Egg Omelette",
        description: "Classic Indian style egg omelette.",
        img: "https://c.ndtvimg.com/2020-07/3cqv032o_omelette_625x300_23_July_20.jpg",
        prepTime: 10,
        difficulty: "Easy",
        ingredients: ["Eggs", "Onion", "Tomato", "Green chili", "Salt", "Oil"],
        steps: ["Beat eggs", "Add chopped veggies", "Cook on pan until golden"]
      },
      {
        id: 8,
        name: "Aloo Gobi",
        description: "Potato and cauliflower curry with spices.",
        img: "https://zaykarecipes.com/wp-content/uploads/2022/01/aloo-masala-gobhi.jpg",
        prepTime: 30,
        difficulty: "Medium",
        ingredients: ["Potato", "Cauliflower", "Onion", "Tomato", "Spices"],
        steps: ["Chop vegetables", "Cook onion & tomato gravy", "Add veggies & simmer"]
      }
    ];

    let saved = JSON.parse(localStorage.getItem("recipes") || "[]");
    persistentDefaults.forEach(d => {
      if (!saved.find(r => r.id === d.id)) saved.push(d);
    });

    return saved;
  }

  function saveRecipes(list) {
    localStorage.setItem("recipes", JSON.stringify(list));
  }

  function applyFilters(list) {
    let filtered = [...list];

    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) filtered = filtered.filter(r => r.name.toLowerCase().includes(searchTerm));

    const diff = difficultyFilter.value;
    if (diff !== "All") filtered = filtered.filter(r => r.difficulty === diff);

    const maxTime = Number(timeFilter.value);
    if (maxTime > 0) filtered = filtered.filter(r => r.prepTime <= maxTime);

    return filtered;
  }

  function renderRecipes() {
    const all = getRecipes();
    const list = applyFilters(all);

    recipeList.innerHTML = "";
    if (list.length === 0) {
      msg.style.display = "block";
      return;
    }
    msg.style.display = "none";

    list.forEach(r => {
      const card = document.createElement("div");
      card.className = "card p-0";

      card.innerHTML = `
        <img src="${r.img || 'https://via.placeholder.com/400'}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${r.name}</h5>
          <p class="card-text">${r.description}</p>
          <div class="btn-group">
            <button class="btn btn-info btn-sm" data-id="${r.id}" data-action="view">View</button>
            <button class="btn btn-warning btn-sm" data-id="${r.id}" data-action="edit">Edit</button>
            <button class="btn btn-danger btn-sm" data-id="${r.id}" data-action="delete">Delete</button>
          </div>
        </div>
      `;
      recipeList.appendChild(card);
    });
  }

  renderRecipes();

  searchInput.addEventListener("input", renderRecipes);
  difficultyFilter.addEventListener("change", renderRecipes);
  timeFilter.addEventListener("input", renderRecipes);

  addRecipeBtn.addEventListener("click", () => {
    editId.value = "";
    recipeName.value = "";
    recipeDesc.value = "";
    recipeImg.value = "";
    recipeTime.value = "";
    recipeDifficulty.value = "";
    recipeIngredients.value = "";
    recipeSteps.value = "";
    modalBg.style.display = "flex";
  });

  cancelBtn.addEventListener("click", () => modalBg.style.display = "none");

  saveBtn.addEventListener("click", () => {
    const name = recipeName.value.trim();
    const desc = recipeDesc.value.trim();
    const img = recipeImg.value.trim();
    const prepTime = Number(recipeTime.value);
    const difficulty = recipeDifficulty.value;
    const ingredients = recipeIngredients.value.split(",").map(i => i.trim()).filter(Boolean);
    const steps = recipeSteps.value.split(",").map(s => s.trim()).filter(Boolean);

    if (!name || !desc || !prepTime || !difficulty) {
      alert("Please fill all required fields!");
      return;
    }

    const list = getRecipes();

    if (editId.value) {
      const id = Number(editId.value);
      const index = list.findIndex(r => r.id === id);
      list[index] = { id, name, description: desc, img, prepTime, difficulty, ingredients, steps };
    } else {
      list.push({ id: Date.now(), name, description: desc, img, prepTime, difficulty, ingredients, steps });
    }

    saveRecipes(list);
    modalBg.style.display = "none";
    renderRecipes();
  });

  recipeList.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const action = btn.dataset.action;
    const r = getRecipes().find(x => x.id === id);

    if (action === "view") {
      viewTitle.innerText = r.name;
      viewImg.src = r.img;
      viewDesc.innerText = r.description;
      viewTime.innerText = r.prepTime;
      viewDifficulty.innerText = r.difficulty;
      viewIngredients.innerHTML = r.ingredients.map(i => `<li>${i}</li>`).join("");
      viewSteps.innerHTML = r.steps.map(s => `<li>${s}</li>`).join("");
      viewModalBg.style.display = "flex";
    }

    if (action === "edit") {
      editId.value = r.id;
      recipeName.value = r.name;
      recipeDesc.value = r.description;
      recipeImg.value = r.img;
      recipeTime.value = r.prepTime;
      recipeDifficulty.value = r.difficulty;
      recipeIngredients.value = r.ingredients.join(", ");
      recipeSteps.value = r.steps.join(", ");
      modalBg.style.display = "flex";
    }

    if (action === "delete") {
      if (r.id <= 8) {
        alert("Cannot delete default recipe!");
        return;
      }
      if (!confirm("Are you sure you want to delete this recipe?")) return;
      const updated = getRecipes().filter(x => x.id !== id);
      saveRecipes(updated);
      renderRecipes();
    }
  });

  closeViewBtn.addEventListener("click", () => viewModalBg.style.display = "none");
  homeBackBtn.addEventListener("click", () => history.back());
});
