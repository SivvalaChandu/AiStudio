import { useState } from "react";
import { getWorkout } from "../utils/api";
import TypewriterEffect from "./TypewriterEffect";

const WORKOUT_TYPES = ["Strength Training", "Cardio", "HIIT", "Yoga"];
const MUSCLE_GROUPS = ["Chest", "Back", "Legs", "Arms", "Shoulders", "Core"];

export default function WorkoutGenerator() {
  const [workoutType, setWorkoutType] = useState("");
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [duration, setDuration] = useState(30);
  const [workoutPlan, setWorkoutPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleMuscleGroup = (group) => {
    setMuscleGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const generateWorkout = async () => {
    if (!workoutType || muscleGroups.length === 0) {
      setError("Please select type and muscle groups");
      return;
    }

    try {
      setError("");
      setIsLoading(true);

      const data = await getWorkout({
        type: workoutType,
        muscles: muscleGroups,
        duration,
      });

      setWorkoutPlan(data.candidates[0].content.parts[0].text);
    } catch (err) {
      setError(err.message);
      setWorkoutPlan("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto p-4">
      {error && (
        <div className="p-3 mb-4 bg-red-500/20 text-red-300 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="bg-slate-800/50 rounded-2xl p-6">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <select
              value={workoutType}
              onChange={(e) => setWorkoutType(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">Select Workout Type</option>
              {WORKOUT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Duration (minutes)"
            />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {MUSCLE_GROUPS.map((group) => (
                <button
                  key={group}
                  onClick={() => toggleMuscleGroup(group)}
                  className={`p-3 rounded-xl transition-all ${
                    muscleGroups.includes(group)
                      ? "bg-cyan-500/90 text-white"
                      : "bg-slate-700/50 hover:bg-slate-600/50"
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={generateWorkout}
          disabled={isLoading}
          className="w-full bg-cyan-500/90 hover:bg-cyan-500 rounded-xl p-4 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Create Workout Plan"}
        </button>
        <div className="text-slate-400 text-sm text-center mt-4">
          Note: AI-generated workout plans may be inaccurate. Please verify
          before starting.
        </div>

        {workoutPlan && (
          <div className="mt-6 bg-slate-800/50 rounded-2xl p-6 markdown-response">
            <TypewriterEffect
              text={workoutPlan}
              key={workoutPlan}
              typingSpeed={20}
            />
          </div>
        )}
      </div>
    </div>
  );
}
