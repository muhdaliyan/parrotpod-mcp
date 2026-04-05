import React from 'react';
import { Phone, ChevronRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface TelephonyProps {
    theme: 'light' | 'dark';
}

const Telephony = ({ theme }: TelephonyProps) => {
    const isDark = theme === 'dark';

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12">
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-3">
                    <span className="w-8 h-px bg-primary/30"></span>
                    Communication
                </div>
                <h1 className={`text-4xl md:text-5xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-[#18181B]'} mb-6`}>
                    Telephony & Voice
                </h1>
                <p className={`text-xl ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} leading-relaxed max-w-2xl`}>
                    Connect your AI agents to the real world. Buy phone numbers, 
                    manage your inventory, and receive calls directly through ParrotPod.
                </p>
            </header>

            <section className="space-y-8">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#18181B]'} mb-4`}>1. Get a LiveKit Number</h2>
                <div className={`p-8 rounded-3xl ${isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E4E4E7] shadow-sm'} border relative overflow-hidden group`}>
                    <div className="space-y-6 relative z-10">
                        <div className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-primary font-bold text-sm">1</span>
                            </div>
                            <p className={`${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} text-sm leading-relaxed`}>
                                Log in to your <strong>LiveKit Cloud</strong> console and navigate to the <strong>Telephony</strong> section in the left sidebar.
                            </p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-primary font-bold text-sm">2</span>
                            </div>
                            <p className={`${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} text-sm leading-relaxed`}>
                                Click on <strong>Phone Numbers</strong> and select "Buy Number". <strong>Note:</strong> LiveKit provides 1 phone number for free on their standard cloud tier.
                            </p>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-primary font-bold text-sm">3</span>
                            </div>
                            <p className={`${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} text-sm leading-relaxed`}>
                                Choose your desired area code and finalize the purchase. The number will now be linked to your LiveKit project.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-8 mt-12">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#18181B]'} mb-4`}>2. Manage in ParrotPod</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E4E4E7] shadow-sm'} border`}>
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck className="text-primary" size={20} />
                            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-[#18181B]'}`}>Inventory Check</h3>
                        </div>
                        <p className={`${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} text-xs leading-relaxed`}>
                            Open the <strong>Inventory</strong> tab in ParrotPod. Your new number will automatically appear under <strong>My Numbers</strong>. 
                            If it doesn't show up, ensure your LIVEKIT_API_KEY is correctly configured.
                        </p>
                    </div>
                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-[#E4E4E7] shadow-sm'} border`}>
                        <div className="flex items-center gap-3 mb-4">
                            <Zap className="text-primary" size={20} />
                            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-[#18181B]'}`}>Automatic Dispatch</h3>
                        </div>
                        <p className={`${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} text-xs leading-relaxed`}>
                            When you assign a number to an agent, ParrotPod <strong>automatically creates a Dispatch Rule</strong>. 
                            This ensures that any incoming call to that number is instantly routed to your AI agent.
                        </p>
                    </div>
                </div>
            </section>

            <section className={`mt-16 p-8 rounded-3xl ${isDark ? 'bg-primary/5 border-primary/10' : 'bg-primary/5 border-primary/20'} border`}>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <h3 className={`text-xl font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#18181B]'}`}>
                            <Phone size={24} className="text-primary" />
                            Ready to take calls?
                        </h3>
                        <p className={`${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'} text-sm leading-relaxed mb-6`}>
                            Once assigned, your agent is live. You can test it by calling your new number from any phone. 
                            The agent will answer using the voice and personality you've configured in the dashboard.
                        </p>
                        <ul className="space-y-2">
                            {['One free number included', 'Automatic SIP trunking', 'Real-time call logs', 'Seamless agent assignment'].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-[11px] font-bold text-primary italic">
                                    <CheckCircle2 size={12} /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`w-full md:w-64 h-48 rounded-2xl flex items-center justify-center ${isDark ? 'bg-[#09090B]' : 'bg-[#F4F4F5]'} border ${isDark ? 'border-[#27272A]' : 'border-[#E4E4E7]'}`}>
                        <div className="text-center">
                            <div className="text-4xl mb-2 animate-bounce">📱</div>
                            <p className={`text-[10px] font-mono ${isDark ? 'text-[#52525B]' : 'text-[#A1A1AA]'}`}>Waiting for call...</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Telephony;
