interface OverviewProps {
    theme: 'light' | 'dark';
}

const Overview = ({ theme }: OverviewProps) => {
    const isDark = theme === 'dark';

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12">
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
                    <span className="w-8 h-px bg-primary/30"></span>
                    Getting Started
                </div>
                <h1 className={`text-4xl md:text-5xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-[#18181B]'} mb-6`}>
                    Overview
                </h1>
                <p className={`text-xl ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} leading-relaxed max-w-2xl`}>
                    Welcome to the ParrotPod Documentation. ParrotPod is an advanced 
                    AI-powered orchestration platform designed to streamline 
                    voice interactions, workflows, and integrations.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    {
                        title: "Voice-First Agents",
                        description: "Build cutting-edge conversational agents powered by LiveKit and high-performance LLMs.",
                        icon: "🎙️"
                    },
                    {
                        title: "Dynamic Workflows",
                        description: "Orchestrate complex tasks with an intuitive, real-time automation engine.",
                        icon: "⚙️"
                    },
                    {
                        title: "Seamless Integrations",
                        description: "Connect to your favorite tools—Deepgram, and more—with just a single configuration.",
                        icon: "🔌"
                    },
                    {
                        title: "Developer Focused",
                        description: "Extensible architecture built for scalability and ease of deployment.",
                        icon: "💻"
                    }
                ].map((feature, idx) => (
                    <div key={idx} className={`p-6 rounded-2xl ${isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E4E4E7] shadow-sm'} border hover:border-primary/50 transition-colors group`}>
                        <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
                            {feature.icon}
                        </div>
                        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#18181B]'} mb-2`}>{feature.title}</h3>
                        <p className={`text-sm ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} leading-relaxed`}>
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>

            <section className={`mt-16 p-8 rounded-3xl ${isDark ? 'bg-gradient-to-br from-primary/10 to-transparent' : 'bg-primary/5 shadow-sm border-primary/10'} border border-primary/20 relative overflow-hidden`}>
                <div className="relative z-10">
                    <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#18181B]'} mb-4`}>Quick Start</h2>
                    <p className={`${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} mb-6`}>
                        Jump straight into the Action by setting up your local environment or deploying to the cloud.
                    </p>
                    <div className="flex gap-4">
                        <div className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform cursor-pointer">
                            Environment Setup
                        </div>
                        <div className={`px-5 py-2.5 ${isDark ? 'bg-[#27272A] text-white border-[#3F3F46]' : 'bg-[#E4E4E7] text-[#18181B] border-[#D4D4D8]'} rounded-xl text-sm font-bold border hover:bg-primary/10 transition-all cursor-pointer`}>
                            Browse Tools
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Overview;
