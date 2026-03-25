import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { FileText, Download, GraduationCap, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { playSound } from '../lib/sounds';

export default function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleDownload = () => {
    playSound('click');
    // In a real app, this would link to the actual PDF file
    alert('Resume download started! (Demo)');
  };

  const handleHover = () => {
    playSound('hover');
  };

  return (
    <section id="resume" className="py-24 md:py-48 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 md:mb-24">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Resume</h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              A summary of my academic background, technical skills, and professional aspirations.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleDownload}
            onMouseEnter={handleHover}
            className="group flex items-center gap-3 px-8 py-4 rounded-full glass font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-500"
          >
            <Download size={20} className="group-hover:translate-y-1 transition-transform" />
            Download CV
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column: Education & Objective */}
          <div className="lg:col-span-2 space-y-12">
            {/* Career Objective */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass p-8 rounded-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center">
                  <Briefcase className="text-foreground" size={24} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Career Objective</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Seeking internship opportunities to gain practical exposure in technology and artificial intelligence domains. 
                Aiming to work alongside experienced professionals, contribute to meaningful projects, and enhance technical 
                capabilities while developing problem-solving expertise. Looking for environments that encourage learning, 
                innovation, and collaborative work culture.
              </p>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center">
                  <GraduationCap className="text-foreground" size={24} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Education</h3>
              </div>

              <div className="space-y-8">
                <div className="relative pl-8 border-l border-border">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-foreground" />
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
                    <h4 className="text-xl font-bold">BCA in Artificial Intelligence</h4>
                    <span className="text-sm font-bold uppercase tracking-widest px-3 py-1 rounded-full glass">2nd Semester | Ongoing</span>
                  </div>
                  <p className="text-muted-foreground">
                    Specialised programme focusing on AI concepts, programming fundamentals, and technology applications.
                  </p>
                </div>

                <div className="relative pl-8 border-l border-border">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-border" />
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
                    <h4 className="text-xl font-bold">Senior Secondary Education</h4>
                    <span className="text-sm font-bold uppercase tracking-widest px-3 py-1 rounded-full glass">Completed 2025</span>
                  </div>
                  <p className="text-muted-foreground">
                    Relevant coursework in Mathematics and Computer Science.
                  </p>
                </div>

                <div className="relative pl-8 border-l border-border">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-border" />
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
                    <h4 className="text-xl font-bold">Secondary Education</h4>
                    <span className="text-sm font-bold uppercase tracking-widest px-3 py-1 rounded-full glass">Completed 2023</span>
                  </div>
                  <p className="text-muted-foreground">
                    Foundation in core subjects with a focus on logical thinking and science.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Areas of Interest */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                { title: 'Artificial Intelligence', desc: 'Exploring AI tools and machine learning.' },
                { title: 'Web Development', desc: 'Building responsive websites with modern tech.' },
                { title: 'Problem Solving', desc: 'Applying logical thinking to complex challenges.' }
              ].map((item, i) => (
                <div key={i} className="glass p-6 rounded-2xl">
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Skills & Info */}
          <div className="space-y-8">
            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass p-8 rounded-3xl"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Award size={20} /> Technical Skills
              </h3>
              <ul className="space-y-4">
                {[
                  'Basic Web Development (HTML, CSS)',
                  'AI Tools and Applications',
                  'Programming Concepts and Logic',
                  'Problem-Solving and Analytical Thinking'
                ].map((skill, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-foreground mt-0.5 shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Professional Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="glass p-8 rounded-3xl"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 size={20} /> Professional Skills
              </h3>
              <ul className="space-y-4">
                {[
                  'Effective Communication',
                  'Team Collaboration',
                  'Time Management',
                  'Adaptability and Learning Agility'
                ].map((skill, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="glass p-8 rounded-3xl bg-foreground/5 border-none"
            >
              <h3 className="text-xl font-bold mb-4">Work Ethic</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dedicated, punctual, and committed to delivering quality work within deadlines. 
                Self-motivated learner with strong interest in staying updated with emerging technologies.
              </p>
              <div className="mt-6 pt-6 border-t border-border">
                <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/40">Available for</span>
                <p className="text-xs font-bold mt-1">Internships | Project Collaborations</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
