interface AboutProps {
    theme: 'light' | 'dark';
}

const About = ({ theme }: AboutProps) => {
    const isDark = theme === 'dark';

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12">
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
                    <span className="w-8 h-px bg-primary/30"></span>
                    Learn More
                </div>
                <h1 className={`text-4xl md:text-5xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-[#18181B]'} mb-6`}>
                    About ParrotPod
                </h1>
                <p className={`text-xl ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} leading-relaxed max-w-2xl`}>
                    ParrotPod is built by developers, for developers. Our mission is to democratize 
                    access to advanced AI technologies through a unified, powerful platform.
                </p>
            </header>

            <section className={`p-8 rounded-3xl ${isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E4E4E7] shadow-sm'} border relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 p-8 text-primary shadow-2xl opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5l10-5l-10-5zM2 17l10 5l10-5M2 12l10 5l10-5" />
                    </svg>
                </div>
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#18181B]'} mb-4`}>The Vision</h2>
                <p className={`${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} leading-relaxed mb-6`}>
                    In a world where AI is rapidly evolving, ParrotPod serves as the bridge between 
                    complex machine learning models and practical, real-world applications. 
                    We believe in an open, extensible future where AI agents are accessible to all.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-[#F4F4F5] border-[#E4E4E7]'}`}>
                        <h4 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-[#18181B]'}`}>Modern Stack</h4>
                        <p className={`${isDark ? 'text-[#71717A]' : 'text-[#71717A]'} text-xs`}>Built on React, FastAPI, and latest AI standards.</p>
                    </div>
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-[#F4F4F5] border-[#E4E4E7]'}`}>
                        <h4 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-[#18181B]'}`}>Open Source</h4>
                        <p className={`${isDark ? 'text-[#71717A]' : 'text-[#71717A]'} text-xs`}>Community-driven and transparent engineering.</p>
                    </div>
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-[#27272A] border-[#3F3F46]' : 'bg-[#F4F4F5] border-[#E4E4E7]'}`}>
                        <h4 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-[#18181B]'}`}>Low Latency</h4>
                        <p className={`${isDark ? 'text-[#71717A]' : 'text-[#71717A]'} text-xs`}>Optimized for high-performance voice interactions.</p>
                    </div>
                </div>
            </section>

            <section className="mt-12 text-center py-16">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#18181B]'} mb-4`}>Built With</h3>
                <div className={`flex flex-wrap justify-center gap-8 ${isDark ? 'opacity-50 grayscale hover:grayscale-0' : 'opacity-70'} hover:opacity-100 transition-all duration-500`}>
                    <span className={isDark ? 'text-white font-bold' : 'text-[#18181B] font-bold'}>React</span>
                    <span className={isDark ? 'text-white font-bold' : 'text-[#18181B] font-bold'}>FastAPI</span>
                    <span className={isDark ? 'text-white font-bold' : 'text-[#18181B] font-bold'}>LiveKit</span>
                    <span className={isDark ? 'text-white font-bold' : 'text-[#18181B] font-bold'}>Deepgram</span>
                    <span className={isDark ? 'text-white font-bold' : 'text-[#18181B] font-bold'}>OpenAI</span>
                    <span className={isDark ? 'text-white font-bold' : 'text-[#18181B] font-bold'}>Gemini</span>
                </div>
            </section>
        </div>
    );
}

export default About;
