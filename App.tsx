
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Download, 
  Video, 
  BarChart, 
  Truck, 
  MessageSquare, 
  ChevronRight, 
  FileText, 
  Code, 
  ExternalLink,
  Users,
  Calendar,
  Send,
  X
} from 'lucide-react';
import { Resource, Software } from './types';
import { getAiResponse } from './services/geminiService';

// --- Mock Data ---
const RESOURCES: Resource[] = [
  { id: '1', title: 'Nhập môn Chuỗi cung ứng 4.0', type: 'Lecture', description: 'Kiến thức nền tảng về Logistics hiện đại.', format: 'PDF', category: 'Logistics', updateDate: '2024-05-20' },
  { id: '2', title: 'Slide: Mô hình Dự báo Chuỗi thời gian', type: 'Slide', description: 'Các phương pháp dự báo định lượng cơ bản.', format: 'PPTX', category: 'Forecasting', updateDate: '2024-05-18' },
  { id: '3', title: 'Case Study: Tối ưu hóa kho bãi Amazon', type: 'CaseStudy', description: 'Phân tích cách Amazon vận hành kho hàng thông minh.', format: 'PDF', category: 'Logistics', updateDate: '2024-05-15' },
  { id: '4', title: 'Bài tập: Dự báo doanh thu bằng Excel', type: 'Exercise', description: 'Thực hành hàm FORECAST và Trendline.', format: 'XLSX', category: 'Forecasting', updateDate: '2024-05-22' },
  { id: '5', title: 'Script MATLAB: Phân tích ARIMA', type: 'Exercise', description: 'Code mẫu phân tích dữ liệu lịch sử.', format: 'MATLAB', category: 'Forecasting', updateDate: '2024-05-21' },
];

const SOFTWARES: Software[] = [
  { id: 's1', name: 'MATLAB R2023b', version: 'Education Edition', description: 'Phần mềm tính toán kỹ thuật hàng đầu cho dự báo.', downloadUrl: '#', guideVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', icon: 'M' },
  { id: 's2', name: 'Excel Solver Add-in', version: 'Build-in', description: 'Công cụ tối ưu hóa tích hợp trong Microsoft Excel.', downloadUrl: '#', guideVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', icon: 'X' },
  { id: 's3', name: 'AnyLogic', version: 'Personal Learning', description: 'Mô phỏng đa phương thức cho hệ thống Logistics.', downloadUrl: '#', guideVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', icon: 'A' },
];

// --- Components ---

const Navbar: React.FC = () => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-amber-200">
            <BarChart size={24} />
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">LogiCast Hub</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#resources" className="text-slate-600 hover:text-amber-600 font-medium transition-colors">Tài nguyên</a>
          <a href="#software" className="text-slate-600 hover:text-amber-600 font-medium transition-colors">Phần mềm</a>
          <a href="#weekly" className="text-slate-600 hover:text-amber-600 font-medium transition-colors">Cập nhật</a>
          <a href="#contact" className="text-slate-600 hover:text-amber-600 font-medium transition-colors">Liên hệ</a>
        </div>
        <button className="bg-amber-500 text-white px-5 py-2 rounded-full font-medium hover:bg-amber-600 transition-all shadow-lg shadow-amber-100 active:scale-95">
          Vào Lớp Học
        </button>
      </div>
    </div>
  </nav>
);

const Hero: React.FC = () => (
  <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40 bg-gradient-to-br from-slate-50 to-amber-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 flex flex-col items-center justify-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-x-4">
            <span className="text-slate-900">Chinh Phục</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-lime-500 md:whitespace-nowrap">
              Logistics & Dự Báo
            </span>
          </div>
          <span className="text-slate-900">Bằng Thực Tiễn</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Nền tảng học tập hiện đại dành cho sinh viên ngành Chuỗi cung ứng. Tài liệu chuẩn hóa, bài tập thực hành Excel/Matlab và hỗ trợ dự án thực tế.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#resources" className="bg-amber-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-amber-600 transition-all shadow-xl shadow-amber-200">
            <BookOpen size={20} /> Khám Phá Bài Giảng
          </a>
          <a href="#software" className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
            <Download size={20} /> Tải Phần Mềm
          </a>
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-60">
          <div className="flex items-center gap-2 font-semibold"><Users size={20} className="text-amber-600"/> 500+ Sinh Viên</div>
          <div className="flex items-center gap-2 font-semibold"><Calendar size={20} className="text-amber-600"/> Cập Nhật Hàng Tuần</div>
          <div className="flex items-center gap-2 font-semibold"><Code size={20} className="text-amber-600"/> Excel & Matlab</div>
        </div>
      </div>
    </div>
    
    {/* Decorative blur elements */}
    <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
    <div className="absolute top-1/2 -right-24 w-80 h-80 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
  </section>
);

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-xl transition-all group hover:border-amber-200">
    <div className="flex justify-between items-start mb-4">
      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
        resource.category === 'Logistics' ? 'bg-orange-100 text-orange-600' : 'bg-lime-100 text-lime-700'
      }`}>
        {resource.category}
      </span>
      <span className="text-slate-400 text-sm font-medium">{resource.format}</span>
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">{resource.title}</h3>
    <p className="text-slate-600 text-sm mb-6 line-clamp-2">{resource.description}</p>
    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
      <div className="flex items-center gap-2 text-slate-500 text-xs">
        <Calendar size={14} className="text-amber-500" /> {new Date(resource.updateDate).toLocaleDateString('vi-VN')}
      </div>
      <button className="text-amber-600 font-bold text-sm flex items-center gap-1 hover:underline">
        Tải về <ChevronRight size={16} />
      </button>
    </div>
  </div>
);

const SoftwareCard: React.FC<{ software: Software }> = ({ software }) => (
  <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden group border border-slate-800 hover:border-amber-500/30 transition-colors">
    <div className="relative z-10">
      <div className="w-14 h-14 bg-lime-400 rounded-2xl flex items-center justify-center text-slate-900 text-2xl font-black mb-6 shadow-lg shadow-lime-400/20">
        {software.icon}
      </div>
      <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-400 transition-colors">{software.name}</h3>
      <p className="text-slate-400 text-sm mb-6">{software.description}</p>
      <div className="flex flex-col gap-3">
        <a href={software.downloadUrl} className="flex items-center justify-center gap-2 bg-amber-500 text-white py-3 rounded-xl font-bold hover:bg-amber-600 transition-all">
          <Download size={18} /> Tải Bản Cài Đặt
        </a>
        <a href={software.guideVideoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border border-slate-700 text-slate-300 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
          <Video size={18} className="text-lime-400" /> Video Hướng Dẫn
        </a>
      </div>
    </div>
    {/* Decorative mesh */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
  </div>
);

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Chào bạn! Tôi có thể giúp gì cho bạn về bài giảng hay bài tập Logistics hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const aiMsg = await getAiResponse(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: aiMsg }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-amber-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform active:scale-95 group"
        >
          <MessageSquare size={28} />
          <span className="absolute -top-2 -left-2 bg-lime-500 w-4 h-4 rounded-full border-2 border-white animate-bounce"></span>
        </button>
      ) : (
        <div className="w-[350px] h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-10">
          <div className="bg-amber-600 p-4 text-white flex justify-between items-center shadow-lg shadow-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">AI</div>
              <div>
                <h4 className="text-sm font-bold">Trợ Lý Học Tập</h4>
                <p className="text-[10px] text-amber-100">Đang hoạt động</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white"><X size={20}/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                  m.role === 'user' ? 'bg-amber-500 text-white rounded-tr-none' : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl text-sm border border-slate-100 rounded-tl-none animate-pulse text-slate-400">
                  Đang suy nghĩ...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Hỏi tôi về bài tập..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
            />
            <button 
              onClick={handleSend}
              className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center hover:bg-amber-600"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'All' | 'Logistics' | 'Forecasting'>('All');
  
  const filteredResources = activeTab === 'All' 
    ? RESOURCES 
    : RESOURCES.filter(r => r.category === activeTab);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Resources Section */}
      <section id="resources" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2 underline decoration-amber-500 decoration-4 underline-offset-8">Thư Viện Tài Nguyên</h2>
            <p className="text-slate-500 mt-4">Bài giảng, slide và bài tập được phân loại khoa học.</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['All', 'Logistics', 'Forecasting'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab === 'All' ? 'Tất cả' : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map(res => <ResourceCard key={res.id} resource={res} />)}
          <div className="bg-amber-50 border-2 border-dashed border-amber-200 p-6 rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-amber-100 transition-all">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform shadow-sm">
              <ExternalLink size={24} />
            </div>
            <h3 className="font-bold text-amber-900 mb-1">Yêu cầu tài liệu</h3>
            <p className="text-amber-700/70 text-sm">Chưa thấy tài liệu bạn cần? Gửi yêu cầu ngay!</p>
          </div>
        </div>
      </section>

      {/* Project Based Learning Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden border-y border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6 border border-amber-500/20">
              <Users size={14}/> Dự án thực tế
            </div>
            <h2 className="text-4xl font-bold mb-6">Học Tập Qua Dự Án (PBL)</h2>
            <p className="text-slate-300 text-lg mb-10 leading-relaxed">
              Logistics và Dự báo không chỉ là lý thuyết. Tại đây, chúng tôi áp dụng phương pháp Học theo dự án, giúp sinh viên giải quyết các vấn đề thực tế từ các doanh nghiệp chuỗi cung ứng hàng đầu.
            </p>
            <ul className="space-y-4 mb-10">
              {['Mô phỏng chuỗi cung ứng thực tế', 'Phân tích dữ liệu lớn (Big Data Forecasting)', 'Tối ưu hóa chi phí kho hàng', 'Xây dựng dashboard quản trị bằng Excel/PowerBI'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-lime-400 flex items-center justify-center text-slate-900 shadow-lg shadow-lime-400/20">
                    <ChevronRight size={14} />
                  </div>
                  <span className="font-medium text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
            <button className="bg-amber-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20">
              Xem Danh Sách Dự Án
            </button>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="aspect-square bg-gradient-to-tr from-amber-600 to-lime-500 rounded-[4rem] rotate-6 flex items-center justify-center p-8 shadow-2xl">
              <div className="w-full h-full bg-slate-900/60 backdrop-blur-xl rounded-[3rem] border border-white/20 p-8">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="font-bold text-amber-400">Project Progress</h4>
                  <span className="text-lime-400 text-sm font-bold">85% Completed</span>
                </div>
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs font-medium text-slate-300">
                        <span>Sprint {i}: Data Collection</span>
                        <span>{100 - i * 15}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-lime-400 shadow-sm shadow-lime-400/50" style={{ width: `${100 - i * 15}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Software Hub */}
      <section id="software" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4 underline decoration-lime-500 decoration-4 underline-offset-8">Software Hub</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mt-6">Công cụ mạnh mẽ để thực hành. Chúng tôi cung cấp bộ cài sạch, hướng dẫn chi tiết và video tutorial độc quyền.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SOFTWARES.map(sw => <SoftwareCard key={sw.id} software={sw} />)}
        </div>
      </section>

      {/* Weekly Updates */}
      <section id="weekly" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl shadow-sm">
              <Calendar size={28}/>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Cập Nhật Hàng Tuần</h2>
              <p className="text-slate-500">Luôn mới nhất với các nghiên cứu và tài liệu thực tiễn.</p>
            </div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-400 transition-all cursor-pointer group shadow-sm hover:shadow-md">
                <div className="flex items-center gap-6">
                  <div className="text-center md:border-r border-slate-100 md:pr-6">
                    <span className="block text-2xl font-black text-amber-500 leading-none">2{i}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">THG 05</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1 group-hover:text-amber-600 transition-colors">Bản tin thị trường Logistics: Tác động của AI đến vận tải biển</h4>
                    <p className="text-slate-500 text-sm">Tài liệu phân tích chuyên sâu cho lớp Logistics K20.</p>
                  </div>
                </div>
                <button className="text-slate-400 group-hover:text-amber-600 transition-colors">
                  <ChevronRight size={24} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 bg-amber-500 text-white relative">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Liên Hệ & Trao Đổi</h2>
              <p className="text-amber-50 mb-12 opacity-90">Bạn có thắc mắc về môn học hoặc muốn hợp tác? Đừng ngần ngại để lại lời nhắn, tôi sẽ phản hồi sớm nhất có thể.</p>
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><FileText size={20}/></div>
                  <div>
                    <h5 className="font-bold">Hỗ trợ bài tập</h5>
                    <p className="text-sm text-amber-100">Gửi đề bài qua Form để được hướng dẫn.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><Truck size={20}/></div>
                  <div>
                    <h5 className="font-bold">Dự án Logistics</h5>
                    <p className="text-sm text-amber-100">Hỗ trợ mentoring cho đồ án cuối khóa.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Pattern */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
               <div className="absolute -top-10 -right-10 w-64 h-64 border-8 border-white rounded-full"></div>
               <div className="absolute bottom-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
            </div>
          </div>
          <div className="lg:w-1/2 p-12">
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Họ và Tên</label>
                  <input type="text" className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 transition-all outline-none" placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email</label>
                  <input type="email" className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 transition-all outline-none" placeholder="name@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Chủ đề</label>
                <select className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 transition-all outline-none">
                  <option>Hỏi về bài tập</option>
                  <option>Góp ý nội dung</option>
                  <option>Đăng ký dự án</option>
                  <option>Vấn đề cài đặt phần mềm</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nội dung trao đổi</label>
                <textarea rows={4} className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 transition-all outline-none" placeholder="Viết câu hỏi của bạn tại đây..."></textarea>
              </div>
              <button className="w-full bg-amber-500 text-white py-4 rounded-xl font-bold hover:bg-amber-600 transition-all shadow-lg shadow-amber-200 active:scale-[0.98]">
                Gửi Thông Tin
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-500 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center text-white">
              <BarChart size={18} />
            </div>
            <span className="font-bold text-lg text-white">LogiCast Hub</span>
          </div>
          <p className="mb-4">© 2024 Website Giảng Dạy Logistics & Kỹ Thuật Dự Báo. Thiết kế bởi Thầy XYZ.</p>
          <div className="flex justify-center gap-8 text-sm">
            <a href="#" className="hover:text-amber-500 transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Bảo mật</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Lịch học</a>
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}
