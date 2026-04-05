interface ToolsSupportProps {
    theme: 'light' | 'dark';
}

const ToolsSupport = ({ theme }: ToolsSupportProps) => {
    const isDark = theme === 'dark';
    
    const tools = [
        {
            name: "Deepgram",
            purpose: "Speech-to-Text & Intelligence",
            description: "Deepgram provides high-performance speech-to-text models for real-time transcription and intelligence tasks.",
            capabilities: ["Real-time transcription", "Low latency", "Multi-language support"]
        },
        {
            name: "LiveKit",
            purpose: "Real-time Communication (RTC)",
            description: "LiveKit powers our real-time voice and video infrastructure, enabling high-quality multi-user connectivity.",
            capabilities: ["Ultra-low latency", "WebRTC connectivity", "Media processing pipeline"]
        },
        {
            name: "OpenAI & Gemini",
            purpose: "Large Language Models (LLM)",
            description: "Integrated support for leading language models to provide intelligent, contextual responses for your agents.",
            capabilities: ["Advanced contextual understanding", "Function calling", "Versatile model selection"]
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12">
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
                    <span className="w-8 h-px bg-primary/30"></span>
                    Integrations
                </div>
                <h1 className={`text-4xl md:text-5xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-[#18181B]'} mb-6`}>
                    Tools Support
                </h1>
                <p className={`text-xl ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} leading-relaxed max-w-2xl`}>
                    ParrotPod seamlessly integrates with industry-leading tools and 
                    services to provide a comprehensive developer experience.
                </p>
            </header>

            <div className="space-y-6">
                {tools.map((tool, idx) => (
                    <div key={idx} className={`p-8 rounded-3xl ${isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E4E4E7] shadow-sm'} border hover:bg-opacity-90 transition-all duration-300 relative group overflow-hidden`}>
                        <div className={`absolute -top-12 -right-12 w-32 h-32 ${isDark ? 'bg-primary/5' : 'bg-primary/5'} rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500`}></div>
                        <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#18181B]'} mb-2`}>{tool.name}</h3>
                        <p className="text-primary font-bold text-xs uppercase tracking-widest mb-4">{tool.purpose}</p>
                        <p className={`${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} leading-relaxed mb-6 max-w-2xl`}>
                            {tool.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {tool.capabilities.map((cap, cIdx) => (
                                <span key={cIdx} className={`px-3 py-1 rounded-full ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-[#F4F4F5] border-[#E4E4E7]'} text-[#71717A] text-[10px] font-bold border`}>
                                    {cap}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <section className="mt-16 text-center">
                <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-[#18181B]'}`}>Integrate Your Own Tool</h3>
                <p className={`${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} text-sm mb-6 max-w-lg mx-auto`}>
                    ParrotPod is designed to be extensible. Our plugin architecture allows 
                    you to add support for custom APIs and models with minimal effort.
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-bold hover:underline cursor-pointer">
                    Developer Guide coming soon <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
            </section>
        </div>
    );
}

export default ToolsSupport;
