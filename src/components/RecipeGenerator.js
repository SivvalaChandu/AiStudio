import { useState } from "react";
import { FiCoffee } from "react-icons/fi";
import { getRecipe } from "../utils/api";
import TypewriterEffect from "./TypewriterEffect";

const cuisineOptions = [
  "Any Cuisine",
  "Italian",
  "Mexican",
  "Japanese",
  "Indian",
  "Mediterranean",
  "Chinese",
  "French",
];

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState(cuisineOptions[0]);
  const [diet, setDiet] = useState("");
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const generateRecipe = async () => {
    if (!ingredients.trim()) {
      setError("Please enter at least one ingredient");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      const data = await getRecipe({
        ingredients,
        cuisine: cuisine === "Any Cuisine" ? "" : cuisine,
        diet,
      });
      setRecipe(data.candidates[0].content.parts[0].text);
    } catch (err) {
      setError(err.message);
      setRecipe("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        <div className="min-w-3xl lg:max-w-[80%] mx-auto space-y-6">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div className="bg-slate-800/50 rounded-2xl p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <input
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="Ingredients (e.g. chicken, potatoes)"
                  className="w-full bg-slate-700/50 border border-slate-700 rounded-xl px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <input
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                  placeholder="Dietary needs (e.g. vegetarian)"
                  className="w-full bg-slate-700/50 border border-slate-700 rounded-xl px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div className="space-y-4">
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  {cuisineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button
                  onClick={generateRecipe}
                  disabled={isLoading}
                  className="w-full bg-cyan-500/90 hover:bg-cyan-500 px-6 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <FiCoffee className="text-lg" />
                  {isLoading ? "Generating..." : "Generate Recipe"}
                </button>
              </div>
            </div>
            <div className="text-slate-400 text-sm text-center">
              Note: AI-generated recipes may be inaccurate. Please verify before
              cooking.
            </div>
          </div>

          {recipe && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <TypewriterEffect text={recipe} key={recipe} typingSpeed={20} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
