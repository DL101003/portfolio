import React, { useState, useEffect } from 'react';
import { ChevronDown, ExternalLink, Mail, Phone, MapPin, Code, Database, Server, Layout } from 'lucide-react';

// Mock data for portfolio
const personalInfo = {
  name: "Hoàng Văn Lộc",
  role: "Backend Intern",
  email: "hoanglocit1010@gmail.com",
  phone: "098 102 0042",
  location: "Linh Trung, Thủ Đức, TP.HCM",
  about: "Là sinh viên năm 4 chuyên ngành Công nghệ Phần mềm tại Đại học Công nghệ TP.HCM. Tôi có đam mê với lập trình và phát triển phần mềm, đặc biệt là trong lĩnh vực phát triển ứng dụng web. Tôi đã tham gia nhiều dự án thực tế và có kinh nghiệm làm việc với các công nghệ như React, Spring Boot, TypeScript và Java. Tôi luôn tìm kiếm cơ hội để học hỏi và phát triển kỹ năng của mình trong môi trường làm việc chuyên nghiệp.",
};

const skills = [
  { name: "React", category: "Frontend", level: 85 },
  { name: "TypeScript", category: "Frontend", level: 75 },
  { name: "JavaScript", category: "Frontend", level: 90 },
  { name: "CSS/Tailwind", category: "Frontend", level: 85 },
  { name: "Spring Boot", category: "Backend", level: 80 },
  { name: "Node.js", category: "Backend", level: 70 },
  { name: "Java", category: "Backend", level: 85 },
  { name: "C#", category: "Backend", level: 75 },
  { name: "PostgreSQL", category: "Database", level: 80 },
  { name: "MongoDB", category: "Database", level: 75 },
  { name: "Git", category: "Tools", level: 90 },
  { name: "Docker", category: "Tools", level: 65 },
];

const projects = [
  {
    id: 1,
    title: "REUZIT - Ứng dụng trao đổi đồ cũ",
    description: "Ứng dụng cho phép người dùng đăng tin và trao đổi đồ cũ, tích hợp hệ thống chat thời gian thực và bản đồ tìm kiếm gần vị trí.",
    technologies: ["React", "Spring Boot", "PostgreSQL", "WebSocket", "Google Maps API"],
    links: {
      frontend: "https://github.com/DL101003/ReUZit_FE.git",
      backend: "https://github.com/DL101003/ReUZit.git"
    },
    image: "./images/reuzit.png"
  },
  {
    id: 2,
    title: "INNERGLOW - Quản lý thực phẩm chức năng",
    description: "Hệ thống quản lý bán hàng thực phẩm chức năng với tính năng theo dõi đơn hàng, thống kê bán hàng và quản lý khách hàng.",
    technologies: ["C#", ".NET MVC", "SQL Server", "Chart.js", "Bootstrap"],
    link: "https://github.com/DL101003/.Net-Ecommerce.git",
    image: "./images/innerglow.png"
  },
];

const education = {
  university: "Đại học Công nghệ TP.HCM",
  degree: "Cử nhân Công nghệ Phần Mềm",
  period: "2021 - 2025",
  gpa: "3.34/4.0"
};

// Component animation
const FadeIn = ({ children, delay = 0, direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [delay]);
  
  const getTransform = () => {
    switch (direction) {
      case "up": return "translate(0, 20px)";
      case "down": return "translate(0, -20px)";
      case "left": return "translate(20px, 0)";
      case "right": return "translate(-20px, 0)";
      default: return "translate(0, 0)";
    }
  };
  
  return (
    <div
      className="transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : getTransform(),
      }}
    >
      {children}
    </div>
  );
};

// Scroll animation component
const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = React.useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated]);
  
  return (
    <div
      ref={ref}
      className="transition-all duration-1000 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : "translate(0, 50px)",
      }}
    >
      {children}
    </div>
  );
};

// Skill bar component
const SkillBar = ({ name, level }) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    setTimeout(() => {
      setWidth(level);
    }, 500);
  }, [level]);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-800">{name}</span>
        <span className="text-sm font-medium text-gray-600">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

// Nav links component
const NavLinks = () => {
  const links = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };
  
  return (
    <ul className="hidden md:flex space-x-8">
      {links.map((link, index) => (
        <li key={index}>
          <button
            onClick={() => scrollToSection(link.toLowerCase())}
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            {link}
          </button>
        </li>
      ))}
    </ul>
  );
};

// Main component
const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("All");
  const categories = ["All", "Frontend", "Backend", "Database", "Tools"];
  
  const filteredSkills = activeTab === "All" 
    ? skills 
    : skills.filter(skill => skill.category === activeTab);

  return (
    <div className="font-sans bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">Portfolio</h1>
          </div>
          <NavLinks />
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="md:w-1/2 mt-8 md:mt-0">
              <FadeIn delay={300}>
                <p className="text-blue-600 font-medium mb-2">Hello, I'm</p>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{personalInfo.name}</h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 mb-6">{personalInfo.role}</h2>
                <p className="text-gray-600 mb-8 max-w-lg">{personalInfo.about}</p>
                <div className="flex space-x-4">
                  <a href="#contact" className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors shadow-md">
                    Liên hệ với tôi
                  </a>
                  <a href="#projects" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors">
                    Xem dự án
                  </a>
                </div>
              </FadeIn>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <FadeIn delay={600} direction="left">
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img src="./images/myimage.jpg" alt="Hoàng Văn Lộc" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg">
                    <Code size={28} className="text-blue-600" />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
          <div className="flex justify-center mt-16">
            <ChevronDown size={30} className="text-gray-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-16 relative">
              Giới thiệu
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 mt-2"></div>
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Code size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Frontend Developer</h3>
                <p className="text-gray-600">
                  Sáng tạo giao diện người dùng với React, TypeScript, và Tailwind CSS. Tập trung vào trải nghiệm người dùng và responsive design.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Server size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Backend Developer</h3>
                <p className="text-gray-600">
                  Xây dựng API và hệ thống backend mạnh mẽ với Spring Boot, Java và Node.js. Thiết kế kiến trúc phần mềm hiệu quả.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Database size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Database Designer</h3>
                <p className="text-gray-600">
                  Thiết kế và tối ưu hóa cơ sở dữ liệu với PostgreSQL và MongoDB. Tạo query hiệu quả và cấu trúc dữ liệu hợp lý.
                </p>
              </div>
            </ScrollReveal>
          </div>
          
          <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Học vấn & Thông tin cá nhân</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="font-medium w-32">Họ tên:</span>
                      <span className="text-gray-600">{personalInfo.name}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-32">Học vấn:</span>
                      <span className="text-gray-600">{education.degree}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-32">Trường:</span>
                      <span className="text-gray-600">{education.university}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-32">Thời gian:</span>
                      <span className="text-gray-600">{education.period}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-32">GPA:</span>
                      <span className="text-gray-600">{education.gpa}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-32">Email:</span>
                      <span className="text-gray-600">{personalInfo.email}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-32">Điện thoại:</span>
                      <span className="text-gray-600">{personalInfo.phone}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-32">Địa chỉ:</span>
                      <span className="text-gray-600">{personalInfo.location}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Mục tiêu nghề nghiệp</h3>
                  <p className="text-gray-600 mb-6">
                    Trở thành kỹ sư fullstack chuyên nghiệp với chuyên môn sâu về React và Spring Boot, hướng đến phát triển các ứng dụng đa nền tảng với trải nghiệm người dùng xuất sắc. Mong muốn làm việc trong môi trường công nghệ năng động để phát triển kỹ năng và đóng góp giá trị cho doanh nghiệp.
                  </p>
                  
                  <h3 className="text-2xl font-semibold mb-4">Chứng chỉ</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      The Complete 2024 Web Development Bootcamp - Udemy
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      HTML, CSS, React - Certification for Beginners - Udemy
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      Chung kết IT got talent 2024
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-16 relative">
              Kỹ năng chuyên môn
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 mt-2"></div>
            </h2>
          </ScrollReveal>
          
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex flex-wrap justify-center mb-8">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(category)}
                      className={`px-4 py-2 m-1 rounded-md transition-colors ${
                        activeTab === category
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
                  {filteredSkills.map((skill, index) => (
                    <SkillBar key={index} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-16 relative">
              Dự án nổi bật
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 mt-2"></div>
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={project.id}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="mb-4">
                      <div className="flex flex-wrap">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mr-2 mb-2"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {project.links ? (
                        // For Reuzit project with frontend/backend links
                        <>
                          <a 
                            href={project.links.frontend} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <Code size={18} className="mr-1" />
                            Frontend Code
                            <ExternalLink size={14} className="ml-1" />
                          </a>
                          <a 
                            href={project.links.backend} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <Server size={18} className="mr-1" />
                            Backend Code
                            <ExternalLink size={14} className="ml-1" />
                          </a>
                        </>
                      ) : (
                        // For Innerglow project with single link
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <Code size={18} className="mr-1" />
                          Source Code
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      
      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-16 relative">
              Liên hệ với tôi
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 mt-2"></div>
            </h2>
          </ScrollReveal>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal>
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-6">Thông tin liên hệ</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <Mail size={20} className="text-blue-600 mr-4" />
                      <span>{personalInfo.email}</span>
                    </li>
                    <li className="flex items-center">
                      <Phone size={20} className="text-blue-600 mr-4" />
                      <span>{personalInfo.phone}</span>
                    </li>
                    <li className="flex items-center">
                      <MapPin size={20} className="text-blue-600 mr-4" />
                      <span>{personalInfo.location}</span>
                    </li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-8 mb-4">Kết nối với tôi</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                      <Code size={20} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal>
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-6">Gửi tin nhắn</h3>
                  <form>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2" htmlFor="name">
                        Họ tên
                      </label>
                      <input
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        id="name"
                        placeholder="Họ tên của bạn"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="email"
                        id="email"
                        placeholder="Email của bạn"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2" htmlFor="message">
                        Tin nhắn
                      </label>
                      <textarea
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="message"
                        rows="4"
                        placeholder="Tin nhắn của bạn"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                    >
                      Gửi tin nhắn
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-2">&copy; {new Date().getFullYear()} Hoàng Văn Lộc. All rights reserved.</p>
          <p className="text-gray-400">Được xây dựng với React, Javascript và Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;