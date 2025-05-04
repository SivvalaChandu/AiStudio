const API_BASE = process.env.REACT_APP_API_URL;
export const askAI = async (prompt) => {
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });
    return await response.json();
  } catch (error) {
    throw new Error("Failed to get AI response");
  }
};

export const getRecipe = async (data) => {
  try {
    const response = await fetch(`${API_BASE}/recipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: data.ingredients,
        cuisine: data.cuisine,
        diet: data.diet,
      }),
    });
    return await response.json();
  } catch (error) {
    throw new Error("Failed to generate recipe");
  }
};

export const getWorkout = async (data) => {
  try {
    const response = await fetch(`${API_BASE}/workout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workoutType: data.type,
        muscleGroups: data.muscles,
        duration: data.duration,
      }),
    });
    return await response.json();
  } catch (error) {
    throw new Error("Failed to generate workout");
  }
};
