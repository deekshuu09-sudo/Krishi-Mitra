import { useState } from "react";
import councils from "./councils";
export default function App() { const [chatOpen, setChatOpen] = useState(false);
const [chatInput, setChatInput] = useState("");
const [messages, setMessages] = useState([ { sender: "bot", text: "Hello! Ask me anything about farming, weather, health, education, or local services.", },
]); const [loggedIn, setLoggedIn] = useState(false); const [role, setRole] = useState("Farmer");
const [cameraOn, setCameraOn] = useState(false);
const [language, setLanguage] = useState("english");
function sendMessage() {
  if (!chatInput.trim()) return;
  const userMessage = { sender: "user", text: chatInput };
  const text = chatInput.toLowerCase();
  let botReply = "I can answer lots of questions, especially about farming, weather, markets, and local services. Ask anything you need help with.";

  if (text.includes("rice")) {
    botReply = "Rice grows best in clay soil with high water availability.";
  } else if (text.includes("disease")) {
    botReply = "Upload a crop image in Disease Detection for AI analysis.";
  } else if (text.includes("weather")) {
    botReply = "Check the Weather Alerts section for live weather updates.";
  } else if (text.includes("fertilizer")) {
    botReply = "Organic compost and neem cake are good natural fertilizers.";
  } else if (text.includes("education") || text.includes("school") || text.includes("college")) {
    botReply = "For education questions, I can help explain study options, local school support, or helpful learning resources.";
  } else if (text.includes("health") || text.includes("doctor") || text.includes("hospital")) {
    botReply = "For health questions, I can share general wellness advice and suggest checking with local health services.";
  } else if (text.includes("technology") || text.includes("internet") || text.includes("phone")) {
    botReply = "I can help with simple tech questions, such as using mobile phones, apps, and staying safe online.";
  } else if (text.includes("how") || text.includes("what") || text.includes("why") || text.includes("when") || text.includes("where")) {
    botReply = "Ask your question in one sentence and I’ll give you a helpful answer or point you to the right resource.";
  } else {
    botReply = "I can assist with many questions — farming, weather, market prices, health, education, and local support. Please tell me what you want to know.";
  }

  const botMessage = { sender: "bot", text: botReply };
  setMessages((prev) => [...prev, userMessage, botMessage]);
  setChatInput("");
}
const translations = { english: { title: "Krishi Mitra", subtitle: "Organic & Sustainable Agriculture Platform", username: "Enter Username", password: "Enter Password", login: "Login", farmer: "Farmer", official: "Official", platform: "Ministry of Agriculture - Digital Support System", language: "Language", }, telugu: { title: "కృషి మిత్ర", subtitle: "సేంద్రీయ మరియు నిలకడైన వ్యవసాయ వేదిక", username: "వినియోగదారు పేరు నమోదు చేయండి", password: "పాస్‌వర్డ్ నమోదు చేయండి", login: "లాగిన్", farmer: "రైతు", official: "అధికారి", platform: "ప్రభుత్వ సేంద్రీయ వ్యవసాయ మద్దతు వేదిక", language: "భాష", }, hindi: { title: "कृषि मित्र", subtitle: "जैविक खेती AI प्लेटफॉर्म", username: "यूज़रनेम दर्ज करें", password: "पासवर्ड दर्ज करें", login: "लॉगिन", farmer: "किसान", official: "अधिकारी", platform: "सरकारी जैविक खेती सहायता मंच", language: "भाषा", },
}; const t = translations[language]; if (!loggedIn) { return ( <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center p-6"> <div className="bg-white w-full max-w-md rounded-lg shadow-2xl p-8 border border-blue-200"> {/* LANGUAGE SELECTOR */} <div className="flex justify-end mb-4"> <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border rounded-xl px-3 py-2" > <option value="english">English</option> <option value="telugu">తెలుగు</option> <option value="hindi">हिंदी</option> </select> </div> {/* LOGO */} <div className="text-center mb-8"> <div className="mb-6"> <svg className="w-20 h-20 mx-auto text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 110 16 8 8 0 010-16z" /> </svg> </div> <h1 className="text-4xl font-bold text-blue-900 mb-2"> {t.title} </h1> <p className="text-gray-600"> {t.subtitle} </p> </div> {/* FORM */} <div className="space-y-5"> <input type="text" placeholder={t.username} className="w-full border rounded-2xl p-4" /> <input type="password" placeholder={t.password} className="w-full border rounded-2xl p-4" /> <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border rounded-2xl p-4" > <option>{t.farmer}</option> <option>{t.official}</option> </select> <button onClick={() => setLoggedIn(true)} className="w-full bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-2xl text-lg font-semibold transition" > {t.login} </button> </div> <div className="mt-8 text-center text-gray-500 text-sm"> {t.platform} </div> </div> </div> );
}
return ( <> <Dashboard role={role} language={language} /> {/* Floating AI Chatbot */} <div className="fixed bottom-6 right-6 z-50"> {!chatOpen ? ( <button onClick={() => setChatOpen(true)} className="bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-full shadow-2xl flex items-center justify-center w-14 h-14" > <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /> </svg> </button> ) : ( <div className="w-80 bg-white rounded-lg shadow-2xl overflow-hidden border border-green-200"> <div className="bg-blue-700 text-white p-4 flex justify-between items-center"> <h3 className="font-bold text-lg"> AI Assistant </h3> <button onClick={() => setChatOpen(false)} className="hover:opacity-75"> <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"> <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /> </svg> </button> </div> <div className="h-80 overflow-y-auto p-4 space-y-3 bg-blue-50"> {messages.map((msg, index) => ( <div key={index} className={`p-3 rounded-2xl max-w-[80%] ${ msg.sender === "user" ? "bg-blue-700 text-white ml-auto" : "bg-white shadow" }`} > {msg.text} </div> ))} </div> <div className="p-3 flex gap-2 border-t"> <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask anything—I'm here to help." className="flex-1 border rounded-xl px-3 py-2 outline-none" /> <button onClick={sendMessage} className="bg-blue-700 hover:bg-blue-800 text-white px-4 rounded-xl" > Send </button> </div> </div> )} </div> </>
);
} /* ================= DASHBOARD ================= */
const dashboardText = { english: { dashboard: "Dashboard", councils: "Regional Councils", disease: "Disease Detection", crop: "Crop Recommendation", schemes: "Government Schemes", market: "Market Prices", weather: "Weather Alerts", notifications: "Notifications", soil: "Soil Testing", register: "Farmer Registration", feedback: "Farmer Feedback", yield: "Yield Prediction", analytics: "Analytics", logged: "Logged in as", awareness: "Organic Awareness",
store: "Organic Store",
videos: "Video Tutorials", }, telugu: { dashboard: "డాష్‌బోర్డ్", councils: "ప్రాంతీయ మండళ్లు", disease: "వ్యాధి గుర్తింపు", crop: "పంట సిఫార్సు", schemes: "ప్రభుత్వ పథకాలు", market: "మార్కెట్ ధరలు", weather: "వాతావరణ హెచ్చరికలు", notifications: "నోటిఫికేషన్లు", soil: "మట్టి పరీక్ష", register: "రైతు నమోదు", feedback: "రైతు అభిప్రాయం", yield: "పంట అంచనా", analytics: "విశ్లేషణలు", logged: "లాగిన్ అయినది", awareness: "సేంద్రీయ అవగాహన",
store: "ఆర్గానిక్ స్టోర్",
videos: "వీడియో పాఠాలు", }, hindi: { dashboard: "डैशबोर्ड", councils: "क्षेत्रीय परिषद", disease: "रोग पहचान", crop: "फसल सिफारिश", schemes: "सरकारी योजनाएं", market: "बाजार मूल्य", weather: "मौसम अलर्ट", notifications: "सूचनाएं", soil: "मिट्टी परीक्षण", register: "किसान पंजीकरण", feedback: "किसान प्रतिक्रिया", yield: "उपज भविष्यवाणी", analytics: "विश्लेषण", logged: "लॉग इन", awareness: "जैविक जागरूकता",
store: "ऑर्गेनिक स्टोर",
videos: "वीडियो ट्यूटोरियल", },
};
function Dashboard({ role, language }) { const [activePage, setActivePage] = useState("dashboard");
const t = dashboardText[language]; return ( <div className="flex min-h-screen bg-blue-50"> {/* SIDEBAR */} <div className="w-72 bg-white shadow-xl p-6 flex flex-col"> <h1 className="text-3xl font-bold text-blue-900 mb-8"> Krishi Mitra </h1> <div className="space-y-4"> <SidebarButton title={t.dashboard} active={activePage === "dashboard"} onClick={() => setActivePage("dashboard")} /> <SidebarButton
title={t.councils} active={activePage === "councils"} onClick={() => setActivePage("councils")} /> <SidebarButton title={t.disease} active={activePage === "disease"} onClick={() => setActivePage("disease")} /> <SidebarButton title={t.crop} active={activePage === "crop"} onClick={() => setActivePage("crop")} /> <SidebarButton title={t.schemes} active={activePage === "schemes"} onClick={() => setActivePage("schemes")} /> <SidebarButton title={t.market} active={activePage === "market"} onClick={() => setActivePage("market")} /> <SidebarButton title={t.weather} active={activePage === "weather"} onClick={() => setActivePage("weather")} /> <SidebarButton title={t.awareness} active={activePage === "awareness"} onClick={() => setActivePage("awareness")}
/> <SidebarButton title={t.store} active={activePage === "store"} onClick={() => setActivePage("store")}
/> <SidebarButton title={t.videos} active={activePage === "videos"} onClick={() => setActivePage("videos")}
/> <SidebarButton title={t.notifications} active={activePage === "notifications"} onClick={() => setActivePage("notifications")} /> <SidebarButton title={t.soil} active={activePage === "soil"} onClick={() => setActivePage("soil")}
/>
<SidebarButton title={t.register} active={activePage === "register"} onClick={() => setActivePage("register")}
/>
<SidebarButton title={t.feedback} active={activePage === "feedback"} onClick={() => setActivePage("feedback")}
/>
<SidebarButton title={t.yield} active={activePage === "yield"} onClick={() => setActivePage("yield")}
/>
<SidebarButton title={t.analytics} active={activePage === "analytics"} onClick={() => setActivePage("analytics")}
/> </div> <div className="mt-auto"> <div className="bg-blue-50 p-4 rounded-2xl text-center"> <div className="text-gray-500"> {t.logged} </div> <div className="font-bold text-blue-900 text-xl mt-1"> {role} </div> </div> </div> </div> {/* MAIN CONTENT */} <div className="flex-1 p-8 overflow-y-auto"> <div className="bg-white rounded-lg shadow-lg p-8 mb-8"> <h1 className="text-5xl font-bold text-blue-900 mb-3"> Sustainable Farming Network </h1> <p className="text-lg text-gray-600"> Ministry of Agriculture - Digital Support System </p> </div>
<div className="mt-4"> <select className="border rounded-2xl px-4 py-2"> <option>English</option> <option>తెలుగు</option> <option>हिंदी</option> </select>
</div> {/* DASHBOARD */} {activePage === "dashboard" && ( <div className="space-y-8"> {/* HEADER */} <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-lg p-8 shadow-lg"> <h2 className="text-4xl font-bold mb-2">Your Farming Hub</h2> <p className="text-green-100">Get real-time insights and recommendations for your crops</p> </div> {/* QUICK STATS */} <div className="grid md:grid-cols-4 gap-6"> <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-green-600"> <p className="text-gray-600 text-sm font-semibold">Active Alerts</p> <h3 className="text-4xl font-bold text-blue-900 mt-2">3</h3> <p className="text-gray-500 text-xs mt-2">Weather & Disease</p> </div> <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-blue-600"> <p className="text-gray-600 text-sm font-semibold">Soil Health</p> <h3 className="text-4xl font-bold text-blue-700 mt-2">92%</h3> <p className="text-gray-500 text-xs mt-2">Excellent Condition</p> </div> <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-orange-600"> <p className="text-gray-600 text-sm font-semibold">Water Level</p> <h3 className="text-4xl font-bold text-orange-700 mt-2">68%</h3> <p className="text-gray-500 text-xs mt-2">Optimal for Rice</p> </div> <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-purple-600"> <p className="text-gray-600 text-sm font-semibold">Yield Est.</p> <h3 className="text-4xl font-bold text-purple-700 mt-2">52 QT</h3> <p className="text-gray-500 text-xs mt-2">Per Acre Expected</p> </div> </div> {/* CRITICAL ALERTS */} <div className="bg-white rounded-lg p-8 shadow-md"> <h3 className="text-2xl font-bold text-blue-900 mb-6">Critical Alerts</h3> <div className="space-y-4"> <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded"> <div className="flex items-start justify-between"> <div> <p className="font-bold text-red-700">Heavy Rainfall Alert</p> <p className="text-gray-700 mt-1">Heavy rainfall expected in 48 hours. Avoid spraying pesticides and secure harvested crops.</p> </div> <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">HIGH</span> </div> </div> <div className="bg-orange-50 border-l-4 border-orange-600 p-5 rounded"> <div className="flex items-start justify-between"> <div> <p className="font-bold text-orange-700">Leaf Spot Disease Detected</p> <p className="text-gray-700 mt-1">Disease detected in nearby farms. Use neem spray immediately and remove infected leaves.</p> </div> <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">MEDIUM</span> </div> </div> </div> </div> {/* AI RECOMMENDATIONS */} <div className="grid md:grid-cols-2 gap-6"> <div className="bg-white rounded-lg p-8 shadow-md"> <h3 className="text-2xl font-bold text-blue-900 mb-6">Recommended Actions</h3> <div className="space-y-4"> <div className="flex items-start gap-4"> <div className="bg-blue-50 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0"> <span className="text-blue-900 font-bold">1</span> </div> <div> <p className="font-semibold text-gray-700">Apply Neem Spray Today</p> <p className="text-sm text-gray-600 mt-1">Prevent leaf spot disease before it spreads</p> </div> </div> <div className="flex items-start gap-4"> <div className="bg-blue-50 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0"> <span className="text-blue-900 font-bold">2</span> </div> <div> <p className="font-semibold text-gray-700">Increase Irrigation</p> <p className="text-sm text-gray-600 mt-1">Water level dropping - increase by 20% this week</p> </div> </div> <div className="flex items-start gap-4"> <div className="bg-blue-50 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0"> <span className="text-blue-900 font-bold">3</span> </div> <div> <p className="font-semibold text-gray-700">Check Government Schemes</p> <p className="text-sm text-gray-600 mt-1">New subsidy available for organic fertilizers</p> </div> </div> </div> </div> <div className="bg-white rounded-lg p-8 shadow-md"> <h3 className="text-2xl font-bold text-blue-900 mb-6">Today's Weather</h3> <div className="space-y-4"> <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg"> <p className="text-gray-600 text-sm">Temperature</p> <p className="text-4xl font-bold text-blue-700 mt-2">32°C</p> <p className="text-sm text-gray-600 mt-2">Feels like 35°C with 70% humidity</p> </div> <div className="grid grid-cols-2 gap-4"> <div className="bg-purple-50 p-4 rounded-lg"> <p className="text-gray-600 text-sm">Rainfall</p> <p className="text-2xl font-bold text-purple-700">80%</p> </div> <div className="bg-yellow-50 p-4 rounded-lg"> <p className="text-gray-600 text-sm">Wind Speed</p> <p className="text-2xl font-bold text-yellow-700">12 km/h</p> </div> </div> </div> </div> </div> {/* RECENT ACTIVITY */} <div className="bg-white rounded-lg p-8 shadow-md"> <h3 className="text-2xl font-bold text-blue-900 mb-6">Recent Activity</h3> <div className="space-y-3"> <div className="flex items-center justify-between py-3 border-b"> <div> <p className="font-semibold text-gray-700">Disease Detection AI Analysis</p> <p className="text-sm text-gray-500">10 mins ago</p> </div> <span className="bg-blue-50 text-blue-900 px-3 py-1 rounded-full text-sm">Completed</span> </div> <div className="flex items-center justify-between py-3 border-b"> <div> <p className="font-semibold text-gray-700">Weather Alert Generated</p> <p className="text-sm text-gray-500">25 mins ago</p> </div> <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">Alert</span> </div> <div className="flex items-center justify-between py-3"> <div> <p className="font-semibold text-gray-700">Soil Health Report Updated</p> <p className="text-sm text-gray-500">1 hour ago</p> </div> <span className="bg-blue-50 text-blue-900 px-3 py-1 rounded-full text-sm">Updated</span> </div> </div> </div> </div> )} {/* ORGANIC STORE */}
{activePage === "store" && ( <div className="space-y-8"> <div className="bg-white rounded-lg p-10 shadow-md"> <h2 className="text-5xl font-bold text-blue-900 mb-4"> Organic Farming Store </h2> <p className="text-xl text-gray-600"> Organic farming products recommended for farmers in Kothavalasa and Mangalapalem. </p> </div> <div className="grid md:grid-cols-2 gap-8"> <div className="bg-white rounded-lg p-8 shadow-md"> <h3 className="text-4xl font-bold text-blue-900 mb-5"> Neem Oil </h3> <p className="text-2xl mb-3"> Price: ₹250 </p> <p className="text-xl mb-5"> Usage: Natural pesticide </p> <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl"> Buy Now </button> </div> <div className="bg-white rounded-lg p-8 shadow-md"> <h3 className="text-4xl font-bold text-blue-900 mb-5"> Vermicompost </h3> <p className="text-2xl mb-3"> Price: ₹180 </p> <p className="text-xl mb-5"> Usage: Organic fertilizer </p> <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl"> Buy Now </button> </div> <div className="bg-white rounded-lg p-8 shadow-md"> <h3 className="text-4xl font-bold text-blue-900 mb-5"> Cow Dung Manure </h3> <p className="text-2xl mb-3"> Price: ₹120 </p> <p className="text-xl mb-5"> Usage: Soil enrichment </p> <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl"> Buy Now </button> </div> <div className="bg-white rounded-lg p-8 shadow-md"> <h3 className="text-4xl font-bold text-blue-900 mb-5"> Bio Fertilizer </h3> <p className="text-2xl mb-3"> Price: ₹300 </p> <p className="text-xl mb-5"> Usage: Boost crop growth naturally </p> <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl"> Buy Now </button> </div> </div> </div>
)}
{/* VIDEO TUTORIALS */}
{activePage === "videos" && ( <div className="space-y-8"> <div className="bg-white rounded-lg p-10 shadow-md"> <h2 className="text-5xl font-bold text-blue-900 mb-4"> Organic Farming Video Tutorials </h2> <p className="text-xl text-gray-600"> Learn organic farming techniques through simple farmer-friendly videos. </p> </div> <div className="grid md:grid-cols-2 gap-8"> <div className="bg-white rounded-lg overflow-hidden shadow-md"> <iframe className="w-full h-72" src="https://www.youtube.com/embed/5RhB481l28k?si=os2AikOtN8Z5MJDN" title="Organic Farming" allowFullScreen ></iframe> <div className="p-6"> <h3 className="text-2xl font-bold text-blue-900"> Introduction to Organic Farming </h3> </div> </div> <div className="bg-white rounded-lg overflow-hidden shadow-md"> <iframe className="w-full h-72" src="https://www.youtube.com/embed/6Ejq4pbANww?si=0wU8PL2fESWsdtWH" title="Vermicompost" allowFullScreen ></iframe> <div className="p-6"> <h3 className="text-2xl font-bold text-blue-900"> Vermicomposting Tutorial </h3> </div> </div> </div> </div>
)}
{/* ORGANIC AWARENESS */}
{activePage === "awareness" && ( <div className="space-y-8"> <div className="bg-white rounded-lg p-10 shadow-md"> <h2 className="text-5xl font-bold text-blue-900 mb-4"> Organic Farming Awareness </h2> <p className="text-xl text-gray-600"> Promoting sustainable and chemical-free farming practices in Kothavalasa and Mangalapalem villages. </p> </div> <div className="grid md:grid-cols-2 gap-8"> <div className="bg-white rounded-lg p-8 shadow-md"> <h3 className="text-3xl font-bold text-blue-900 mb-6"> Benefits of Organic Farming </h3> <div className="space-y-4 text-lg"> <div className="bg-blue-50 p-4 rounded-2xl"> Improves soil fertility naturally </div> <div className="bg-blue-50 p-4 rounded-2xl"> Produces chemical-free healthy food </div> <div className="bg-blue-50 p-4 rounded-2xl"> Protects environment and water </div> <div className="bg-blue-50 p-4 rounded-2xl"> Reduces harmful pesticide usage </div> </div> </div> <div className="bg-white rounded-lg p-8 shadow-md"> <h3 className="text-3xl font-bold text-blue-900 mb-6"> Vermicomposting </h3> <div className="space-y-4 text-lg"> <div className="bg-blue-50 p-4 rounded-2xl"> Uses earthworms to create natural fertilizer </div> <div className="bg-blue-50 p-4 rounded-2xl"> Improves crop growth </div> <div className="bg-blue-50 p-4 rounded-2xl"> Low-cost organic solution </div> <div className="bg-blue-50 p-4 rounded-2xl"> Enhances soil nutrients </div> </div> </div> </div> <div className="bg-white rounded-lg p-10 shadow-md"> <h3 className="text-4xl font-bold text-blue-900 mb-8"> ️ Organic vs Chemical Farming </h3> <div className="grid md:grid-cols-2 gap-6"> <div className="bg-blue-50 rounded-lg p-6"> <h4 className="text-3xl font-bold text-blue-900 mb-5"> Organic Farming </h4> <div className="space-y-3 text-lg"> <p> Eco Friendly</p> <p> Natural Fertilizers</p> <p> Improves Soil Health</p> <p> Healthy Food Production</p> </div> </div> <div className="bg-red-100 rounded-lg p-6"> <h4 className="text-3xl font-bold text-red-700 mb-5"> ️ Chemical Farming </h4> <div className="space-y-3 text-lg"> <p> Soil Damage</p> <p> Water Pollution</p> <p> Harmful Chemical Residue</p> <p> Decreases Soil Fertility</p> </div> </div> </div> </div> </div>
)} {/* COUNCILS */} {activePage === "councils" && ( <div className="space-y-6"> {councils.map((council) => ( <CouncilCard key={council.number} number={council.number} name={council.name} head={council.head} responsible={council.responsible} phone1={council.phone1} phone2={council.phone2} email1={council.email1} email2={council.email2} address={council.address} category={council.category} /> ))} </div> )} {/* DISEASE */} {activePage === "disease" && ( <DiseaseDetection /> )} {/* CROP */} {activePage === "crop" && ( <CropRecommendation /> )} {/* CHATBOT */} {activePage === "chatbot" && ( <AIChatbot /> )} {/* SCHEMES */} {activePage === "schemes" && ( <GovernmentSchemes /> )} {/* MARKET */} {activePage === "market" && ( <MarketPrices /> )} {/* WEATHER */} {activePage === "weather" && ( <WeatherAlerts /> )} {/* NOTIFICATIONS */} {activePage === "notifications" && ( <Notifications /> )} {/* SOIL PAGE */}
{activePage === "soil" && ( <SoilTesting />
)}
{/* FARMER REGISTRATION */}
{activePage === "register" && ( <FarmerRegistration />
)}
{/* FEEDBACK PAGE */}
{activePage === "feedback" && ( <FarmerFeedback />
)}
{/* YIELD PAGE */}
{activePage === "yield" && ( <YieldPrediction />
)}{/* ANALYTICS PAGE */}
{activePage === "analytics" && ( <AnalyticsDashboard />
)} </div> </div> );
} /* ================= COMMON COMPONENTS ================= */ function SidebarButton({ title, active, onClick }) { return ( <button onClick={onClick} className={`w-full text-left px-4 py-3 rounded-lg transition font-medium ${ active ? "bg-blue-700 text-white shadow-md" : "text-gray-700 hover:bg-blue-50" }`} > {title} </button> );
}function CouncilCard({ number, name, head, responsible, phone1, phone2, email1, email2, address, category,
}) { return ( <div className="bg-white rounded-lg p-6 shadow-md"> <div className="flex justify-between items-center mb-5"> <h2 className="text-2xl font-bold text-blue-900"> {number}. {name} </h2> <span className="bg-blue-50 text-blue-900 px-4 py-2 rounded-xl text-sm font-semibold"> {category} </span> </div> <details className="mt-4"> <summary className="cursor-pointer bg-blue-700 text-white px-5 py-3 rounded-xl w-fit hover:bg-blue-800 transition"> View Details </summary> <div className="mt-5 space-y-4"> <div> <p><b>Head:</b> {head}</p> <p><b>Phone:</b> {phone1}</p> <p><b>Email:</b> {email1}</p> </div> <div> <p><b>Responsible:</b> {responsible}</p> <p><b>Phone:</b> {phone2}</p> <p><b>Email:</b> {email2}</p> </div> <div> <p><b>Address:</b> {address}</p> </div> </div> </details> </div> );
} /* ================= CROP ================= */
function CropRecommendation() { const [soil, setSoil] = useState(""); const [temperature, setTemperature] = useState(""); const [water, setWater] = useState(""); const [results, setResults] = useState([]); function recommendCrop() { let crops = []; if ( soil.toLowerCase().includes("black") && Number(water) > 60 ) { crops = [ { name: "Cotton", profit: "High", water: "Medium", status: "Best Choice", }, { name: "Sugarcane", profit: "High", water: "High", status: "Good", }, ]; } else if ( soil.toLowerCase().includes("red") && Number(water) < 50 ) { crops = [ { name: "Groundnut", profit: "Medium", water: "Low", status: "Best Choice", }, { name: "Millets", profit: "Medium", water: "Low", status: "Good", }, ]; } else if ( Number(temperature) > 30 && Number(water) > 70 ) { crops = [ { name: "Rice", profit: "High", water: "High", status: "Best Choice", }, { name: "Banana", profit: "High", water: "High", status: "Good", }, ]; } else { crops = [ { name: "Maize", profit: "Medium", water: "Medium", status: "Recommended", }, { name: "Vegetables", profit: "Medium", water: "Medium", status: "Good", }, ]; } setResults(crops); } return ( <div className="space-y-8"> <div className="bg-white rounded-lg p-8 shadow-md"> <h2 className="text-4xl font-bold text-blue-900 mb-8"> Smart Crop Recommendation </h2> <div className="grid md:grid-cols-3 gap-6 mb-6"> <select className="p-4 rounded-2xl border-2 border-green-200 focus:outline-none" value={soil} onChange={(e) => setSoil(e.target.value)} > <option value="">Select Soil Type</option> <option>Black Soil</option> <option>Red Soil</option> <option>Clay Soil</option> <option>Sandy Soil</option> </select> <input type="number" placeholder="Temperature °C" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="p-4 rounded-2xl border-2 border-green-200" /> <input type="number" placeholder="Water Availability %" value={water} onChange={(e) => setWater(e.target.value)} className="p-4 rounded-2xl border-2 border-green-200" /> </div> <button onClick={recommendCrop} className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition" > Recommend Crops </button> </div> {results.length > 0 && ( <div className="grid md:grid-cols-2 gap-6"> {results.map((crop, index) => ( <div key={index}
className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 shadow-lg border border-green-200 hover:scale-105 transition duration-300" > <h3 className="text-3xl font-bold text-blue-900 mb-4"> {crop.name}
</h3> <div className="space-y-4 text-lg"> <div className="flex justify-between"> <span> Profit</span> <span className="font-bold text-blue-900"> {crop.profit} </span> </div> <div className="flex justify-between"> <span> Water Need</span> <span className="font-semibold"> {crop.water} </span> </div> <div className="flex justify-between"> <span> Climate Match</span> <span className="font-semibold text-orange-600"> Excellent </span> </div> <div className="flex justify-between"> <span> AI Match</span> <span className="font-bold text-blue-900"> 96% </span> </div> </div> <div className="mt-5 bg-blue-50 p-4 rounded-2xl"> <p className="font-bold text-blue-900 mb-2"> AI Suggestion </p> <p className="text-gray-700"> {crop.name} is highly suitable for Kothavalasa and Mangalapalem climate conditions. </p> </div> </div> ))} </div> )} </div> );
}
/* ================= DISEASE ================= */
function DiseaseDetection() { const [image, setImage] = useState(null); const [result, setResult] = useState("");
const [cameraOn, setCameraOn] = useState(false); const startCamera = async () => { try { const stream = await navigator.mediaDevices.getUserMedia({ video: true, }); setCameraOn(true); setTimeout(() => { const video = document.getElementById("video"); if (video) { video.srcObject = stream; } }, 100); } catch (err) { console.log(err); alert("Camera access denied"); }
}; function detectDisease() { if (!image) { alert("Please upload crop image"); return; } const diseases = [ { name: "Leaf Spot", solution: "Use neem spray and remove infected leaves.", }, { name: "Powdery Mildew", solution: "Improve airflow and apply sulfur spray.", }, { name: "Bacterial Blight", solution: "Avoid overwatering and use organic copper spray.", }, { name: "Healthy Crop", solution: "Crop is healthy. Continue organic practices.", }, ]; const randomDisease = diseases[Math.floor(Math.random() * diseases.length)]; setResult(randomDisease); } return ( <div className="space-y-8"> <div className="bg-white rounded-lg p-8 shadow-md"> <h2 className="text-4xl font-bold text-blue-900 mb-8"> AI Disease Detection </h2> <div className="border-2 border-dashed border-green-300 rounded-lg p-10 text-center"> {!cameraOn ? ( <div className="space-y-4"> <button onClick={startCamera} className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl" > Open Live Camera </button> <div> <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="mt-4" /> </div> </div> ) : ( <video id="video" autoPlay playsInline className="w-full max-w-lg mx-auto rounded-2xl" /> )} <p className="text-gray-600 mt-4"> Upload image or use live camera for AI crop disease detection </p> </div> <button onClick={detectDisease} className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition" > Detect Disease </button> </div> {result && ( <div className="bg-white rounded-lg p-8 shadow-md border border-blue-200"> <h3 className="text-3xl font-bold text-red-600 mb-6"> Disease Result </h3> <div className="space-y-4"> <p className="text-xl"> Disease: <span className="font-bold ml-2"> {result.name} </span> </p> <div className="bg-blue-50 p-5 rounded-2xl"> <p className="font-bold text-blue-900 mb-2"> Organic Solution </p> <p> {result.solution} </p> </div> </div> </div> )} </div> );
} /* ================= WEATHER ================= */
function WeatherAlerts() { const weather = [ { day: "Monday", icon: "️", temp: "32°C", humidity: "70%", rainfall: "20%", alert: "Good weather for rice cultivation and irrigation.", recommendation: "Suitable day for fertilizer application.", }, { day: "Tuesday", icon: "️", temp: "35°C", humidity: "65%", rainfall: "10%", alert: "High temperature expected in Kothavalasa.", recommendation: "Increase irrigation for leafy vegetables.", }, { day: "Wednesday", icon: "️", temp: "29°C", humidity: "85%", rainfall: "80%", alert: "Heavy rainfall expected near Mangalapalem region.", recommendation: "Avoid pesticide spraying for rice crops.", }, { day: "Thursday", icon: "", temp: "31°C", humidity: "72%", rainfall: "40%", alert: "Moderate rainfall suitable for pulses.", recommendation: "Good moisture level for black gram farming.", }, ]; return ( <div className="space-y-8"> <div className="bg-white rounded-lg p-8 shadow-md"> <div className="flex items-center justify-between mb-8"> <h2 className="text-4xl font-bold text-blue-900"> ️ Smart Weather Alerts </h2> <div className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-bold animate-pulse"> Kothavalasa Live Climate </div> </div> {/* TOP ALERT */} <div className="bg-gradient-to-r from-red-100 to-orange-100 border border-red-200 rounded-lg p-6 mb-8 shadow-sm"> <h3 className="text-2xl font-bold text-red-600 mb-3"> Critical Weather Alert </h3> <p className="text-lg text-gray-700"> Heavy rainfall may affect rice farms in Mangalapalem within 48 hours. Farmers are advised to avoid spraying and secure harvested crops. </p> </div> {/* WEATHER CARDS */} <div className="grid md:grid-cols-2 gap-6"> {weather.map((item, index) => ( <div key={index} className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 shadow-lg border border-blue-200 hover:scale-[1.02] transition duration-300" > <div className="flex justify-between items-center mb-5"> <h3 className="text-3xl font-bold text-blue-900"> {item.day} </h3> <div className="text-5xl"> {item.icon} </div> </div> <div className="space-y-4 text-lg"> <p> ️ Temperature: <span className="font-bold ml-2"> {item.temp} </span> </p> <p> Humidity: <span className="font-bold ml-2"> {item.humidity} </span> </p> <p> ️ Rainfall: <span className="font-bold ml-2"> {item.rainfall} </span> </p> </div> {/* ALERT */} <div className="mt-6 bg-red-50 border border-red-200 p-5 rounded-2xl"> <p className="font-bold text-red-600 mb-2"> Weather Alert </p> <p className="text-gray-700"> {item.alert} </p> </div> {/* AI RECOMMENDATION */} <div className="mt-5 bg-blue-50 p-5 rounded-2xl"> <p className="font-bold text-blue-900 mb-2"> AI Farming Recommendation </p> <p className="text-gray-700"> {item.recommendation} </p> </div> </div> ))} </div> </div> </div> );
} function OrganicAwareness() { const awarenessCards = [ { title: " Benefits of Organic Farming", points: [ "Improves soil fertility naturally", "Produces chemical-free healthy food", "Protects environment and water", "Reduces harmful pesticide usage", ], }, { title: " Vermicomposting", points: [ "Uses earthworms to create natural fertilizer", "Improves crop growth", "Low-cost organic solution", "Enhances soil nutrients", ], }, { title: " Natural Pesticides", points: [ "Neem oil spray", "Cow urine solution", "Garlic-chilli spray", "Tobacco leaf extract", ], }, { title: " Crop Rotation", points: [ "Maintains soil nutrients", "Reduces pest attacks", "Improves productivity", "Prevents soil degradation", ], }, ]; return ( <div className="space-y-8"> <div className="bg-white rounded-lg p-8 shadow-md"> <h2 className="text-4xl font-bold text-blue-900 mb-3"> Organic Farming Awareness </h2> <p className="text-gray-600 text-lg"> Promoting sustainable and chemical-free farming practices in Kothavalasa and Mangalapalem villages. </p> </div> <div className="grid md:grid-cols-2 gap-6"> {awarenessCards.map((card, index) => ( <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-blue-200 hover:scale-105 transition duration-300" > <h3 className="text-2xl font-bold text-blue-900 mb-5"> {card.title} </h3> <div className="space-y-3"> {card.points.map((point, i) => ( <div key={i} className="bg-blue-50 p-3 rounded-xl" > {point} </div> ))} </div> </div> ))} </div> <div className="bg-white rounded-lg p-8 shadow-md"> <h2 className="text-3xl font-bold text-blue-900 mb-6"> Organic vs Chemical Farming </h2> <div className="grid md:grid-cols-2 gap-6"> <div className="bg-blue-50 p-6 rounded-lg"> <h3 className="text-2xl font-bold text-blue-900 mb-4"> Organic Farming </h3> <div className="space-y-3"> <p> Eco Friendly</p> <p> Natural Fertilizers</p> <p> Improves Soil Health</p> <p> Healthy Food Production</p> </div> </div> <div className="bg-red-100 p-6 rounded-lg"> <h3 className="text-2xl font-bold text-red-700 mb-4"> Chemical Farming </h3> <div className="space-y-3"> <p> Soil Damage</p> <p> Water Pollution</p> <p> Harmful Chemical Residue</p> <p> Decreases Soil Fertility</p> </div> </div> </div> </div> </div> );
} function OrganicStore() { const products = [ { name: "Neem Oil", price: "₹250", use: "Natural pesticide", }, { name: "Vermicompost", price: "₹180", use: "Organic fertilizer", }, { name: "Cow Dung Manure", price: "₹120", use: "Soil enrichment", }, { name: "Bio Fertilizer", price: "₹300", use: "Boost crop growth naturally", }, ]; return ( <div className="space-y-8"> <div className="bg-white rounded-lg p-8 shadow-md"> <h2 className="text-4xl font-bold text-blue-900 mb-3"> Organic Farming Store </h2> <p className="text-gray-600"> Organic farming products recommended for farmers in Kothavalasa and Mangalapalem. </p> </div> <div className="grid md:grid-cols-2 gap-6"> {products.map((product, index) => ( <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-blue-200" > <h3 className="text-3xl font-bold text-blue-900 mb-4"> {product.name} </h3> <div className="space-y-3 text-lg"> <p> Price: <span className="font-bold ml-2"> {product.price} </span> </p> <p> Usage: <span className="ml-2"> {product.use} </span> </p> </div> <button className="mt-5 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl"> Buy Now </button> </div> ))} </div> </div> );
}
function VideoTutorials() { const videos = [ { title: "Organic Compost Making", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", }, { title: "Neem Pesticide Preparation", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", }, { title: "Organic Rice Farming", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", }, { title: "Vermicomposting Guide", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", }, ]; return ( <div className="space-y-8"> <div className="bg-white rounded-lg p-8 shadow-md"> <h2 className="text-4xl font-bold text-blue-900 mb-3"> Organic Farming Video Tutorials </h2> <p className="text-gray-600"> Learn modern organic farming techniques through educational videos. </p> </div> <div className="grid md:grid-cols-2 gap-6"> {videos.map((video, index) => ( <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-blue-200" > <h3 className="text-2xl font-bold text-blue-900 mb-5"> {video.title} </h3> <a href={video.link} target="_blank" className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl" > ▶ Watch Video </a> </div> ))} </div> </div> );
} /* ================= MARKET ================= */ function MarketPrices() { const crops = [ { name: "Rice", market: "Kothavalasa Market", price: "₹2400 / Quintal", trend: "⬆ High Demand", }, { name: "Black Gram", market: "Vizianagaram Market", price: "₹7200 / Quintal", trend: "⬆ Good Profit", }, { name: "Green Gram", market: "AP Local Market", price: "₹6800 / Quintal", trend: "⬆ Stable", }, { name: "Leafy Vegetables", market: "Mangalapalem Local Vendors", price: "₹25 - ₹40 / Kg", trend: " Fast Selling", }, { name: "Pulses", market: "Kothavalasa Market Yard", price: "₹5500 / Quintal", trend: "⬆ Increasing", }, ]; return ( <div className="space-y-8"> <div className="bg-white rounded-lg p-8 shadow-md"> <h2 className="text-4xl font-bold text-blue-900 mb-8"> Local Market Prices </h2> <div className="grid md:grid-cols-2 gap-6"> {crops.map((crop, index) => ( <div key={index} className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-lg p-6 shadow-md" > <h3 className="text-3xl font-bold text-blue-900 mb-4"> {crop.name} </h3> <div className="space-y-3 text-lg"> <p> Market: <span className="font-semibold ml-2"> {crop.market} </span> </p> <p> Price: <span className="font-bold text-blue-900 ml-2"> {crop.price} </span> </p> <p> Trend: <span className="font-semibold ml-2"> {crop.trend} </span> </p> </div> </div> ))} </div> </div> </div> );
}
/* ================= SCHEMES ================= */
function GovernmentSchemes() {
  const schemes = [
    // ================= AP STATE SCHEMES =================
    {
      name: "Annadata Sukhibhava Scheme",
      year: "AP Scheme",
      benefit: "Provides ₹14,000 financial assistance to eligible farmers for cultivation support.",
      link: "https://ysrrythubharosa.ap.gov.in/",
      category: "Key State Scheme",
    },
    {
      name: "YSR Sunna Vaddi",
      year: "AP Scheme",
      benefit: "Interest-free crop loans up to ₹1 lakh if repaid within one year.",
      link: "https://apagrisnet.gov.in/",
      category: "Key State Scheme",
    },
    {
      name: "YSR Jagananna Saswatha Bhoomi Hakku",
      year: "AP Scheme",
      benefit: "Drone-based land survey and land titling support for farmers.",
      link: "https://drone.ap.gov.in/",
      category: "Key State Scheme",
    },
    {
      name: "Jagananna Jeeva Kranthi Scheme",
      year: "AP Scheme",
      benefit: "Provides sheep and goat units for women in SC, ST, and BC categories.",
      link: "https://ahd.aptonline.in/",
      category: "Key State Scheme",
    },
    // ================= CENTRAL GOVERNMENT SCHEMES =================
    {
      name: "Agriculture Infrastructure Fund",
      year: "2024",
      benefit: "Loans for farm infrastructure development.",
      link: "https://agriinfra.dac.gov.in/",
      category: "Central Scheme",
    },
    {
      name: "PM-Kisan Samman Nidhi",
      year: "2023",
      benefit: "₹6000 yearly financial support for farmers.",
      link: "https://pmkisan.gov.in/",
      category: "Central Scheme",
    },
    {
      name: "ATMA",
      year: "2025",
      benefit: "Agricultural Technology Management support services.",
      link: "https://atma.dac.gov.in/",
      category: "Central Scheme",
    },
    {
      name: "AGMARKNET",
      year: "2014",
      benefit: "Agricultural market price information system.",
      link: "https://agmarknet.gov.in/",
      category: "Central Scheme",
    },
    {
      name: "Horticulture",
      year: "2026",
      benefit: "Support for fruit and vegetable farming.",
      link: "https://nhb.gov.in/",
      category: "Central Scheme",
    },
    {
      name: "Online Pesticide Registration",
      year: "2009",
      benefit: "Online registration for pesticides and fertilizers.",
      link: "https://cibrc.gov.in/",
      category: "Central Scheme",
    },
    {
      name: "Plant Quarantine Clearance",
      year: "2011",
      benefit: "Plant safety and quarantine clearance services.",
      link: "https://plantquarantineindia.nic.in/",
      category: "Central Scheme",
    },
    {
      name: "DBT in Agriculture",
      year: "2014",
      benefit: "Direct benefit transfer services for farmers.",
      link: "https://dbtagriculture.bihar.gov.in/",
      category: "Central Scheme",
    },
    {
      name: "Pradhanmantri Krishi Sinchayee Yojana",
      year: "2016",
      benefit: "Improved irrigation and water conservation support.",
      link: "https://pmksy.gov.in/",
      category: "Central Scheme",
    },
    {
      name: "Kisan Call Center",
      year: "2015",
      benefit: "24/7 agricultural guidance and support.",
      link: "https://mkisan.gov.in/",
      category: "Central Scheme",
    },
    {
      name: "mKisan",
      year: "2015",
      benefit: "SMS advisory service for farmers.",
      link: "https://mkisan.gov.in/",
      category: "Central Scheme",
    },
    {
      name: "Jaivik Kheti",
      year: "2015",
      benefit: "Promotion and support for organic farming.",
      link: "https://pgsindia-ncof.gov.in/",
      category: "Central Scheme",
    },
    {
      name: "e-Nam",
      year: "2016",
      benefit: "Online agricultural marketing platform.",
      link: "https://enam.gov.in/",
      category: "Central Scheme",
    },
    {
      name: "Soil Health Card",
      year: "2016",
      benefit: "Free soil health analysis and reports.",
      link: "https://soilhealth.dac.gov.in/",
      category: "Central Scheme",
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana",
      year: "2017",
      benefit: "Crop insurance protection for farmers.",
      link: "https://pmfby.gov.in/",
      category: "Central Scheme",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-10 shadow-md">
      <h2 className="text-4xl font-bold text-blue-900 mb-8">
        Government Schemes
      </h2>
      <div className="space-y-6">
        {schemes.map((scheme, index) => (
          <div key={index} className="bg-blue-50 p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-blue-900">
                {scheme.name}
              </h3>
              <span className="bg-white px-4 py-2 rounded-xl text-sm font-semibold">
                {scheme.category}
              </span>
            </div>
            <p className="mt-3 text-gray-700">
              {scheme.benefit}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {scheme.year}
            </p>
            <a
              href={scheme.link}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 text-blue-600 underline font-semibold"
            >
              Open Scheme
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
/* ================= NOTIFICATIONS ================= */
function Notifications() { const notifications = [ { type: "Rain Alert", icon: "️", color: "red", priority: "HIGH PRIORITY", phone: "+91 9876543210", time: "10 mins ago", message: "Heavy rainfall expected tomorrow in Kothavalasa region. Avoid pesticide spraying and secure harvested crops.", ai: "AI Recommendation: Delay spraying for 24 hours.", }, { type: "Market Price Update", icon: "", color: "green", priority: "MARKET UPDATE", phone: "+91 9123456780", time: "25 mins ago", message: "Black gram and rice prices increased in Vizianagaram market yard.", ai: "AI Recommendation: Good time to sell stored pulses.", }, { type: "Disease Warning", icon: "", color: "orange", priority: "DISEASE ALERT", phone: "+91 9988776655", time: "1 hour ago", message: "Leaf Spot disease detected in nearby farms. Use neem spray immediately.", ai: "AI Recommendation: Remove infected leaves to avoid spread.", }, { type: "Government Scheme", icon: "️", color: "purple", priority: "NEW SCHEME", phone: "+91 9000011111", time: "2 hours ago", message: "AP Government announced subsidy support for organic fertilizers.", ai: "AI Recommendation: Apply before deadline to receive benefits.", }, ]; return ( <div className="space-y-8"> <div className="bg-white rounded-lg p-8 shadow-md"> <div className="flex items-center justify-between mb-8"> <h2 className="text-4xl font-bold text-blue-900"> Smart Notifications </h2> <div className="animate-pulse bg-red-100 text-red-600 px-5 py-2 rounded-full font-bold"> 3 Critical Alerts Nearby </div> </div> {/* FILTER BUTTONS */} <div className="flex flex-wrap gap-3 mb-8"> <button className="bg-blue-700 text-white px-5 py-2 rounded-2xl"> All </button> <button className="bg-blue-100 text-blue-700 px-5 py-2 rounded-2xl"> Weather </button> <button className="bg-red-100 text-red-700 px-5 py-2 rounded-2xl"> Disease </button> <button className="bg-blue-50 text-blue-900 px-5 py-2 rounded-2xl"> Market </button> <button className="bg-purple-100 text-purple-700 px-5 py-2 rounded-2xl"> Schemes </button> </div> <div className="space-y-6"> {notifications.map((item, index) => ( <div key={index} className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 shadow-lg border border-blue-200 hover:scale-[1.01] transition duration-300" > <div className="flex justify-between items-start"> <div className="flex gap-4"> <div className="text-5xl"> {item.icon} </div> <div> <h3 className="text-3xl font-bold text-blue-900"> {item.type} </h3> <p className="text-gray-500 mt-1"> Sent to: {item.phone} </p> <p className="text-gray-400 text-sm mt-1"> {item.time} </p> </div> </div> <div className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-bold animate-pulse"> {item.priority} </div> </div> {/* MESSAGE */} <div className="mt-6 bg-white border border-blue-200 p-5 rounded-2xl shadow-sm"> <p className="text-lg text-gray-700 leading-relaxed"> {item.message} </p> </div> {/* AI RECOMMENDATION */} <div className="mt-5 bg-blue-50 p-4 rounded-2xl"> <p className="font-bold text-blue-900 mb-2"> AI Recommendation </p> <p className="text-gray-700"> {item.ai} </p> </div> {/* ACTION BUTTONS */} <div className="flex flex-wrap gap-4 mt-6"> <button className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-2xl font-semibold transition"> Resend Alert </button> <button className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-2xl font-semibold transition"> View Details </button> <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-5 py-3 rounded-2xl font-semibold transition"> Mark Important </button> <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-5 py-3 rounded-2xl font-semibold transition"> Listen Alert </button> </div> </div> ))} </div> </div> </div> );
}
function SoilTesting() { const [nitrogen, setNitrogen] = useState(""); const [phosphorus, setPhosphorus] = useState(""); const [potassium, setPotassium] = useState(""); const [result, setResult] = useState(null); function analyzeSoil() { if (!nitrogen || !phosphorus || !potassium) { alert("Please enter all soil values"); return; } setResult({ health: "Healthy Soil", score: "92%", crop: "Rice, Black Gram, Leafy Vegetables", fertilizer: "Use organic compost and neem cake", irrigation: "Moderate irrigation recommended", ph: "6.8 pH", }); } return ( <div className="space-y-8"> <div className="bg-white rounded-lg p-8 shadow-md"> <div className="flex items-center justify-between mb-8"> <h2 className="text-4xl font-bold text-blue-900"> AI Soil Testing </h2> <div className="bg-blue-50 text-blue-900 px-5 py-2 rounded-full font-bold animate-pulse"> Live Soil Analysis </div> </div> {/* INPUTS */} <div className="grid md:grid-cols-3 gap-6"> <input type="number" placeholder="Nitrogen Level" value={nitrogen} onChange={(e) => setNitrogen(e.target.value)} className="border-2 border-blue-200 rounded-2xl p-5 text-lg focus:outline-none focus:border-green-500" /> <input type="number" placeholder="Phosphorus Level" value={phosphorus} onChange={(e) => setPhosphorus(e.target.value)} className="border-2 border-blue-200 rounded-2xl p-5 text-lg focus:outline-none focus:border-green-500" /> <input type="number" placeholder="Potassium Level" value={potassium} onChange={(e) => setPotassium(e.target.value)} className="border-2 border-blue-200 rounded-2xl p-5 text-lg focus:outline-none focus:border-green-500" /> </div> {/* BUTTON */} <button onClick={analyzeSoil} className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-2xl text-lg font-bold transition" > Analyze Soil </button> </div> {/* RESULT */} {result && ( <div className="grid md:grid-cols-2 gap-6"> {/* HEALTH CARD */} <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-8 shadow-lg border border-blue-200"> <div className="flex items-center justify-between"> <h3 className="text-3xl font-bold text-blue-900"> Soil Health </h3> <div className="bg-blue-50 text-blue-900 px-5 py-2 rounded-full font-bold"> {result.score} </div> </div> <div className="mt-6 space-y-4 text-lg"> <p> Status: <span className="font-bold ml-2 text-blue-900"> {result.health} </span> </p> <p> ️ Soil pH: <span className="font-semibold ml-2"> {result.ph} </span> </p> <p> Irrigation: <span className="font-semibold ml-2"> {result.irrigation} </span> </p> </div> </div> {/* AI RECOMMENDATION */} <div className="bg-gradient-to-br from-yellow-50 to-white rounded-lg p-8 shadow-lg border border-yellow-100"> <h3 className="text-3xl font-bold text-yellow-700 mb-6"> AI Recommendation </h3> <div className="space-y-5 text-lg"> <p> Best Crops: <span className="font-semibold ml-2"> {result.crop} </span> </p> <p> Organic Fertilizer: <span className="font-semibold ml-2"> {result.fertilizer} </span> </p> <div className="bg-yellow-100 p-5 rounded-2xl"> <p className="font-bold text-yellow-700 mb-2"> Smart Farming Tip </p> <p className="text-gray-700"> Current soil condition is highly suitable for crops in Kothavalasa and Mangalapalem regions. </p> </div> </div> </div> </div> )} </div> );
}
function FarmerRegistration() { const [name, setName] = useState(""); const [village, setVillage] = useState(""); const [crop, setCrop] = useState(""); const [phone, setPhone] = useState(""); const [submitted, setSubmitted] = useState(false); function registerFarmer() { if (!name || !village || !crop || !phone) { alert("Please fill all fields"); return; } setSubmitted(true); } return ( <div className="space-y-8"> <div className="bg-white rounded-lg p-8 shadow-md"> <h2 className="text-4xl font-bold text-blue-900 mb-8"> ‍ Farmer Registration </h2> <div className="grid md:grid-cols-2 gap-5"> <input type="text" placeholder="Farmer Name" value={name} onChange={(e) => setName(e.target.value)} className="border rounded-2xl p-4" /> <input type="text" placeholder="Village" value={village} onChange={(e) => setVillage(e.target.value)} className="border rounded-2xl p-4" /> <input type="text" placeholder="Main Crop" value={crop} onChange={(e) => setCrop(e.target.value)} className="border rounded-2xl p-4" /> <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="border rounded-2xl p-4" /> </div> <button onClick={registerFarmer} className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition" > Register Farmer </button> </div> {submitted && ( <div className="bg-white rounded-lg p-8 shadow-md border border-blue-200"> <h3 className="text-3xl font-bold text-blue-900 mb-5"> Registration Successful </h3> <div className="bg-blue-50 p-6 rounded-2xl space-y-3"> <p> ‍ Name: <span className="font-semibold ml-2"> {name} </span> </p> <p> Village: <span className="font-semibold ml-2"> {village} </span> </p> <p> Crop: <span className="font-semibold ml-2"> {crop} </span> </p> <p> Phone: <span className="font-semibold ml-2"> {phone} </span> </p> </div> </div> )} </div> );
}
function FarmerFeedback() { const [name, setName] = useState(""); const [rating, setRating] = useState(""); const [feedback, setFeedback] = useState(""); const [submitted, setSubmitted] = useState(false); function submitFeedback() { if (!name || !rating || !feedback) { alert("Please fill all fields"); return; } setSubmitted(true); } return ( <div className="space-y-8"> <div className="bg-white rounded-lg p-8 shadow-md"> <h2 className="text-4xl font-bold text-blue-900 mb-8"> Farmer Feedback </h2> <div className="space-y-5"> <input type="text" placeholder="Farmer Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-2xl p-4" /> <select value={rating} onChange={(e) => setRating(e.target.value)} className="w-full border rounded-2xl p-4" > <option value="">Select Rating</option> <option> 1 Star</option> <option> 2 Stars</option> <option> 3 Stars</option> <option> 4 Stars</option> <option> 5 Stars</option> </select> <textarea placeholder="Write your feedback..." value={feedback} onChange={(e) => setFeedback(e.target.value)} rows="5" className="w-full border rounded-2xl p-4" /> <button onClick={submitFeedback} className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition" > Submit Feedback </button> </div> </div> {submitted && ( <div className="bg-white rounded-lg p-8 shadow-md border border-blue-200"> <h3 className="text-3xl font-bold text-blue-900 mb-5"> Feedback Submitted </h3> <div className="bg-blue-50 p-6 rounded-2xl space-y-4"> <p> ‍ Farmer: <span className="font-semibold ml-2"> {name} </span> </p> <p> Rating: <span className="font-semibold ml-2"> {rating} </span> </p> <p> Feedback: </p> <div className="bg-white p-4 rounded-2xl"> {feedback} </div> </div> </div> )} </div> );
}
function YieldPrediction() { const [crop, setCrop] = useState(""); const [land, setLand] = useState(""); const [water, setWater] = useState(""); const [prediction, setPrediction] = useState(""); function predictYield() { if (!crop || !land || !water) { alert("Please fill all fields"); return; } let result = ""; if ( crop.toLowerCase().includes("rice") && Number(water) > 70 ) { result = "Expected Yield: 45-55 Quintals per acre."; } else if ( crop.toLowerCase().includes("cotton") ) { result = "Expected Yield: 18-25 Quintals per acre."; } else if ( crop.toLowerCase().includes("groundnut") ) { result = "Expected Yield: 12-18 Quintals per acre."; } else { result = "Expected Yield: Moderate yield based on conditions."; } setPrediction(result); } return ( <div className="space-y-8"> <div className="bg-white rounded-lg p-8 shadow-md"> <h2 className="text-4xl font-bold text-blue-900 mb-8"> Crop Yield Prediction </h2> <div className="grid md:grid-cols-3 gap-5"> <input type="text" placeholder="Crop Name" value={crop} onChange={(e) => setCrop(e.target.value)} className="border rounded-2xl p-4" /> <input type="number" placeholder="Land Area (Acres)" value={land} onChange={(e) => setLand(e.target.value)} className="border rounded-2xl p-4" /> <input type="number" placeholder="Water Availability %" value={water} onChange={(e) => setWater(e.target.value)} className="border rounded-2xl p-4" /> </div> <button onClick={predictYield} className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition" > Predict Yield </button> </div> {prediction && ( <div className="bg-white rounded-lg p-8 shadow-md border border-blue-200"> <h3 className="text-3xl font-bold text-blue-900 mb-5"> AI Prediction Result </h3> <div className="bg-blue-50 p-6 rounded-2xl"> <p className="text-xl leading-8"> {prediction} </p> </div> </div> )} </div> );
}
function AnalyticsDashboard() { const analytics = [ { title: "Registered Farmers", value: "540", icon: "‍", }, { title: "Disease Detections", value: "128", icon: "", }, { title: "Notifications Sent", value: "1,240", icon: "", }, { title: "Scheme Applications", value: "320", icon: "", }, { title: "Weather Alerts", value: "85", icon: "", }, { title: "Crop Recommendations", value: "410", icon: "", }, ]; return ( <div className="space-y-8"> <div className="bg-white rounded-lg p-8 shadow-md"> <h2 className="text-4xl font-bold text-blue-900 mb-8"> Analytics Dashboard </h2> <div className="grid md:grid-cols-3 gap-6"> {analytics.map((item, index) => ( <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm" > <div className="flex justify-between items-center"> <div> <p className="text-lg text-gray-600"> {item.title} </p> <h3 className="text-4xl font-bold text-blue-900 mt-3"> {item.value} </h3> </div> <div className="text-5xl"> {item.icon} </div> </div> </div> ))} </div> <div className="mt-10 bg-blue-50 rounded-lg p-8"> <h3 className="text-3xl font-bold text-blue-900 mb-5"> System Insights </h3> <div className="space-y-4 text-lg"> <p> Organic farming adoption increased by 18%. </p> <p> Weather alerts reduced crop loss risk. </p> <p> AI disease detection improved early prevention. </p> <p> Government scheme participation increased this month. </p> </div> </div> </div> </div> );
}