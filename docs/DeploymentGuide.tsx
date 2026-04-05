import React from 'react';
import { Rocket } from 'lucide-react';

interface DeploymentGuideProps {
    theme: 'light' | 'dark';
}

const DeploymentGuide = ({ theme }: DeploymentGuideProps) => {
    const isDark = theme === 'dark';

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12">
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
                    <span className="w-8 h-px bg-primary/30"></span>
                    Production
                </div>
                <h1 className={`text-4xl md:text-5xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-[#18181B]'} mb-6`}>
                    Deployment (Render)
                </h1>
                <p className={`text-xl ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} leading-relaxed max-w-2xl`}>
                    Deploy ParrotPod to the cloud using Render's scalable infrastructure. 
                    Our repository is optimized for one-click Docker deployments.
                </p>
            </header>

            <section className="space-y-8">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#18181B]'} mb-4`}>Render Deployment Steps</h2>
                
                <div className="space-y-10">
                    {[
                        {
                            title: "Repository Setup",
                            desc: "Connect your repository to Render. Since ParrotPod is a mono-repo, Render will handle everything through our Docker configuration.",
                            details: <>Ensure your repository is <strong>Public</strong> for the easiest setup, or grant Render access to your private repo.</>
                        },
                        {
                            title: "Service Creation",
                            desc: <>Create a new <strong>Web Service</strong> on Render.</>,
                            details: <>Paste your GitHub repository URL. Render will automatically detect the <strong>Dockerfile</strong> in the root directory.</>
                        },
                        {
                            title: "Region & Runtime",
                            desc: "Select your preferred region (e.g., Oregon, Frankfurt) for lowest latency.",
                            details: <>The runtime will be automatically set to <strong>Docker</strong>. No manual environment selection is needed.</>
                        },
                        {
                            title: "Environment Variables",
                            desc: "Add all required keys from your local `.env.example`.",
                            details: "This includes LIVEKIT_URL, DEEPGRAM_API_KEY, and OPENAI_API_KEY. Use the 'Secret Files' or 'Environment Variables' section on Render."
                        }
                    ].map((step, idx) => (
                        <div key={idx} className="flex gap-6">
                            <div className="flex-shrink-0 flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-primary text-sm">
                                    {idx + 1}
                                </div>
                                {idx < 3 && <div className={`w-px h-full mt-2 ${isDark ? 'bg-[#27272A]' : 'bg-[#E4E4E7]'}`}></div>}
                            </div>
                            <div className="pb-10">
                                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-[#18181B]'} mb-2`}>{step.title}</h3>
                                <p className={`${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} text-sm leading-relaxed mb-3`}>
                                    {step.desc}
                                </p>
                                <div className={`p-4 rounded-xl ${isDark ? 'bg-[#18181B]' : 'bg-[#F4F4F5]'} border ${isDark ? 'border-[#27272A]' : 'border-[#E4E4E7]'}`}>
                                    <p className={`text-[11px] leading-relaxed ${isDark ? 'text-[#71717A]' : 'text-[#71717A]'}`}>
                                        <strong>Pro Tip:</strong> {step.details}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-6 mt-12">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#18181B]'} mb-4`}>SPA Routing (Important)</h2>
                <div className={`p-6 rounded-2xl ${isDark ? 'bg-primary/5 border-primary/10' : 'bg-primary/5 border-primary/20'} border`}>
                    <p className={`${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} text-sm leading-relaxed mb-4`}>
                        ParrotPod uses <strong>Path-Based Routing</strong> (History API). To ensure that direct links like 
                        <code className="px-1.5 py-0.5 bg-primary/10 rounded font-mono text-primary mx-1">/docs/setup</code> 
                        work correctly upon page refresh, you must configure your hosting provider to redirect all 
                        non-file requests to <code className="px-1.5 py-0.5 bg-primary/10 rounded font-mono text-primary mx-1">index.html</code>.
                    </p>
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-[#09090B]' : 'bg-[#F4F4F5]'} border ${isDark ? 'border-[#27272A]' : 'border-[#E4E4E7]'}`}>
                        <p className={`text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-[#71717A]' : 'text-[#A1A1AA]'} mb-2`}>Render Redirect Rules:</p>
                        <p className={`text-xs ${isDark ? 'text-[#E4E4E7]' : 'text-[#18181B]'} font-mono`}>
                            Source: <code className="text-primary">/*</code><br />
                            Destination: <code className="text-primary">/index.html</code><br />
                            Action: <code className="text-primary">Rewrite</code>
                        </p>
                    </div>
                </div>
            </section>

            <section className={`mt-16 p-8 rounded-3xl ${isDark ? 'bg-primary/5 border-primary/10' : 'bg-primary/5 border-primary/20'} border`}>
                <h3 className={`font-bold mb-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#18181B]'}`}>
                    <Rocket size={18} className="text-primary" />
                    Finalize Deployment
                </h3>
                <p className={`${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} text-sm leading-relaxed`}>
                    Click <strong>Deploy Web Service</strong>. Render will build the Docker image and deploy your instance. 
                    Once complete, your ParrotPod dashboard will be live at the provided Render URL.
                </p>
            </section>
        </div>
    );
}

export default DeploymentGuide;
