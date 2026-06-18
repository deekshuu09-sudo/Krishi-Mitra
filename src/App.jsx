import { useState } from "react";
import councils from "./councils";
import { useTranslation } from "./i18n/I18nContext";

// Localized helper dictionaries for properties not directly in the JSON files
const profitTranslations = {
  english: {
    High: "High",
    Medium: "Medium",
    Low: "Low",
    BestChoice: "Best Choice",
    Good: "Good",
    Recommended: "Recommended",
    Excellent: "Excellent"
  },
  telugu: {
    High: "అధికం",
    Medium: "మధ్యస్థం",
    Low: "తక్కువ",
    BestChoice: "ఉత్తమ ఎంపిక",
    Good: "మంచిది",
    Recommended: "సిఫార్సు చేయబడింది",
    Excellent: "అద్భుతం"
  },
  hindi: {
    High: "उच्च",
    Medium: "मध्यम",
    Low: "कम",
    BestChoice: "सर्वश्रेष्ठ विकल्प",
    Good: "अच्छा",
    Recommended: "अनुशंसित",
    Excellent: "उत्कृष्ट"
  }
};

const schemeTranslations = {
  english: {
    categoryState: "Key State Scheme",
    categoryCentral: "Central Scheme",
    "Annadata Sukhibhava Scheme": "Annadata Sukhibhava Scheme",
    "Annadata Benefit": "Provides ₹14,000 financial assistance to eligible farmers for cultivation support.",
    "YSR Sunna Vaddi": "YSR Sunna Vaddi",
    "YSR Sunna Vaddi Benefit": "Interest-free crop loans up to ₹1 lakh if repaid within one year.",
    "YSR Jagananna Saswatha Bhoomi Hakku": "YSR Jagananna Saswatha Bhoomi Hakku",
    "YSR Land Benefit": "Drone-based land survey and land titling support for farmers.",
    "Jagananna Jeeva Kranthi Scheme": "Jagananna Jeeva Kranthi Scheme",
    "Jagananna Jeeva Kranthi Benefit": "Provides sheep and goat units for women in SC, ST, and BC categories.",
    "Agriculture Infrastructure Fund": "Agriculture Infrastructure Fund",
    "Agri Infra Benefit": "Loans for farm infrastructure development.",
    "PM-Kisan Samman Nidhi": "PM-Kisan Samman Nidhi",
    "PM Kisan Benefit": "₹6000 yearly financial support for farmers.",
    "ATMA": "ATMA",
    "ATMA Benefit": "Agricultural Technology Management support services.",
    "AGMARKNET": "AGMARKNET",
    "AGMARKNET Benefit": "Agricultural market price information system.",
    "Horticulture": "Horticulture",
    "Horticulture Benefit": "Support for fruit and vegetable farming.",
    "Online Pesticide Registration": "Online Pesticide Registration",
    "Pesticide Benefit": "Online registration for pesticides and fertilizers.",
    "Plant Quarantine Clearance": "Plant Quarantine Clearance",
    "Quarantine Benefit": "Plant safety and quarantine clearance services.",
    "DBT in Agriculture": "DBT in Agriculture",
    "DBT Benefit": "Direct benefit transfer services for farmers.",
    "Pradhanmantri Krishi Sinchayee Yojana": "Pradhanmantri Krishi Sinchayee Yojana",
    "Sinchayee Benefit": "Improved irrigation and water conservation support.",
    "Kisan Call Center": "Kisan Call Center",
    "Call Center Benefit": "24/7 agricultural guidance and support.",
    "mKisan": "mKisan",
    "mKisan Benefit": "SMS advisory service for farmers.",
    "Jaivik Kheti": "Jaivik Kheti",
    "Jaivik Kheti Benefit": "Promotion and support for organic farming.",
    "e-Nam": "e-Nam",
    "eNam Benefit": "Online agricultural marketing platform.",
    "Soil Health Card": "Soil Health Card",
    "Soil Card Benefit": "Free soil health analysis and reports.",
    "Pradhan Mantri Fasal Bima Yojana": "Pradhan Mantri Fasal Bima Yojana",
    "Fasal Bima Benefit": "Crop insurance protection for farmers."
  },
  telugu: {
    categoryState: "ముఖ్యమైన రాష్ట్ర పథకం",
    categoryCentral: "కేంద్ర పథకం",
    "Annadata Sukhibhava Scheme": "అన్నదాత సుఖీభవ పథకం",
    "Annadata Benefit": "సాగు మద్దతు కోసం అర్హులైన రైతులకు ₹14,000 ఆర్థిక సహాయం అందిస్తుంది.",
    "YSR Sunna Vaddi": "వైఎస్ఆర్ సున్నా వడ్డీ",
    "YSR Sunna Vaddi Benefit": "ఒక సంవత్సరంలోగా తిరిగి చెల్లిస్తే ₹1 లక్ష వరకు వడ్డీ లేని పంట రుణాలు.",
    "YSR Jagananna Saswatha Bhoomi Hakku": "వైఎస్ఆర్ జగనన్న శాశ్వత భూ హక్కు",
    "YSR Land Benefit": "రైతులకు డ్రోన్ ఆధారిత భూమి సర్వే మరియు భూమి యాజమాన్య హక్కుల మద్దతు.",
    "Jagananna Jeeva Kranthi Scheme": "జగనన్న జీవ క్రాంతి పథకం",
    "Jagananna Jeeva Kranthi Benefit": "SC, ST మరియు BC వర్గాల్లోని మహిళల కోసం గొర్రెలు మరియు మేకల పంపిణీ.",
    "Agriculture Infrastructure Fund": "వ్యవసాయ మౌలిక సదుపాయాల నిధి",
    "Agri Infra Benefit": "వ్యవసాయ మౌలిక సదుపాయాల అభివృద్ధికి రుణాలు.",
    "PM-Kisan Samman Nidhi": "పీఎం-కిసాన్ సమ్మాన్ నిధి",
    "PM Kisan Benefit": "రైతులకు సంవత్సరానికి ₹6000 ఆర్థిక సహాయం.",
    "ATMA": "ఆత్మా (ATMA)",
    "ATMA Benefit": "వ్యవసాయ సాంకేతిక నిర్వహణ మద్దతు సేవలు.",
    "AGMARKNET": "అగ్మార్క్‌నెట్ (AGMARKNET)",
    "AGMARKNET Benefit": "వ్యవసాయ మార్కెట్ ధరల సమాచార వ్యవస్థ.",
    "Horticulture": "ఉద్యానవన శాఖ",
    "Horticulture Benefit": "పండ్లు మరియు కూరగాయల సాగుకు మద్దతు.",
    "Online Pesticide Registration": "ఆన్‌లైన్ పురుగుమందుల నమోదు",
    "Pesticide Benefit": "పురుగుమందులు మరియు ఎరువుల ఆన్‌లైన్ నమోదు సేవలు.",
    "Plant Quarantine Clearance": "మొక్కల క్వారంటైన్ క్లియరెన్స్",
    "Quarantine Benefit": "మొక్కల భద్రత మరియు క్వారంటైన్ క్లియరెన్స్ సేవలు.",
    "DBT in Agriculture": "వ్యవసాయంలో డిబిటి (DBT)",
    "DBT Benefit": "రైతులకు ప్రత్యక్ష ప్రయోజన బదిలీ సేవలు.",
    "Pradhanmantri Krishi Sinchayee Yojana": "ప్రధానమంత్రి కృషి సించాయి యోజన",
    "Sinchayee Benefit": "మెరుగైన నీటిపారుదల మరియు నీటి పరిరక్షణ మద్దతు.",
    "Kisan Call Center": "కిసాన్ కాల్ సెంటర్",
    "Call Center Benefit": "రైతులకు 24/7 వ్యవసాయ సలహాలు మరియు సహాయం.",
    "mKisan": "ఎమ్-కిసాన్ (mKisan)",
    "mKisan Benefit": "రైతుల కోసం SMS ద్వారా సలహా సేవలు.",
    "Jaivik Kheti": "జైవిక్ ఖేతీ (సేంద్రీయ వ్యవసాయం)",
    "Jaivik Kheti Benefit": "సేంద్రీయ వ్యవసాయం ప్రోత్సాహం మరియు మద్దతు.",
    "e-Nam": "ఈ-నామ్ (e-Nam)",
    "eNam Benefit": "ఆన్‌లైన్ వ్యవసాయ మార్కెటింగ్ వేదిక.",
    "Soil Health Card": "సాయిల్ హెల్త్ కార్డ్ (మట్టి ఆరోగ్య పత్రం)",
    "Soil Card Benefit": "ఉచిత మట్టి పరీక్ష విశ్లేషణ మరియు నివేదికలు.",
    "Pradhan Mantri Fasal Bima Yojana": "ప్రధాన మంత్రి ఫసల్ బీమా యోజన",
    "Fasal Bima Benefit": "రైతులకు పంట బీమా రక్షణ."
  },
  hindi: {
    categoryState: "मुख्य राज्य योजना",
    categoryCentral: "केंद्रीय योजना",
    "Annadata Sukhibhava Scheme": "अन्नदाता सुखीभव योजना",
    "Annadata Benefit": "खेती सहायता के लिए पात्र किसानों को ₹14,000 की वित्तीय सहायता प्रदान करता है.",
    "YSR Sunna Vaddi": "वाईएसआर सुन्ना वड्डी (शून्य ब्याज ऋण)",
    "YSR Sunna Vaddi Benefit": "एक वर्ष के भीतर पुनर्भुगतान करने पर ₹1 लाख तक का ब्याज मुक्त फसल ऋण.",
    "YSR Jagananna Saswatha Bhoomi Hakku": "वाईएसआर जगनन्ना शाश्वत भूमि हक्क",
    "YSR Land Benefit": "किसानों के लिए ड्रोन-आधारित भूमि सर्वेक्षण और भूमि स्वामित्व सहायता.",
    "Jagananna Jeeva Kranthi Scheme": "जगनन्ना जीव क्रांति योजना",
    "Jagananna Jeeva Kranthi Benefit": "एससी, एसटी और ओबीसी श्रेणियों की महिलाओं के लिए भेड़ और बकरी इकाइयां प्रदान करता है.",
    "Agriculture Infrastructure Fund": "कृषि अवसंरचना कोष",
    "Agri Infra Benefit": "कृषि बुनियादी ढांचे के विकास के लिए ऋण.",
    "PM-Kisan Samman Nidhi": "पीएम-किसान सम्मान निधि",
    "PM Kisan Benefit": "किसानों के लिए ₹6000 वार्षिक वित्तीय सहायता.",
    "ATMA": "आत्मा (ATMA)",
    "ATMA Benefit": "कृषि प्रौद्योगिकी प्रबंधन सहायता सेवाएँ.",
    "AGMARKNET": "एगमार्कनेट (AGMARKNET)",
    "AGMARKNET Benefit": "कृषि बाजार मूल्य सूचना प्रणाली.",
    "Horticulture": "बागवानी (Horticulture)",
    "Horticulture Benefit": "फल और सब्जी की खेती के लिए सहायता.",
    "Online Pesticide Registration": "ऑनलाइन कीटनाशक पंजीकरण",
    "Pesticide Benefit": "कीटनाशकों और उर्वरकों के लिए ऑनलाइन पंजीकरण.",
    "Plant Quarantine Clearance": "पादप संगरोध मंजूरी (Plant Quarantine)",
    "Quarantine Benefit": "पौधों की सुरक्षा और संगरोध मंजूरी सेवाएं.",
    "DBT in Agriculture": "कृषि में डीबीटी (DBT)",
    "DBT Benefit": "किसानों के लिए प्रत्यक्ष लाभ हस्तांतरण सेवाएं.",
    "Pradhanmantri Krishi Sinchayee Yojana": "प्रधानमंत्री कृषि सिंचाई योजना",
    "Sinchayee Benefit": "बेहतर सिंचाई और जल संरक्षण सहायता.",
    "Kisan Call Center": "किसान कॉल सेंटर",
    "Call Center Benefit": "24/7 कृषि मार्गदर्शन और सहायता.",
    "mKisan": "एम-किसान (mKisan)",
    "mKisan Benefit": "किसानों के लिए एसएमएस सलाहकार सेवा.",
    "Jaivik Kheti": "जैविक खेती (Jaivik Kheti)",
    "Jaivik Kheti Benefit": "जैविक खेती के लिए बढ़ावा और सहायता.",
    "e-Nam": "ई-नाम (e-Nam)",
    "eNam Benefit": "ऑनलाइन कृषि विपणन मंच.",
    "Soil Health Card": "मृदा स्वास्थ्य कार्ड",
    "Soil Card Benefit": "निःशुल्क मिट्टी स्वास्थ्य विश्लेषण और रिपोर्ट.",
    "Pradhan Mantri Fasal Bima Yojana": "प्रधानमंत्री फसल बीमा योजना",
    "Fasal Bima Benefit": "किसानों के लिए फसल बीमा सुरक्षा."
  }
};

const botReplies = {
  english: {
    rice: "Rice grows best in clay soil with high water availability.",
    disease: "Upload a crop image in Disease Detection for AI analysis.",
    weather: "Check the Weather Alerts section for live weather updates.",
    fertilizer: "Organic compost and neem cake are good natural fertilizers.",
    education: "For education questions, I can help explain study options, local school support, or helpful learning resources.",
    health: "For health questions, I can share general wellness advice and suggest checking with local health services.",
    technology: "I can help with simple tech questions, such as using mobile phones, apps, and staying safe online.",
    questions: "Ask your question in one sentence and I’ll give you a helpful answer or point you to the right resource.",
    default: "I can assist with many questions — farming, weather, market prices, health, education, and local support. Please tell me what you want to know."
  },
  telugu: {
    rice: "వరి బంకమట్టి నేలలో మరియు ఎక్కువ నీటి లభ్యత ఉన్న చోట బాగా పెరుగుతుంది.",
    disease: "AI విశ్లేషణ కోసం పంట వ్యాధి గుర్తింపు విభాగంలో చిత్రాన్ని అప్‌లోడ్ చేయండి.",
    weather: "తాజా వాతావరణ సమాచారం కోసం వాతావరణ హెచ్చరికల విభాగాన్ని చూడండి.",
    fertilizer: "సేంద్రీయ కంపోస్ట్ మరియు వేప పిండి మంచి సహజ ఎరువులు.",
    education: "విద్యకు సంబంధించిన ప్రశ్నల కోసం, నేను చదువుకునే మార్గాలు, స్థానిక పాఠశాలల మద్దతు లేదా ఉపయోగకరమైన వనరులను వివరించగలను.",
    health: "ఆరోగ్యానికి సంబంధించిన ప్రశ్నల కోసం, నేను సాధారణ శ్రేయస్సు సలహాలను పంచుకోగలను మరియు స్థానిక ఆరోగ్య కేంద్రాలను సంప్రదించమని సూచించగలను.",
    technology: "మొబైల్ ఫోన్లు, యాప్‌లను ఉపయోగించడం మరియు ఆన్‌లైన్‌లో సురక్షితంగా ఉండటం వంటి సాధారణ సాంకేతిక ప్రశ్నలతో నేను సహాయం చేయగలను.",
    questions: "మీ ప్రశ్నను ఒక వాక్యంలో అడగండి మరియు నేను మీకు సహాయకరమైన సమాధానం ఇస్తాను లేదా సరైన వనరును సూచిస్తాను.",
    default: "నేను వ్యవసాయం, వాతావరణం, మార్కెట్ ధరలు, ఆరోగ్యం, విద్య మరియు స్థానిక మద్దతు వంటి అనేక ప్రశ్నలకు సహాయం చేయగలను. మీకు ఏమి కావాలో దయచేసి నాకు చెప్పండి."
  },
  hindi: {
    rice: "धान (चावल) मिट्टी और उच्च पानी की उपलब्धता वाले क्षेत्रों में सबसे अच्छा बढ़ता है.",
    disease: "AI विश्लेषण के लिए रोग पहचान अनुभाग में फसल की छवि अपलोड करें.",
    weather: "लाइव मौसम अपडेट के लिए मौसम अलर्ट अनुभाग देखें.",
    fertilizer: "जैविक खाद और नीम की खली अच्छे प्राकृतिक उर्वरक हैं.",
    education: "शिक्षा संबंधी प्रश्नों के लिए, मैं अध्ययन के विकल्पों, स्थानीय स्कूल सहायता या उपयोगी शिक्षण संसाधनों को समझाने में मदद कर सकता हूँ.",
    health: "स्वास्थ्य संबंधी प्रश्नों के लिए, मैं सामान्य कल्याण सलाह साझा कर सकता हूँ और स्थानीय स्वास्थ्य सेवाओं से संपर्क करने का सुझाव दे सकता हूँ.",
    technology: "मैं सरल तकनीकी प्रश्नों में मदद कर सकता हूँ, जैसे कि मोबाइल फोन, ऐप का उपयोग करना और ऑनलाइन सुरक्षित रहना.",
    questions: "अपना प्रश्न एक वाक्य में पूछें और मैं आपको एक उपयोगी उत्तर दूंगा या सही संसाधन की ओर इशारा करूँगा.",
    default: "मैं खेती, मौसम, बाजार मूल्य, स्वास्थ्य, शिक्षा और स्थानीय सहायता जैसे कई सवालों के जवाब देने में मदद कर सकता हूँ. कृपया मुझे बताएं कि आप क्या जानना चाहते हैं."
  }
};

export default function App() {
  const { t, language, changeLanguage } = useTranslation();
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: t("chatbot.initial")
    }
  ]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("Farmer");

  function sendMessage() {
    if (!chatInput.trim()) return;
    const userMessage = { sender: "user", text: chatInput };
    const text = chatInput.toLowerCase();
    
    let botReply = botReplies[language]?.default || botReplies.english.default;

    if (text.includes("rice") || text.includes("धान") || text.includes("వరి")) {
      botReply = botReplies[language]?.rice || botReplies.english.rice;
    } else if (text.includes("disease") || text.includes("बीमारी") || text.includes("వ్యాధి") || text.includes("తెగులు")) {
      botReply = botReplies[language]?.disease || botReplies.english.disease;
    } else if (text.includes("weather") || text.includes("मौसम") || text.includes("వాతావరణం")) {
      botReply = botReplies[language]?.weather || botReplies.english.weather;
    } else if (text.includes("fertilizer") || text.includes("खाद") || text.includes("ఎరువు")) {
      botReply = botReplies[language]?.fertilizer || botReplies.english.fertilizer;
    } else if (text.includes("education") || text.includes("school") || text.includes("college") || text.includes("शिक्षा") || text.includes("చదువు")) {
      botReply = botReplies[language]?.education || botReplies.english.education;
    } else if (text.includes("health") || text.includes("doctor") || text.includes("hospital") || text.includes("स्वास्थ्य") || text.includes("ఆరోగ్యం")) {
      botReply = botReplies[language]?.health || botReplies.english.health;
    } else if (text.includes("technology") || text.includes("phone") || text.includes("तकनीक") || text.includes("సాంకేతిక")) {
      botReply = botReplies[language]?.technology || botReplies.english.technology;
    } else if (
      text.includes("how") || text.includes("what") || text.includes("why") || text.includes("when") || text.includes("where") ||
      text.includes("कैसे") || text.includes("क्या") || text.includes("ఎలా") || text.includes("ఏమిటి")
    ) {
      botReply = botReplies[language]?.questions || botReplies.english.questions;
    }

    const botMessage = { sender: "bot", text: botReply };
    setMessages((prev) => [...prev, userMessage, botMessage]);
    setChatInput("");
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border border-blue-200 transition-all duration-300 hover:shadow-green-100 hover:shadow-xl">
          {/* LANGUAGE SELECTOR */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600 font-medium text-sm flex items-center gap-1">
              <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5c-1.043 2.502-2.585 4.779-4.529 6.7M8.223 11.7a17.974 17.974 0 01-3.633-2.7" />
              </svg>
              {t("login.language")}
            </span>
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="border border-blue-100 rounded-xl px-3 py-1.5 bg-blue-50/50 text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm text-sm"
            >
              <option value="english">English</option>
              <option value="telugu">తెలుగు</option>
              <option value="hindi">हिंदी</option>
            </select>
          </div>
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-green-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-200">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight mb-2">
              {t("login.title")}
            </h1>
            <p className="text-gray-600 font-medium">
              {t("login.subtitle")}
            </p>
          </div>
          {/* FORM */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder={t("login.username")}
                className="w-full border border-gray-200 rounded-2xl p-4 pl-12 bg-slate-50/50 outline-none focus:border-blue-500 focus:bg-white transition"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder={t("login.password")}
                className="w-full border border-gray-200 rounded-2xl p-4 pl-12 bg-slate-50/50 outline-none focus:border-blue-500 focus:bg-white transition"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl p-4 pl-12 bg-slate-50/50 outline-none focus:border-blue-500 focus:bg-white transition appearance-none cursor-pointer"
              >
                <option value="Farmer">{t("login.farmer")}</option>
                <option value="Official">{t("login.official")}</option>
              </select>
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <button
              onClick={() => setLoggedIn(true)}
              className="w-full bg-gradient-to-r from-blue-700 to-green-700 hover:from-blue-800 hover:to-green-800 text-white p-4 rounded-2xl text-lg font-bold shadow-lg shadow-blue-100 transition duration-300 transform active:scale-95"
            >
              {t("login.login")}
            </button>
          </div>
          <div className="mt-8 text-center text-gray-400 text-xs font-semibold uppercase tracking-wider">
            {t("login.platform")}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Dashboard role={role} />
      
      {/* Floating AI Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-gradient-to-r from-blue-700 to-green-700 hover:from-blue-800 hover:to-green-800 text-white p-4 rounded-full shadow-2xl flex items-center justify-center w-16 h-16 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        ) : (
          <div className="w-96 bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-100 flex flex-col max-h-[500px]">
            <div className="bg-gradient-to-r from-blue-700 to-green-700 text-white p-5 flex justify-between items-center shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-lg tracking-wide">
                  {t("chatbot.assistant")}
                </h3>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="hover:opacity-75 bg-white/10 p-1.5 rounded-full transition"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 h-80 overflow-y-auto p-4 space-y-3 bg-slate-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3.5 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-700 to-blue-800 text-white ml-auto rounded-tr-none"
                      : "bg-white text-gray-800 border border-gray-100 mr-auto rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            
            <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={t("chatbot.placeholder")}
                className="flex-1 border border-gray-200 rounded-2xl px-4 py-2.5 outline-none focus:border-blue-500 text-sm"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-700 hover:bg-blue-800 text-white px-5 rounded-2xl text-sm font-bold shadow-md transition transform active:scale-95"
              >
                {t("chatbot.send")}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ================= DASHBOARD ================= */
function Dashboard({ role }) {
  const { t, language, changeLanguage } = useTranslation();
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-blue-50/40">
      {/* SIDEBAR */}
      <div className="w-76 bg-white shadow-2xl p-6 flex flex-col border-r border-blue-100/50">
        <div className="flex items-center gap-2.5 mb-8 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-blue-900 tracking-tight">
            {t("login.title")}
          </h1>
        </div>

        <div className="space-y-1.5 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
          <SidebarButton title={t("sidebar.dashboard")} active={activePage === "dashboard"} onClick={() => setActivePage("dashboard")} icon="📊" />
          <SidebarButton title={t("sidebar.councils")} active={activePage === "councils"} onClick={() => setActivePage("councils")} icon="👥" />
          <SidebarButton title={t("sidebar.disease")} active={activePage === "disease"} onClick={() => setActivePage("disease")} icon="🔬" />
          <SidebarButton title={t("sidebar.crop")} active={activePage === "crop"} onClick={() => setActivePage("crop")} icon="🌱" />
          <SidebarButton title={t("sidebar.schemes")} active={activePage === "schemes"} onClick={() => setActivePage("schemes")} icon="📜" />
          <SidebarButton title={t("sidebar.market")} active={activePage === "market"} onClick={() => setActivePage("market")} icon="📈" />
          <SidebarButton title={t("sidebar.weather")} active={activePage === "weather"} onClick={() => setActivePage("weather")} icon="🌤️" />
          <SidebarButton title={t("sidebar.awareness")} active={activePage === "awareness"} onClick={() => setActivePage("awareness")} icon="💡" />
          <SidebarButton title={t("sidebar.store")} active={activePage === "store"} onClick={() => setActivePage("store")} icon="🛒" />
          <SidebarButton title={t("sidebar.videos")} active={activePage === "videos"} onClick={() => setActivePage("videos")} icon="🎥" />
          <SidebarButton title={t("sidebar.notifications")} active={activePage === "notifications"} onClick={() => setActivePage("notifications")} icon="🔔" />
          <SidebarButton title={t("sidebar.soil")} active={activePage === "soil"} onClick={() => setActivePage("soil")} icon="🧪" />
          <SidebarButton title={t("sidebar.register")} active={activePage === "register"} onClick={() => setActivePage("register")} icon="📝" />
          <SidebarButton title={t("sidebar.feedback")} active={activePage === "feedback"} onClick={() => setActivePage("feedback")} icon="💬" />
          <SidebarButton title={t("sidebar.yield")} active={activePage === "yield"} onClick={() => setActivePage("yield")} icon="🌾" />
          <SidebarButton title={t("sidebar.analytics")} active={activePage === "analytics"} onClick={() => setActivePage("analytics")} icon="📉" />
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="bg-gradient-to-br from-blue-50/80 to-green-50/30 p-4 rounded-2xl text-center border border-blue-50">
            <div className="text-gray-400 font-semibold text-xs uppercase tracking-wider">
              {t("sidebar.logged")}
            </div>
            <div className="font-extrabold text-blue-900 text-lg mt-1">
              {role}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto max-h-screen">
        <div className="flex justify-between items-center bg-white rounded-3xl shadow-sm border border-blue-100/40 p-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-900">
              {t("dashboard.title")}
            </h1>
            <p className="text-sm text-gray-500 font-medium mt-1">
              {t("dashboard.subtitle")}
            </p>
          </div>
          {/* Header language picker */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm font-semibold">{t("login.language")}:</span>
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="border border-blue-100 rounded-xl px-4 py-2 bg-slate-50 font-bold text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value="english">English</option>
              <option value="telugu">తెలుగు</option>
              <option value="hindi">हिंदी</option>
            </select>
          </div>
        </div>

        {/* PAGE INJECTION */}
        {activePage === "dashboard" && (
          <div className="space-y-8 animate-fadeIn">
            {/* HERO */}
            <div className="bg-gradient-to-r from-blue-800 via-blue-900 to-green-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10 transform translate-x-12 -translate-y-12">
                <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-4xl font-black tracking-tight mb-2">
                {t("dashboard.heroTitle")}
              </h2>
              <p className="text-green-100 font-medium text-lg max-w-xl">
                {t("dashboard.heroSubtitle")}
              </p>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title={t("dashboard.alerts")} value="3" subtext={t("dashboard.alertsDesc")} border="border-red-500" text="text-red-600" />
              <StatCard title={t("dashboard.soilHealth")} value="92%" subtext={t("dashboard.soilHealthDesc")} border="border-green-600" text="text-green-600" />
              <StatCard title={t("dashboard.waterLevel")} value="68%" subtext={t("dashboard.waterLevelDesc")} border="border-blue-600" text="text-blue-600" />
              <StatCard title={t("dashboard.yieldEst")} value="52 QT" subtext={t("dashboard.yieldEstDesc")} border="border-purple-600" text="text-purple-600" />
            </div>

            {/* CRITICAL ALERTS */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-50">
              <h3 className="text-2xl font-black text-blue-900 mb-6 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-red-600 rounded-full"></span>
                {t("dashboard.criticalAlertsTitle")}
              </h3>
              <div className="space-y-4">
                <div className="bg-red-50/50 border-l-4 border-red-500 p-5 rounded-2xl flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-red-800 text-lg">
                      {t("dashboard.heavyRainTitle")}
                    </h4>
                    <p className="text-gray-600 font-medium mt-1">
                      {t("dashboard.heavyRainDesc")}
                    </p>
                  </div>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-black shadow-md tracking-wider">
                    {t("dashboard.high")}
                  </span>
                </div>

                <div className="bg-orange-50/50 border-l-4 border-orange-500 p-5 rounded-2xl flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-orange-800 text-lg">
                      {t("dashboard.leafSpotTitle")}
                    </h4>
                    <p className="text-gray-600 font-medium mt-1">
                      {t("dashboard.leafSpotDesc")}
                    </p>
                  </div>
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-black shadow-md tracking-wider">
                    {t("dashboard.medium")}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTIONS & WEATHER */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* RECOMMENDED ACTIONS */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-50">
                <h3 className="text-2xl font-black text-blue-900 mb-6 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-blue-700 rounded-full"></span>
                  {t("dashboard.recommendedActionsTitle")}
                </h3>
                <div className="space-y-5">
                  <RecommendedAction index="1" title={t("dashboard.actionNeemTitle")} desc={t("dashboard.actionNeemDesc")} />
                  <RecommendedAction index="2" title={t("dashboard.actionIrrigationTitle")} desc={t("dashboard.actionIrrigationDesc")} />
                  <RecommendedAction index="3" title={t("dashboard.actionSchemesTitle")} desc={t("dashboard.actionSchemesDesc")} />
                </div>
              </div>

              {/* WEATHER */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-50 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black text-blue-900 mb-6 flex items-center gap-2">
                    <span className="w-2.5 h-6 bg-yellow-500 rounded-full"></span>
                    {t("dashboard.todaysWeatherTitle")}
                  </h3>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-50/30 p-6 rounded-2xl border border-blue-50/50 mb-4 flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 font-bold text-xs uppercase tracking-wider">{t("dashboard.temperature")}</p>
                      <p className="text-5xl font-black text-blue-800 mt-1">32°C</p>
                      <p className="text-sm text-gray-500 font-semibold mt-2">{t("dashboard.feelsLike")}</p>
                    </div>
                    <div className="text-6xl animate-bounce">☀️</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50/50 border border-purple-50 p-4 rounded-2xl">
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-wider">{t("dashboard.rainfall")}</p>
                    <p className="text-2xl font-black text-purple-700 mt-1">80%</p>
                  </div>
                  <div className="bg-green-50/50 border border-green-50 p-4 rounded-2xl">
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-wider">{t("dashboard.windSpeed")}</p>
                    <p className="text-2xl font-black text-green-700 mt-1">12 km/h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-50">
              <h3 className="text-2xl font-black text-blue-900 mb-6 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-green-700 rounded-full"></span>
                {t("dashboard.recentActivityTitle")}
              </h3>
              <div className="space-y-4">
                <RecentActivityRow title={t("dashboard.activityDisease")} time={t("dashboard.minsAgo", { count: 10 })} status={t("dashboard.completed")} statusBg="bg-blue-50 text-blue-700" />
                <RecentActivityRow title={t("dashboard.activityWeather")} time={t("dashboard.minsAgo", { count: 25 })} status={t("dashboard.alert")} statusBg="bg-orange-50 text-orange-700 border border-orange-100" />
                <RecentActivityRow title={t("dashboard.activitySoil")} time={t("dashboard.hourAgo", { count: 1 })} status={t("dashboard.updated")} statusBg="bg-green-50 text-green-700" />
              </div>
            </div>
          </div>
        )}

        {/* LOCAL COUNCILS */}
        {activePage === "councils" && (
          <div className="space-y-6 animate-fadeIn">
            {councils.map((council) => (
              <CouncilCard key={council.number} {...council} />
            ))}
          </div>
        )}

        {/* DISEASE DETECTION */}
        {activePage === "disease" && <DiseaseDetection />}

        {/* CROP RECOMMENDATION */}
        {activePage === "crop" && <CropRecommendation />}

        {/* GOVERNMENT SCHEMES */}
        {activePage === "schemes" && <GovernmentSchemes />}

        {/* MARKET PRICES */}
        {activePage === "market" && <MarketPrices />}

        {/* WEATHER ALERTS (7 Days forecast) */}
        {activePage === "weather" && <WeatherAlerts />}

        {/* ORGANIC AWARENESS */}
        {activePage === "awareness" && <OrganicAwareness />}

        {/* ORGANIC STORE (Opens Amazon India searches) */}
        {activePage === "store" && <OrganicStore />}

        {/* VIDEO TUTORIALS */}
        {activePage === "videos" && <VideoTutorials />}

        {/* NOTIFICATIONS */}
        {activePage === "notifications" && <Notifications />}

        {/* SOIL TESTING (Scientific calculation) */}
        {activePage === "soil" && <SoilTesting />}

        {/* FARMER REGISTRATION */}
        {activePage === "register" && <FarmerRegistration />}

        {/* FARMER FEEDBACK */}
        {activePage === "feedback" && <FarmerFeedback />}

        {/* YIELD PREDICTION */}
        {activePage === "yield" && <YieldPrediction />}

        {/* ANALYTICS DASHBOARD */}
        {activePage === "analytics" && <AnalyticsDashboard />}
      </div>
    </div>
  );
}

/* ================= COMPONENT IMPLEMENTATIONS ================= */

function SidebarButton({ title, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-semibold text-sm flex items-center gap-3 ${
        active
          ? "bg-gradient-to-r from-blue-700 to-green-700 text-white shadow-lg shadow-blue-100"
          : "text-slate-600 hover:text-blue-700 hover:bg-blue-50/50"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {title}
    </button>
  );
}

function StatCard({ title, value, subtext, border, text }) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border-t-4 ${border} border border-blue-50/40 hover:shadow-md transition`}>
      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{title}</p>
      <h3 className={`text-3xl font-black mt-2 ${text}`}>{value}</h3>
      <p className="text-gray-500 font-medium text-xs mt-1.5">{subtext}</p>
    </div>
  );
}

function RecommendedAction({ index, title, desc }) {
  return (
    <div className="flex items-start gap-4 hover:bg-slate-50 p-2.5 rounded-xl transition">
      <div className="bg-blue-50 text-blue-800 rounded-xl w-9 h-9 flex items-center justify-center font-black flex-shrink-0">
        {index}
      </div>
      <div>
        <p className="font-extrabold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500 font-medium mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function RecentActivityRow({ title, time, status, statusBg }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50/30 px-2 rounded-lg transition">
      <div>
        <p className="font-extrabold text-slate-800 text-sm">{title}</p>
        <p className="text-xs text-gray-400 font-semibold mt-0.5">{time}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${statusBg}`}>
        {status}
      </span>
    </div>
  );
}

function CouncilCard({ number, name, head, responsible, phone1, phone2, email1, email2, address, category }) {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100/40 hover:shadow-md transition">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-extrabold text-blue-900">
          {number}. {name}
        </h2>
        <span className="bg-blue-50 text-blue-800 px-3 py-1.5 rounded-xl text-xs font-bold">
          {category}
        </span>
      </div>
      <details className="group">
        <summary className="cursor-pointer bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-5 py-2.5 rounded-xl w-fit font-bold text-sm shadow-sm transition transform active:scale-95 select-none outline-none">
          {t("councils.viewDetails")}
        </summary>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-5 rounded-2xl border border-slate-100 animate-slideDown">
          <div className="space-y-1 text-sm text-gray-700">
            <p className="font-semibold text-blue-900 border-b border-slate-200/60 pb-1.5 mb-1.5 uppercase tracking-wide text-xs">
              {t("councils.head")}
            </p>
            <p><b>Name:</b> {head}</p>
            <p><b>{t("councils.phone")}:</b> {phone1}</p>
            <p><b>{t("councils.email")}:</b> {email1}</p>
          </div>
          <div className="space-y-1 text-sm text-gray-700">
            <p className="font-semibold text-blue-900 border-b border-slate-200/60 pb-1.5 mb-1.5 uppercase tracking-wide text-xs">
              {t("councils.responsible")}
            </p>
            <p><b>Name:</b> {responsible}</p>
            <p><b>{t("councils.phone")}:</b> {phone2}</p>
            <p><b>{t("councils.email")}:</b> {email2}</p>
          </div>
          <div className="md:col-span-2 text-sm text-gray-700 border-t border-slate-200/40 pt-4">
            <p className="font-bold text-gray-800">{t("councils.address")}:</p>
            <p className="mt-1 text-gray-600 bg-white p-3 rounded-xl border border-slate-100">
              {address}
            </p>
          </div>
        </div>
      </details>
    </div>
  );
}

function DiseaseDetection() {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [captured, setCaptured] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraOn(true);
      setTimeout(() => {
        const video = document.getElementById("video");
        if (video) video.srcObject = stream;
      }, 100);
    } catch (err) {
      console.log(err);
      alert("Camera access not available. Simulating capture mode.");
      setCameraOn(true);
    }
  };

  const captureImage = () => {
    setCaptured(true);
    setImage("captured_crop.png");
  };

  const detectDisease = () => {
    if (!image && !captured) {
      alert(t("disease.pleaseUploadFirst"));
      return;
    }
    const diseases = [
      { nameKey: "disease.leafSpot", solutionKey: "disease.leafSpotSolution" },
      { nameKey: "disease.powderyMildew", solutionKey: "disease.powderyMildewSolution" },
      { nameKey: "disease.bacterialBlight", solutionKey: "disease.bacterialBlightSolution" },
      { nameKey: "disease.healthyCrop", solutionKey: "disease.healthyCropSolution" }
    ];
    const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
    setResult(randomDisease);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-50">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-2">
          {t("disease.title")}
        </h2>
        <p className="text-gray-500 font-medium mb-8">
          {t("disease.subtitle")}
        </p>

        <div className="border-2 border-dashed border-blue-200 hover:border-green-400 bg-slate-50/50 rounded-2xl p-10 text-center transition flex flex-col items-center justify-center">
          {!cameraOn ? (
            <div className="space-y-5">
              <button
                onClick={startCamera}
                className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-6 py-3 rounded-xl font-bold shadow-md transition transform active:scale-95"
              >
                {t("disease.startCamera")}
              </button>
              <div className="text-slate-400 font-bold text-sm">--- OR ---</div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setImage(URL.createObjectURL(e.target.files[0]));
                      setCaptured(false);
                    }
                  }}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 w-full max-w-md">
              <div className="relative bg-slate-900 rounded-2xl overflow-hidden aspect-video shadow-md border border-slate-700 flex items-center justify-center">
                {!captured ? (
                  <video id="video" autoPlay playsInline className="w-full h-full object-cover" />
                ) : (
                  <div className="text-green-400 font-black p-4 text-center">
                    📸 {t("disease.captureSuccess")}
                  </div>
                )}
              </div>
              <div className="flex gap-4 justify-center">
                {!captured ? (
                  <button
                    onClick={captureImage}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm"
                  >
                    {t("disease.captureImage")}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setCaptured(false);
                      setImage(null);
                    }}
                    className="bg-slate-500 hover:bg-slate-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm"
                  >
                    Retake
                  </button>
                )}
                <button
                  onClick={() => setCameraOn(false)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2.5 rounded-xl font-bold shadow-sm"
                >
                  Close Camera
                </button>
              </div>
            </div>
          )}
          <p className="text-gray-400 text-sm font-semibold mt-6">
            Upload image or use camera for AI diagnostics.
          </p>
        </div>

        <button
          onClick={detectDisease}
          className="mt-6 bg-gradient-to-r from-blue-700 to-green-700 hover:from-blue-800 hover:to-green-800 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-100 transition transform active:scale-95"
        >
          {t("disease.detectDiseaseBtn")}
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40 animate-slideDown">
          <h3 className="text-2xl font-extrabold text-blue-900 mb-5">
            {t("disease.aiResultTitle")}
          </h3>
          <div className="space-y-4">
            <p className="text-lg font-bold text-slate-700">
              {t("disease.detectionLabel")}:
              <span className={`font-black ml-2 ${result.nameKey.includes("healthy") ? "text-green-600" : "text-red-600"}`}>
                {t(result.nameKey)}
              </span>
            </p>
            <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-50">
              <p className="font-extrabold text-blue-900 mb-1.5">
                {t("disease.recommendationLabel")}
              </p>
              <p className="text-slate-700 font-semibold leading-relaxed">
                {t(result.solutionKey)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CropRecommendation() {
  const { t, language } = useTranslation();
  const [soil, setSoil] = useState("");
  const [temperature, setTemperature] = useState("");
  const [water, setWater] = useState("");
  const [results, setResults] = useState([]);

  function recommendCrop() {
    let crops = [];
    if (soil.toLowerCase().includes("black") && Number(water) > 60) {
      crops = [
        { nameKey: "crops.cotton", profit: "High", water: "Medium", status: "BestChoice" },
        { nameKey: "crops.sugarcane", profit: "High", water: "High", status: "Good" }
      ];
    } else if (soil.toLowerCase().includes("red") && Number(water) < 50) {
      crops = [
        { nameKey: "crops.groundnut", profit: "Medium", water: "Low", status: "BestChoice" },
        { nameKey: "crops.millets", profit: "Medium", water: "Low", status: "Good" }
      ];
    } else if (Number(temperature) > 30 && Number(water) > 70) {
      crops = [
        { nameKey: "crops.rice", profit: "High", water: "High", status: "BestChoice" },
        { nameKey: "crops.banana", profit: "High", water: "High", status: "Good" }
      ];
    } else {
      crops = [
        { nameKey: "crops.maize", profit: "Medium", water: "Medium", status: "Recommended" },
        { nameKey: "crops.vegetables", profit: "Medium", water: "Medium", status: "Good" }
      ];
    }
    setResults(crops);
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-6">
          {t("crop.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <select
            className="p-4 rounded-2xl border border-blue-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-gray-700 cursor-pointer"
            value={soil}
            onChange={(e) => setSoil(e.target.value)}
          >
            <option value="">{t("crop.selectSoil")}</option>
            <option value="black">{t("crop.blackSoil")}</option>
            <option value="red">{t("crop.redSoil")}</option>
            <option value="clay">{t("crop.claySoil")}</option>
            <option value="sandy">{t("crop.sandySoil")}</option>
          </select>
          <input
            type="number"
            placeholder={t("crop.tempPlaceholder")}
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="p-4 rounded-2xl border border-blue-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          />
          <input
            type="number"
            placeholder={t("crop.waterPlaceholder")}
            value={water}
            onChange={(e) => setWater(e.target.value)}
            className="p-4 rounded-2xl border border-blue-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          />
        </div>
        <button
          onClick={recommendCrop}
          className="mt-6 bg-gradient-to-r from-blue-700 to-green-700 hover:from-blue-800 hover:to-green-800 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-100 transition transform active:scale-95"
        >
          {t("crop.recommendBtn")}
        </button>
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slideDown">
          {results.map((crop, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-green-50/40 via-white to-white rounded-3xl p-6 shadow-sm border border-green-100/60 hover:shadow-md transition duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-extrabold text-blue-900">
                  {t(crop.nameKey)}
                </h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-xl text-xs font-extrabold">
                  {profitTranslations[language]?.[crop.status] || crop.status}
                </span>
              </div>
              <div className="space-y-2.5 text-sm font-semibold text-slate-600">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span>{t("crop.profit")}</span>
                  <span className="font-extrabold text-blue-900">
                    {profitTranslations[language]?.[crop.profit] || crop.profit}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span>{t("crop.waterNeed")}</span>
                  <span>{profitTranslations[language]?.[crop.water] || crop.water}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span>{t("crop.climateMatch")}</span>
                  <span className="text-orange-600">{t("crop.excellent")}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("crop.aiMatch")}</span>
                  <span className="font-black text-green-700">96%</span>
                </div>
              </div>
              <div className="mt-4 bg-blue-50/50 p-4 rounded-2xl border border-blue-50">
                <p className="font-extrabold text-blue-900 text-xs uppercase tracking-wider mb-1">
                  {t("crop.aiSuggestion")}
                </p>
                <p className="text-sm text-slate-700">
                  {t("crop.suggestionText", { cropName: t(crop.nameKey) })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GovernmentSchemes() {
  const { t, language } = useTranslation();
  const schemes = [
    {
      name: "Annadata Sukhibhava Scheme",
      year: "AP Scheme",
      benefitKey: "Annadata Benefit",
      link: "https://ysrrythubharosa.ap.gov.in/",
      categoryKey: "categoryState"
    },
    {
      name: "YSR Sunna Vaddi",
      year: "AP Scheme",
      benefitKey: "YSR Sunna Vaddi Benefit",
      link: "https://apagrisnet.gov.in/",
      categoryKey: "categoryState"
    },
    {
      name: "YSR Jagananna Saswatha Bhoomi Hakku",
      year: "AP Scheme",
      benefitKey: "YSR Land Benefit",
      link: "https://drone.ap.gov.in/",
      categoryKey: "categoryState"
    },
    {
      name: "Jagananna Jeeva Kranthi Scheme",
      year: "AP Scheme",
      benefitKey: "Jagananna Jeeva Kranthi Benefit",
      link: "https://ahd.aptonline.in/",
      categoryKey: "categoryState"
    },
    {
      name: "Agriculture Infrastructure Fund",
      year: "2024",
      benefitKey: "Agri Infra Benefit",
      link: "https://agriinfra.dac.gov.in/",
      categoryKey: "categoryCentral"
    },
    {
      name: "PM-Kisan Samman Nidhi",
      year: "2023",
      benefitKey: "PM Kisan Benefit",
      link: "https://pmkisan.gov.in/",
      categoryKey: "categoryCentral"
    },
    {
      name: "ATMA",
      year: "2025",
      benefitKey: "ATMA Benefit",
      link: "https://atma.dac.gov.in/",
      categoryKey: "categoryCentral"
    },
    {
      name: "AGMARKNET",
      year: "2014",
      benefitKey: "AGMARKNET Benefit",
      link: "https://agmarknet.gov.in/",
      categoryKey: "categoryCentral"
    },
    {
      name: "Horticulture",
      year: "2026",
      benefitKey: "Horticulture Benefit",
      link: "https://nhb.gov.in/",
      categoryKey: "categoryCentral"
    },
    {
      name: "Online Pesticide Registration",
      year: "2009",
      benefitKey: "Pesticide Benefit",
      link: "https://cibrc.gov.in/",
      categoryKey: "categoryCentral"
    },
    {
      name: "Plant Quarantine Clearance",
      year: "2011",
      benefitKey: "Quarantine Benefit",
      link: "https://plantquarantineindia.nic.in/",
      categoryKey: "categoryCentral"
    },
    {
      name: "DBT in Agriculture",
      year: "2014",
      benefitKey: "DBT Benefit",
      link: "https://dbtagriculture.bihar.gov.in/",
      categoryKey: "categoryCentral"
    },
    {
      name: "Pradhanmantri Krishi Sinchayee Yojana",
      year: "2016",
      benefitKey: "Sinchayee Benefit",
      link: "https://pmksy.gov.in/",
      categoryKey: "categoryCentral"
    },
    {
      name: "Kisan Call Center",
      year: "2015",
      benefitKey: "Call Center Benefit",
      link: "https://mkisan.gov.in/",
      categoryKey: "categoryCentral"
    },
    {
      name: "mKisan",
      year: "2015",
      benefitKey: "mKisan Benefit",
      link: "https://mkisan.gov.in/",
      categoryKey: "categoryCentral"
    },
    {
      name: "Jaivik Kheti",
      year: "2015",
      benefitKey: "Jaivik Kheti Benefit",
      link: "https://pgsindia-ncof.gov.in/",
      categoryKey: "categoryCentral"
    },
    {
      name: "e-Nam",
      year: "2016",
      benefitKey: "eNam Benefit",
      link: "https://enam.gov.in/",
      categoryKey: "categoryCentral"
    },
    {
      name: "Soil Health Card",
      year: "2016",
      benefitKey: "Soil Card Benefit",
      link: "https://soilhealth.dac.gov.in/",
      categoryKey: "categoryCentral"
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana",
      year: "2017",
      benefitKey: "Fasal Bima Benefit",
      link: "https://pmfby.gov.in/",
      categoryKey: "categoryCentral"
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-blue-900 mb-6">
        {t("schemes.title")}
      </h2>
      <div className="space-y-5">
        {schemes.map((scheme, index) => {
          const trans = schemeTranslations[language] || schemeTranslations.english;
          const translatedName = trans[scheme.name] || scheme.name;
          const translatedBenefit = trans[scheme.benefitKey] || scheme.benefitKey;
          const translatedCategory = trans[scheme.categoryKey] || scheme.categoryKey;

          return (
            <div key={index} className="bg-blue-50/30 border border-blue-100/50 p-5 rounded-2xl hover:shadow-md transition">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <h3 className="text-xl font-extrabold text-blue-900">
                  {translatedName}
                </h3>
                <span className="bg-white px-3 py-1 rounded-xl text-xs font-bold shadow-sm border border-blue-100/40 text-blue-700">
                  {translatedCategory}
                </span>
              </div>
              <p className="mt-2 text-slate-700 font-semibold text-sm">
                {translatedBenefit}
              </p>
              <p className="mt-1.5 text-xs text-gray-400 font-bold">
                {scheme.year}
              </p>
              <a
                href={scheme.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3.5 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition transform active:scale-95 hover:from-blue-800 hover:to-blue-900"
              >
                {t("schemes.openScheme")}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MarketPrices() {
  const { t } = useTranslation();
  const crops = [
    { name: "Rice", market: "Kothavalasa Market", price: "₹2400 / Quintal", trend: "⬆ High Demand" },
    { name: "Black Gram", market: "Vizianagaram Market", price: "₹7200 / Quintal", trend: "⬆ Good Profit" },
    { name: "Green Gram", market: "AP Local Market", price: "₹6800 / Quintal", trend: "⬆ Stable" },
    { name: "Leafy Vegetables", market: "Mangalapalem Local Vendors", price: "₹25 - ₹40 / Kg", trend: "🔥 Fast Selling" },
    { name: "Pulses", market: "Kothavalasa Market Yard", price: "₹5500 / Quintal", trend: "⬆ Increasing" }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-6">
          {t("sidebar.market")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {crops.map((crop, index) => (
            <div key={index} className="bg-gradient-to-br from-green-50/20 to-white border border-green-100/60 rounded-2xl p-5 shadow-sm">
              <h3 className="text-xl font-extrabold text-blue-900 border-b border-slate-100 pb-2 mb-3">
                {crop.name}
              </h3>
              <div className="space-y-1.5 text-sm font-semibold text-slate-600">
                <p>Market: <span className="text-slate-800">{crop.market}</span></p>
                <p>Price: <span className="text-blue-700 font-extrabold">{crop.price}</span></p>
                <p>Trend: <span className="text-green-600 font-black">{crop.trend}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WeatherAlerts() {
  const { t } = useTranslation();
  
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  
  const forecasts = {
    monday: { icon: "☀️", temp: "32°C", humidity: "70%", rainfall: "20%" },
    tuesday: { icon: "☀️", temp: "35°C", humidity: "65%", rainfall: "10%" },
    wednesday: { icon: "🌧️", temp: "29°C", humidity: "85%", rainfall: "80%" },
    thursday: { icon: "🌦️", temp: "31°C", humidity: "72%", rainfall: "40%" },
    friday: { icon: "⛅", temp: "30°C", humidity: "75%", rainfall: "30%" },
    saturday: { icon: "☁️", temp: "28°C", humidity: "80%", rainfall: "50%" },
    sunday: { icon: "☀️", temp: "33°C", humidity: "60%", rainfall: "5%" }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-3xl font-extrabold text-blue-900">
            {t("weather.title")}
          </h2>
          <div className="bg-blue-50 text-blue-800 px-4 py-1.5 rounded-full text-xs font-bold animate-pulse border border-blue-100">
            {t("weather.liveClimate")}
          </div>
        </div>

        {/* CRITICAL WARNING */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl p-6 mb-8 flex items-start gap-4 shadow-sm">
          <div className="text-4xl text-red-500">⚠️</div>
          <div>
            <h3 className="text-lg font-black text-red-800 mb-1">
              Critical Weather Alert
            </h3>
            <p className="text-slate-700 font-semibold text-sm">
              Heavy rainfall may affect rice farms in Mangalapalem within 48 hours. Farmers are advised to avoid spraying and secure harvested crops.
            </p>
          </div>
        </div>

        {/* WEATHER FOR EACH DAY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {days.map((day, index) => {
            const forecast = forecasts[day];
            return (
              <div key={index} className="bg-white rounded-2xl p-5 border border-blue-100/40 hover:shadow-md transition">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-extrabold text-blue-900 capitalize">
                    {t(`weather.${day}.day`)}
                  </h3>
                  <span className="text-3xl">{forecast.icon}</span>
                </div>
                <div className="space-y-1 text-sm font-semibold text-slate-500 border-b border-slate-100 pb-3 mb-3">
                  <p>☀️ Temperature: <span className="text-slate-800 font-extrabold">{forecast.temp}</span></p>
                  <p>💧 Humidity: <span className="text-slate-800 font-extrabold">{forecast.humidity}</span></p>
                  <p>🌧️ Rainfall Chance: <span className="text-slate-800 font-extrabold">{forecast.rainfall}</span></p>
                </div>
                <div className="space-y-2.5">
                  <div className="bg-red-50/50 p-3 rounded-xl border border-red-50 text-xs font-semibold text-red-700">
                    <p className="font-extrabold uppercase tracking-wide mb-0.5">Alert</p>
                    <p>{t(`weather.${day}.alert`)}</p>
                  </div>
                  <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-50 text-xs font-semibold text-blue-700">
                    <p className="font-extrabold uppercase tracking-wide mb-0.5">AI Suggestion</p>
                    <p>{t(`weather.${day}.recommendation`)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OrganicAwareness() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-2">
          {t("awareness.title")}
        </h2>
        <p className="text-slate-500 font-semibold">
          {t("awareness.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-blue-100/40 hover:shadow-md transition">
          <h3 className="text-xl font-extrabold text-blue-900 mb-4 flex items-center gap-2">
            🌱 {t("awareness.benefitsTitle")}
          </h3>
          <div className="space-y-2">
            <div className="bg-blue-50/40 p-3 rounded-xl font-semibold text-slate-700 text-sm">{t("awareness.benefitSoil")}</div>
            <div className="bg-blue-50/40 p-3 rounded-xl font-semibold text-slate-700 text-sm">{t("awareness.benefitFood")}</div>
            <div className="bg-blue-50/40 p-3 rounded-xl font-semibold text-slate-700 text-sm">{t("awareness.benefitEnvironment")}</div>
            <div className="bg-blue-50/40 p-3 rounded-xl font-semibold text-slate-700 text-sm">{t("awareness.benefitPesticide")}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-blue-100/40 hover:shadow-md transition">
          <h3 className="text-xl font-extrabold text-blue-900 mb-4 flex items-center gap-2">
            🪱 {t("awareness.vermiTitle")}
          </h3>
          <div className="space-y-2">
            <div className="bg-blue-50/40 p-3 rounded-xl font-semibold text-slate-700 text-sm">{t("awareness.vermiEarthworms")}</div>
            <div className="bg-blue-50/40 p-3 rounded-xl font-semibold text-slate-700 text-sm">{t("awareness.vermiCropGrowth")}</div>
            <div className="bg-blue-50/40 p-3 rounded-xl font-semibold text-slate-700 text-sm">{t("awareness.vermiCost")}</div>
            <div className="bg-blue-50/40 p-3 rounded-xl font-semibold text-slate-700 text-sm">{t("awareness.vermiNutrients")}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-blue-100/40 hover:shadow-md transition">
          <h3 className="text-xl font-extrabold text-blue-900 mb-4 flex items-center gap-2">
            🧴 {t("awareness.pesticidesTitle")}
          </h3>
          <div className="space-y-2">
            <div className="bg-blue-50/40 p-3 rounded-xl font-semibold text-slate-700 text-sm">{t("awareness.pestNeem")}</div>
            <div className="bg-blue-50/40 p-3 rounded-xl font-semibold text-slate-700 text-sm">{t("awareness.pestCowUrine")}</div>
            <div className="bg-blue-50/40 p-3 rounded-xl font-semibold text-slate-700 text-sm">{t("awareness.pestGarlicChilli")}</div>
            <div className="bg-blue-50/40 p-3 rounded-xl font-semibold text-slate-700 text-sm">{t("awareness.pestTobacco")}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-blue-100/40 hover:shadow-md transition">
          <h3 className="text-xl font-extrabold text-blue-900 mb-4 flex items-center gap-2">
            🔄 {t("awareness.rotationTitle")}
          </h3>
          <div className="space-y-2">
            <div className="bg-blue-50/40 p-3 rounded-xl font-semibold text-slate-700 text-sm">{t("awareness.rotNutrients")}</div>
            <div className="bg-blue-50/40 p-3 rounded-xl font-semibold text-slate-700 text-sm">{t("awareness.rotPests")}</div>
            <div className="bg-blue-50/40 p-3 rounded-xl font-semibold text-slate-700 text-sm">{t("awareness.rotProductivity")}</div>
            <div className="bg-blue-50/40 p-3 rounded-xl font-semibold text-slate-700 text-sm">{t("awareness.rotDegradation")}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40">
        <h3 className="text-2xl font-black text-blue-900 mb-6 border-b border-slate-100 pb-3">
          📊 {t("awareness.comparisonTitle")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50/40 border border-green-100/60 rounded-2xl p-6">
            <h4 className="text-xl font-extrabold text-green-800 mb-4 flex items-center gap-1.5">
              ✅ {t("awareness.organicFarming")}
            </h4>
            <ul className="space-y-3 font-semibold text-slate-600 text-sm">
              <li>🍀 {t("awareness.ecoFriendly")}</li>
              <li>💩 {t("awareness.naturalFertilizers")}</li>
              <li>💖 {t("awareness.improvesSoil")}</li>
              <li>🍎 {t("awareness.healthyFood")}</li>
            </ul>
          </div>
          <div className="bg-red-50/30 border border-red-100/60 rounded-2xl p-6">
            <h4 className="text-xl font-extrabold text-red-800 mb-4 flex items-center gap-1.5">
              ❌ {t("awareness.chemicalFarming")}
            </h4>
            <ul className="space-y-3 font-semibold text-slate-600 text-sm">
              <li>💥 {t("awareness.soilDamage")}</li>
              <li>🌊 {t("awareness.waterPollution")}</li>
              <li>🧪 {t("awareness.chemicalResidue")}</li>
              <li>📉 {t("awareness.decreasesSoil")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrganicStore() {
  const { t } = useTranslation();
  const products = [
    { nameKey: "store.neemOil", price: "₹250", useKey: "store.neemOilUsage" },
    { nameKey: "store.vermicompost", price: "₹180", useKey: "store.vermicompostUsage" },
    { nameKey: "store.cowDung", price: "₹120", useKey: "store.cowDungUsage" },
    { nameKey: "store.bioFertilizer", price: "₹300", useKey: "store.bioFertilizerUsage" }
  ];

  const handleBuyNow = (name) => {
    const query = encodeURIComponent(name);
    window.open(`https://www.amazon.in/s?k=${query}`, "_blank");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-2">
          {t("store.title")}
        </h2>
        <p className="text-slate-500 font-semibold">
          {t("store.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-blue-100/40 hover:shadow-md transition flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-blue-900 mb-3">
                {t(product.nameKey)}
              </h3>
              <div className="space-y-1.5 text-sm font-semibold text-slate-500 mb-6">
                <p>{t("store.price")}: <span className="text-slate-800 font-extrabold">{product.price}</span></p>
                <p>{t("store.usage")}: <span className="text-slate-600">{t(product.useKey)}</span></p>
              </div>
            </div>
            <button
              onClick={() => handleBuyNow(t(product.nameKey))}
              className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold py-3 rounded-xl shadow-sm transition transform active:scale-95 text-center"
            >
              {t("store.buyNow")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoTutorials() {
  const { t } = useTranslation();
  const videos = [
    { titleKey: "videos.introTitle", embed: "https://www.youtube.com/embed/5RhB481l28k?si=os2AikOtN8Z5MJDN" },
    { titleKey: "videos.vermiTitle", embed: "https://www.youtube.com/embed/6Ejq4pbANww?si=0wU8PL2fESWsdtWH" }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-2">
          {t("videos.title")}
        </h2>
        <p className="text-slate-500 font-semibold">
          {t("videos.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((vid, index) => (
          <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-blue-100/40 hover:shadow-md transition">
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={vid.embed}
                title={t(vid.titleKey)}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div className="p-5 bg-white">
              <h3 className="text-lg font-extrabold text-blue-900">
                {t(vid.titleKey)}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Notifications() {
  const { t } = useTranslation();
  
  const notifications = [
    {
      typeKey: "notifications.rainAlertTitle",
      icon: "🌧️",
      priorityKey: "notifications.rainAlertPriority",
      messageKey: "notifications.rainAlertMessage",
      aiKey: "notifications.rainAlertAi",
      phone: "+91 9876543210",
      time: "10 mins ago"
    },
    {
      typeKey: "notifications.marketUpdateTitle",
      icon: "📈",
      priorityKey: "notifications.marketUpdatePriority",
      messageKey: "notifications.marketUpdateMessage",
      aiKey: "notifications.marketUpdateAi",
      phone: "+91 9123456780",
      time: "25 mins ago"
    },
    {
      typeKey: "notifications.diseaseWarningTitle",
      icon: "🔬",
      priorityKey: "notifications.diseaseWarningPriority",
      messageKey: "notifications.diseaseWarningMessage",
      aiKey: "notifications.diseaseWarningAi",
      phone: "+91 9988776655",
      time: "1 hour ago"
    },
    {
      typeKey: "notifications.govSchemeTitle",
      icon: "📜",
      priorityKey: "notifications.govSchemePriority",
      messageKey: "notifications.govSchemeMessage",
      aiKey: "notifications.govSchemeAi",
      phone: "+91 9000011111",
      time: "2 hours ago"
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-3xl font-extrabold text-blue-900">
            {t("notifications.title")}
          </h2>
          <div className="animate-pulse bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-xs font-bold border border-red-200">
            {t("notifications.criticalAlertsNearby", { count: 3 })}
          </div>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          <button className="bg-blue-700 text-white px-4 py-1.5 rounded-xl text-xs font-bold shadow-sm">
            {t("notifications.filterAll")}
          </button>
          <button className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-xl text-xs font-bold border border-blue-100/60">
            {t("notifications.filterWeather")}
          </button>
          <button className="bg-red-50 text-red-700 px-4 py-1.5 rounded-xl text-xs font-bold border border-red-100/60">
            {t("notifications.filterDisease")}
          </button>
          <button className="bg-green-50 text-green-700 px-4 py-1.5 rounded-xl text-xs font-bold border border-green-100/60">
            {t("notifications.filterMarket")}
          </button>
          <button className="bg-purple-50 text-purple-700 px-4 py-1.5 rounded-xl text-xs font-bold border border-purple-100/60">
            {t("notifications.filterSchemes")}
          </button>
        </div>

        <div className="space-y-6">
          {notifications.map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50/10 to-white rounded-2xl p-5 border border-blue-100/40 hover:shadow-md transition">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div className="flex gap-3">
                  <div className="text-4xl">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-extrabold text-blue-900">
                      {t(item.typeKey)}
                    </h3>
                    <p className="text-xs text-gray-400 font-semibold mt-0.5">
                      {t("notifications.sentTo")}: {item.phone} | {item.time}
                    </p>
                  </div>
                </div>
                <span className="bg-red-50 text-red-700 border border-red-100 px-3 py-1 rounded-xl text-xs font-extrabold shadow-sm uppercase tracking-wide">
                  {t(item.priorityKey)}
                </span>
              </div>

              <div className="mt-4 bg-white border border-slate-100 p-4 rounded-xl shadow-sm text-slate-700 font-semibold text-sm leading-relaxed">
                {t(item.messageKey)}
              </div>

              <div className="mt-3.5 bg-blue-50/50 p-3.5 rounded-xl border border-blue-50/40">
                <p className="font-extrabold text-blue-900 text-xs uppercase tracking-wider mb-0.5">
                  {t("notifications.aiRecommendation")}
                </p>
                <p className="text-slate-600 font-semibold text-xs">
                  {t(item.aiKey)}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 mt-5">
                <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm">
                  {t("notifications.resendAlert")}
                </button>
                <button className="bg-slate-50 border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold">
                  {t("notifications.viewDetails")}
                </button>
                <button className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border border-yellow-200 px-4 py-2 rounded-xl text-xs font-bold">
                  {t("notifications.markImportant")}
                </button>
                <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-4 py-2 rounded-xl text-xs font-bold">
                  {t("notifications.listenAlert")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SoilTesting() {
  const { t } = useTranslation();
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [ph, setPh] = useState("");
  const [result, setResult] = useState(null);

  // Dynamic calculations based on science ranges:
  // - Nitrogen (N): Deficient < 280, Optimal 280-560, Excessive > 560
  // - Phosphorus (P): Deficient < 10, Optimal 10-25, Excessive > 25
  // - Potassium (K): Deficient < 110, Optimal 110-280, Excessive > 280
  function analyzeSoil() {
    if (!nitrogen || !phosphorus || !potassium) {
      alert(t("soil.pleaseFillAll"));
      return;
    }

    const nVal = Number(nitrogen);
    const pVal = Number(phosphorus);
    const kVal = Number(potassium);
    const phVal = ph ? Number(ph) : 6.5;

    // 1. Calculate Score (0-100%) for each component
    const getNScore = (n) => {
      if (n < 280) return (n / 280) * 100;
      if (n <= 560) return 100;
      return Math.max(30, 100 - ((n - 560) / 560) * 100);
    };
    const getPScore = (p) => {
      if (p < 10) return (p / 10) * 100;
      if (p <= 25) return 100;
      return Math.max(30, 100 - ((p - 25) / 25) * 100);
    };
    const getKScore = (k) => {
      if (k < 110) return (k / 110) * 100;
      if (k <= 280) return 100;
      return Math.max(30, 100 - ((k - 280) / 280) * 100);
    };

    const nScore = getNScore(nVal);
    const pScore = getPScore(pVal);
    const kScore = getKScore(kVal);

    const overallScore = Math.round((nScore + pScore + kScore) / 3);

    // 2. Health status
    let healthKey = "soil.statusExcellent";
    if (overallScore >= 80) {
      healthKey = "soil.statusExcellent";
    } else if (overallScore >= 50) {
      healthKey = "soil.statusModerate";
    } else {
      healthKey = "soil.statusPoor";
    }

    // 3. Nutrient recommendations keys based on deficiency priority
    let fertilizerKey = "soil.fertBalanced";
    let tipKey = "soil.tipBalanced";
    let cropKey = "soil.cropBalanced";

    if (nVal < 280) {
      fertilizerKey = "soil.fertNitrogenDeficient";
      tipKey = "soil.tipNitrogenDef";
      cropKey = "soil.cropLegumes";
    } else if (pVal < 10) {
      fertilizerKey = "soil.fertPhosphorusDeficient";
      tipKey = "soil.tipPhosphorusDef";
      cropKey = "soil.cropBalanced";
    } else if (kVal < 110) {
      fertilizerKey = "soil.fertPotassiumDeficient";
      tipKey = "soil.tipPotassiumDef";
      cropKey = "soil.cropHardy";
    } else if (nVal > 560 || pVal > 25 || kVal > 280) {
      fertilizerKey = "soil.fertExcessive";
      tipKey = "soil.tipExcessive";
      cropKey = "soil.cropNitrogenLoving";
    }

    // 4. Irrigation recommendation keys based on pH
    let irrigationKey = "soil.irrigateModerate";
    if (phVal < 6.0) {
      irrigationKey = "soil.irrigateAcidic";
    } else if (phVal > 7.5) {
      irrigationKey = "soil.irrigateAlkaline";
    }

    setResult({
      score: `${overallScore}%`,
      ph: `${phVal} pH`,
      healthKey,
      cropKey,
      fertilizerKey,
      irrigationKey,
      tipKey
    });
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-3xl font-extrabold text-blue-900">
            {t("soil.title")}
          </h2>
          <div className="bg-blue-50 text-blue-800 px-4 py-1.5 rounded-full text-xs font-bold animate-pulse border border-blue-100">
            {t("soil.liveSoilAnalysis")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <input
            type="number"
            placeholder={t("soil.nitrogen")}
            value={nitrogen}
            onChange={(e) => setNitrogen(e.target.value)}
            className="border border-blue-100 rounded-2xl p-4.5 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          />
          <input
            type="number"
            placeholder={t("soil.phosphorus")}
            value={phosphorus}
            onChange={(e) => setPhosphorus(e.target.value)}
            className="border border-blue-100 rounded-2xl p-4.5 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          />
          <input
            type="number"
            placeholder={t("soil.potassium")}
            value={potassium}
            onChange={(e) => setPotassium(e.target.value)}
            className="border border-blue-100 rounded-2xl p-4.5 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          />
          <input
            type="number"
            step="0.1"
            placeholder={`${t("soil.soilPh")} (e.g. 6.5)`}
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            className="border border-blue-100 rounded-2xl p-4.5 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
          />
        </div>

        <button
          onClick={analyzeSoil}
          className="mt-6 bg-gradient-to-r from-blue-700 to-green-700 hover:from-blue-800 hover:to-green-800 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-100 transition transform active:scale-95"
        >
          {t("soil.analyzeBtn")}
        </button>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slideDown">
          {/* HEALTH CARD */}
          <div className="bg-gradient-to-br from-green-50/20 to-white rounded-3xl p-6 border border-blue-100/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-extrabold text-blue-900">
                  {t("soil.soilHealth")}
                </h3>
                <div className="bg-blue-50 text-blue-800 px-4 py-1.5 rounded-xl text-sm font-black shadow-sm">
                  {result.score}
                </div>
              </div>
              <div className="space-y-2.5 text-sm font-semibold text-slate-600">
                <p>{t("soil.status")}: <span className="font-extrabold text-blue-900 ml-1">{t(result.healthKey)}</span></p>
                <p>🧪 {t("soil.soilPh")}: <span className="text-slate-800 ml-1 font-bold">{result.ph}</span></p>
                <p>💧 {t("soil.irrigation")}: <span className="text-slate-700 font-bold ml-1">{t(result.irrigationKey)}</span></p>
              </div>
            </div>
          </div>

          {/* AI RECOMMENDATION */}
          <div className="bg-gradient-to-br from-yellow-50/20 to-white rounded-3xl p-6 border border-yellow-100/60 shadow-sm">
            <h3 className="text-xl font-extrabold text-yellow-800 mb-4">
              {t("soil.aiRecommendation")}
            </h3>
            <div className="space-y-3.5 text-sm font-semibold text-slate-600">
              <p>🌾 {t("soil.bestCrops")}: <span className="text-slate-800 ml-1">{t(result.cropKey)}</span></p>
              <p>🪱 {t("soil.organicFertilizer")}: <span className="text-slate-800 ml-1">{t(result.fertilizerKey)}</span></p>
              <div className="bg-yellow-50/60 p-4 rounded-2xl border border-yellow-100/40 text-xs">
                <p className="font-extrabold text-yellow-800 uppercase tracking-wider mb-0.5">
                  {t("soil.tipTitle")}
                </p>
                <p className="text-slate-600 font-semibold leading-relaxed">
                  {t(result.tipKey)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FarmerRegistration() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [village, setVillage] = useState("");
  const [crop, setCrop] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function registerFarmer() {
    if (!name || !village || !crop || !phone) {
      alert(t("register.pleaseFillAll"));
      return;
    }
    setSubmitted(true);
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-6">
          📝 {t("register.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder={t("register.name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-blue-100 rounded-2xl p-4 bg-slate-50/50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 font-semibold"
          />
          <input
            type="text"
            placeholder={t("register.village")}
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            className="border border-blue-100 rounded-2xl p-4 bg-slate-50/50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 font-semibold"
          />
          <input
            type="text"
            placeholder={t("register.mainCrop")}
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="border border-blue-100 rounded-2xl p-4 bg-slate-50/50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 font-semibold"
          />
          <input
            type="text"
            placeholder={t("register.phone")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-blue-100 rounded-2xl p-4 bg-slate-50/50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 font-semibold"
          />
        </div>
        <button
          onClick={registerFarmer}
          className="mt-6 bg-gradient-to-r from-blue-700 to-green-700 hover:from-blue-800 hover:to-green-800 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-100 transition transform active:scale-95"
        >
          {t("register.registerBtn")}
        </button>
      </div>

      {submitted && (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40 animate-slideDown">
          <h3 className="text-xl font-extrabold text-blue-900 mb-4 flex items-center gap-1">
            ✅ {t("register.successTitle")}
          </h3>
          <div className="bg-blue-50/50 border border-blue-50 p-5 rounded-2xl space-y-2 text-sm font-semibold text-slate-700">
            <p>👨‍🌾 Name: <span className="text-blue-900 font-extrabold ml-1">{name}</span></p>
            <p>🏡 Village: <span className="text-slate-900 font-bold ml-1">{village}</span></p>
            <p>🌾 Main Crop: <span className="text-slate-900 font-bold ml-1">{crop}</span></p>
            <p>📞 Phone: <span className="text-slate-900 font-bold ml-1">{phone}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

function FarmerFeedback() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submitFeedback() {
    if (!name || !rating || !feedback) {
      alert(t("feedback.pleaseFillAll"));
      return;
    }
    setSubmitted(true);
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-6">
          💬 {t("feedback.title")}
        </h2>
        <div className="space-y-5">
          <input
            type="text"
            placeholder={t("feedback.name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-blue-100 rounded-2xl p-4 bg-slate-50/50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 font-semibold"
          />
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full border border-blue-100 rounded-2xl p-4 bg-slate-50/50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 font-bold text-gray-700 cursor-pointer"
          >
            <option value="">{t("feedback.selectRating")}</option>
            <option value="1">{t("feedback.star", { count: 1 })}</option>
            <option value="2">{t("feedback.stars", { count: 2 })}</option>
            <option value="3">{t("feedback.stars", { count: 3 })}</option>
            <option value="4">{t("feedback.stars", { count: 4 })}</option>
            <option value="5">{t("feedback.stars", { count: 5 })}</option>
          </select>
          <textarea
            placeholder={t("feedback.writeFeedback")}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="5"
            className="w-full border border-blue-100 rounded-2xl p-4 bg-slate-50/50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 font-semibold"
          />
          <button
            onClick={submitFeedback}
            className="bg-gradient-to-r from-blue-700 to-green-700 hover:from-blue-800 hover:to-green-800 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-100 transition transform active:scale-95"
          >
            {t("feedback.submitBtn")}
          </button>
        </div>
      </div>

      {submitted && (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40 animate-slideDown">
          <h3 className="text-xl font-extrabold text-blue-900 mb-4 flex items-center gap-1">
            ✅ {t("feedback.successTitle")}
          </h3>
          <div className="bg-blue-50/50 border border-blue-50 p-5 rounded-2xl space-y-3 text-sm font-semibold text-slate-700">
            <p>👨‍🌾 Farmer: <span className="text-blue-900 font-extrabold ml-1">{name}</span></p>
            <p>⭐ Rating: <span className="text-slate-900 font-bold ml-1">{rating} Stars</span></p>
            <p className="border-t border-slate-200/50 pt-3">Feedback:</p>
            <div className="bg-white p-4 rounded-xl border border-slate-100 font-medium">
              {feedback}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function YieldPrediction() {
  const { t } = useTranslation();
  const [crop, setCrop] = useState("");
  const [land, setLand] = useState("");
  const [water, setWater] = useState("");
  const [prediction, setPrediction] = useState("");

  function predictYield() {
    if (!crop || !land || !water) {
      alert(t("yield.pleaseFillAll"));
      return;
    }
    let resKey = "yield.yieldResultDefault";
    const text = crop.toLowerCase();

    if (text.includes("rice") || text.includes("धान") || text.includes("వరి")) {
      resKey = "yield.yieldResultRice";
    } else if (text.includes("cotton") || text.includes("कपास") || text.includes("ప్రత్తి")) {
      resKey = "yield.yieldResultCotton";
    } else if (text.includes("groundnut") || text.includes("मूंगफली") || text.includes("వేరుశనగ")) {
      resKey = "yield.yieldResultGroundnut";
    }

    setPrediction(t(resKey));
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-6">
          🌾 {t("yield.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <input
            type="text"
            placeholder={t("yield.cropName")}
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="border border-blue-100 rounded-2xl p-4 bg-slate-50/50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 font-semibold"
          />
          <input
            type="number"
            placeholder={t("yield.landArea")}
            value={land}
            onChange={(e) => setLand(e.target.value)}
            className="border border-blue-100 rounded-2xl p-4 bg-slate-50/50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 font-semibold"
          />
          <input
            type="number"
            placeholder={t("yield.waterAvail")}
            value={water}
            onChange={(e) => setWater(e.target.value)}
            className="border border-blue-100 rounded-2xl p-4 bg-slate-50/50 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 font-semibold"
          />
        </div>
        <button
          onClick={predictYield}
          className="mt-6 bg-gradient-to-r from-blue-700 to-green-700 hover:from-blue-800 hover:to-green-800 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-100 transition transform active:scale-95"
        >
          {t("yield.predictBtn")}
        </button>
      </div>

      {prediction && (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40 animate-slideDown">
          <h3 className="text-xl font-extrabold text-blue-900 mb-4">
            🤖 {t("yield.resultTitle")}
          </h3>
          <div className="bg-blue-50/50 border border-blue-50 p-5 rounded-2xl">
            <p className="text-lg leading-relaxed text-blue-900 font-extrabold">
              {prediction}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
function ProjectFooter() {
  return (
    <footer className="mt-10 bg-white rounded-lg shadow-md p-4 text-center text-gray-600">
      <p className="font-semibold">Krishi Mitra © 2026</p>
      <p>Original CSP Project – Batch 8</p>
      <p>Developed by Deekshitha Roy & Team</p>
      <p>NSRIT CSE (AI & ML)</p>
    </footer>
  );
}
function AnalyticsDashboard() {
  const { t } = useTranslation();
  
  const analytics = [
    { titleKey: "analytics.registeredFarmers", value: "540", icon: "👨‍🌾" },
    { titleKey: "analytics.diseaseDetections", value: "128", icon: "🔬" },
    { titleKey: "analytics.notificationsSent", value: "1,240", icon: "🔔" },
    { titleKey: "analytics.schemeApplications", value: "320", icon: "📜" },
    { titleKey: "analytics.weatherAlerts", value: "85", icon: "🌤️" },
    { titleKey: "analytics.cropRecommendations", value: "410", icon: "🌱" }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100/40">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-6">
          📈 {t("analytics.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analytics.map((item, index) => (
            <div key={index} className="bg-blue-50/30 border border-blue-100/40 rounded-2xl p-5 hover:shadow-md transition flex justify-between items-center">
              <div>
                <p className="text-gray-500 font-semibold text-sm">{t(item.titleKey)}</p>
                <h3 className="text-3xl font-black text-blue-900 mt-2">{item.value}</h3>
              </div>
              <span className="text-4xl">{item.icon}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50/20 border border-blue-100/40 rounded-2xl p-6">
          <h3 className="text-xl font-extrabold text-blue-900 mb-4">
            💡 {t("analytics.systemInsights")}
          </h3>
          <div className="space-y-3 font-semibold text-slate-700 text-sm">
            <p className="flex items-center gap-2">🟢 {t("analytics.insightAdoption")}</p>
            <p className="flex items-center gap-2">🟢 {t("analytics.insightAlerts")}</p>
            <p className="flex items-center gap-2">🟢 {t("analytics.insightDisease")}</p>
            <p className="flex items-center gap-2">🟢 {t("analytics.insightParticipation")}</p>
          </div>
        </div>
      </div>
<ProjectFooter />
    </div>

  );

}