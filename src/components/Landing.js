export default function Landing({ setActiveTab }) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="animate-gradient-x bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">AI Studio</h1>
        <p className="text-lg md:text-2xl text-slate-300 mb-8">
          Transform your ideas into reality with AI-powered tools
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12">
        <FeatureCard
          icon="💬"
          title="AI Chat"
          description="Conversational AI with contextual understanding and natural responses"
          onClick={() => setActiveTab("chat")}
        />
        <FeatureCard
          icon="🍳"
          title="Recipe Generator"
          description="Create custom recipes based on ingredients and dietary needs"
          onClick={() => setActiveTab("recipe")}
        />
        <FeatureCard
          icon="🏋️"
          title="Workout Generator"
          description="Personalized workout plans based on your goals and preferences"
          onClick={() => setActiveTab("workout")}
        />
      </div>
    </div>
  );
}

const FeatureCard = ({ icon, title, description, onClick }) => (
  <div
    className="bg-slate-800/50 p-6 rounded-2xl hover:bg-slate-800/80 transition-all cursor-pointer hover:-translate-y-1 group"
    onClick={onClick}
  >
    <div className="text-4xl mb-4 transition-transform group-hover:scale-110">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-slate-100">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);
