const config = {
  title: "Tims Tittus | Cybersecurity Enthusiast & Full-Stack Developer",
  description: {
    long: "Explore my portfolio as a cybersecurity enthusiast and full-stack developer focused on building secure, scalable, and interactive digital experiences. I specialize in modern web technologies, immersive UI/UX, 3D animations, and innovative system design, blending creativity with strong technical foundations. From robust backend architectures to visually engaging frontends, my work reflects a passion for solving real-world problems through technology. Let’s collaborate to create impactful, future-ready solutions together.",
    short:
      "Discover the portfolio of Tims, a full-stack developer crafting secure, interactive web experiences and innovative digital solutions.",
  },
  keywords: [
    "Tims",
    "portfolio",
    "cybersecurity",
    "ethical hacking",
    "penetration testing",
    "network security",
    "digital forensics",
    "cryptography",
    "SOC analyst",
    "threat detection",
    "incident response",
    "vulnerability assessment",
    "malware analysis",
    "cyber defense",
    "AI security",
    "artificial intelligence",
    "full-stack developer",
    "web development",
    "secure web applications",
    "React",
    "Next.js",
  ],
  author: "Tims Tittus",
  email: "timstittus1@gmail.com",
  site: "https://timstittus1.vercel.app",

  // for github stars button
  githubUsername: "timstittus1",
  githubRepo: "3d-portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/timstittus",
    linkedin: "https://www.linkedin.com/in/tims-tittus/",
    instagram: "https://www.instagram.com/tims_tittus",
    facebook: "https://www.facebook.com/timstittus/",
    github: "https://github.com/timstittus",
  },
};
export { config };
