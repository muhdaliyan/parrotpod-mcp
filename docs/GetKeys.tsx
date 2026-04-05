interface GetKeysProps {
    theme: 'light' | 'dark';
}

const GetKeys = ({ theme }: GetKeysProps) => {
    const isDark = theme === 'dark';
    
    const keyGuides = [
        {
            name: "LiveKit Cloud",
            tag: "Free Tier",
            description: "Get high-performance WebRTC infrastructure for free. Perfect for testing and small-scale voice agents.",
            steps: [
                "Go to [LiveKit Cloud](https://cloud.livekit.io/)",
                "Create a new project.",
                "Navigate to 'Settings' > 'Keys'.",
                "Copy your URL, API Key, and API Secret."
            ],
            limitations: "Up to 5 simultaneous users and limited bandwidth on the free tier."
        },
        {
            name: "Deepgram",
            tag: "$200 Free Credits",
            description: "Industry-leading speech-to-text with massive free credits for new developers. No credit card required for initial trial.",
            steps: [
                "Sign up at [Deepgram Console](https://console.deepgram.com/)",
                "Receive $200 in free credits automatically.",
                "Create an API Key with 'Administrator' or 'Member' role.",
                "Save your API Key."
            ],
            limitations: "$200 credits covers roughly 45,000 minutes of transcription."
        },
        {
            name: "Google AI Studio (Gemini)",
            tag: "Free with Limits",
            description: "Access Google's most capable models (Gemini 1.5 Pro/Flash) for free through AI Studio.",
            steps: [
                "Visit [Google AI Studio](https://aistudio.google.com/)",
                "Sign in with your Google account.",
                "Click 'Get API key' on the left sidebar.",
                "Generate a new API key for your project."
            ],
            limitations: "Free tier usage is subject to rate limits and your data may be used to improve Google products (use cautiously with sensitive data)."
        },
        {
            name: "OpenAI",
            tag: "Paid / Credits",
            description: "Power your agents with industry-standard models like GPT-4o. Requires a valid billing account.",
            steps: [
                "Sign up at [OpenAI Platform](https://platform.openai.com/)",
                "Navigate to 'Organization' > 'Billing' to add credits.",
                "Go to 'API Keys' section.",
                "Create a new Secret Key."
            ],
            limitations: "Requires credit balance for API calls. Rate limits apply based on your tier."
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12">
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
                    <span className="w-8 h-px bg-primary/30"></span>
                    Access
                </div>
                <h1 className={`text-4xl md:text-5xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-[#18181B]'} mb-6`}>
                    Get Your API Keys
                </h1>
                <p className={`text-xl ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} leading-relaxed max-w-2xl`}>
                    ParrotPod relies on several external services. Here is how you can 
                    get started with free tiers and massive developer credits.
                </p>
            </header>

            <div className="space-y-10">
                {keyGuides.map((guide, idx) => (
                    <section key={idx} className={`p-8 rounded-3xl ${isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E4E4E7]'} border shadow-sm`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#18181B]'}`}>{guide.name}</h2>
                                <span className="inline-block mt-2 px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full border border-primary/20">
                                    {guide.tag}
                                </span>
                            </div>
                        </div>
                        
                        <p className={`${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} text-sm leading-relaxed mb-6`}>
                            {guide.description}
                        </p>

                        <div className="space-y-4 mb-8">
                            <h4 className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-[#71717A]' : 'text-[#A1A1AA]'}`}>Steps to get started:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {guide.steps.map((step, sIdx) => (
                                    <div key={sIdx} className={`flex gap-3 p-3 rounded-xl ${isDark ? 'bg-[#09090B]' : 'bg-[#F4F4F5]'}`}>
                                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                                            {sIdx + 1}
                                        </span>
                                        <p className={`text-xs ${isDark ? 'text-[#E4E4E7]' : 'text-[#18181B]'} leading-normal`}>
                                            {/* Basic markdown link parsing for simplicity */}
                                            {step.split(/\[(.*?)\]\((.*?)\)/).map((part, pIdx) => {
                                                if (pIdx % 3 === 1) return <a key={pIdx} href={step.split(/\[(.*?)\]\((.*?)\)/)[pIdx+1]} target="_blank" rel="noreferrer" className="text-primary hover:underline">{part}</a>;
                                                if (pIdx % 3 === 2) return null;
                                                return part;
                                            })}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`p-4 rounded-xl ${isDark ? 'bg-primary/5 border-primary/10' : 'bg-primary/5 border-primary/20'} border`}>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Free Tier Limitations:</p>
                            <p className={`text-xs ${isDark ? 'text-[#71717A]' : 'text-[#52525B]'} leading-relaxed`}>
                                {guide.limitations}
                            </p>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default GetKeys;
