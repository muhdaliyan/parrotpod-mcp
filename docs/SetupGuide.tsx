interface SetupGuideProps {
    theme: 'light' | 'dark';
}

const SetupGuide = ({ theme }: SetupGuideProps) => {
    const isDark = theme === 'dark';

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12">
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
                    <span className="w-8 h-px bg-primary/30"></span>
                    Installation
                </div>
                <h1 className={`text-4xl md:text-5xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-[#18181B]'} mb-6`}>
                    Local Setup
                </h1>
                <p className={`text-xl ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} leading-relaxed max-w-2xl`}>
                    Get ParrotPod running on your local machine. Configure your environment 
                    variables and use our automated setup for a seamless start.
                </p>
            </header>

            <section className="space-y-6">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#18181B]'} mb-4`}>Prerequisites</h2>
                <div className={`p-6 rounded-2xl ${isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E4E4E7] shadow-sm'} border`}>
                    <ul className={`space-y-3 ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} text-sm`}>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Node.js (v18+)</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Python (v3.10+)</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> SQLite3</li>
                    </ul>
                </div>
            </section>

            <section className="space-y-6 mt-12">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#18181B]'} mb-4`}>Environment Configuration</h2>
                <p className={`${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} text-sm leading-relaxed mb-6`}>
                    Create a <code className={`px-1.5 py-0.5 ${isDark ? 'bg-[#27272A]' : 'bg-[#F4F4F5]'} rounded font-mono text-primary`}>.env</code> 
                    file in your backend directory and add the following variables:
                </p>
                
                <div className={`rounded-2xl ${isDark ? 'bg-[#09090B] border-[#27272A]' : 'bg-[#18181B] border-[#27272A]'} border overflow-hidden shadow-2xl`}>
                    <div className="px-4 py-2 bg-[#18181B] border-b border-[#27272A] flex items-center justify-between">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                        </div>
                        <span className="text-[10px] font-mono text-[#52525B]">backend/.env</span>
                    </div>
                    <pre className="p-6 overflow-x-auto text-xs font-mono leading-relaxed selection:bg-primary/40">
                        <code className="text-[#A1A1AA]">
{`# ─── LiveKit ──────────────────────────────────────
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret

# ─── Deepgram ─────────────────────────────────────
DEEPGRAM_API_KEY=your_deepgram_api_key

# ─── OpenAI ───────────────────────────────────────
OPENAI_API_KEY=your_openai_api_key

# ─── Database ─────────────────────────────────────
DATABASE_PATH=./parrotpod.db

# ─── App ──────────────────────────────────────────
FRONTEND_URL=http://localhost:3000`}
                        </code>
                    </pre>
                </div>
            </section>

            <section className="space-y-6 mt-12">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#18181B]'} mb-4`}>Automated Setup</h2>
                <div className="space-y-4">
                    <div className={`p-5 rounded-xl ${isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E4E4E7] shadow-sm'} border`}>
                        <p className={`font-bold text-xs mb-3 ${isDark ? 'text-white' : 'text-[#18181B]'}`}>1. Run Unified Setup</p>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-[#09090B]' : 'bg-[#F4F4F5]'} border ${isDark ? 'border-[#3F3F46]' : 'border-[#E4E4E7]'}`}>
                            <code className="text-primary text-xs font-mono">npm run setup:all</code>
                        </div>
                        <p className={`mt-2 text-[10px] ${isDark ? 'text-[#71717A]' : 'text-[#A1A1AA]'}`}>This command installs all dependencies for both frontend and backend modules.</p>
                    </div>
                    <div className={`p-5 rounded-xl ${isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E4E4E7] shadow-sm'} border`}>
                        <p className={`font-bold text-xs mb-3 ${isDark ? 'text-white' : 'text-[#18181B]'}`}>2. Launch Development Servers</p>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-[#09090B]' : 'bg-[#F4F4F5]'} border ${isDark ? 'border-[#3F3F46]' : 'border-[#E4E4E7]'}`}>
                            <code className="text-primary text-xs font-mono">npm run dev</code>
                        </div>
                        <p className={`mt-2 text-[10px] ${isDark ? 'text-[#71717A]' : 'text-[#A1A1AA]'}`}>Starts the backend API, voice agent, and frontend dashboard simultaneously.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SetupGuide;
