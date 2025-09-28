"use client"

import type React from "react"
import { useState, useEffect } from "react"

import { GithubLogo, LinkedinLogo, EnvelopeSimple, Phone, MapPin, Sun, Moon, Circuitry, DiscordLogo, Code, FileJs, FileTs, BracketsCurly, CreditCard, ArrowsClockwise, AndroidLogo, Leaf, Wrench, Globe } from "@phosphor-icons/react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import projectsData from "@/data/projects.json"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const progressVariants = {
  hidden: { width: 0 },
  visible: (value: number) => ({
    width: `${value}%`,
    transition: { duration: 1, ease: "easeOut" },
  }),
}

function AnimatedSection({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeIn}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  )
}

export default function Portfolio() {
  // First, let's update the tech stack data structure to remove percentages and projects
  const techStackData = {
    languages: [
      { name: "TypeScript", icon: <FileTs weight="fill" className="h-5 w-5" /> },
      { name: "JavaScript", icon: <FileJs weight="fill" className="h-5 w-5" /> },
      { name: "Kotlin", icon: <AndroidLogo weight="fill" className="h-5 w-5" /> },
      { name: "Dart", icon: <Leaf weight="fill" className="h-5 w-5" /> },
    ],
    frameworks: [
      { name: "React", icon: <BracketsCurly weight="fill" className="h-5 w-5" /> },
      { name: "Next.js", icon: <Code weight="fill" className="h-5 w-5" /> },
      { name: "Nest.js", icon: <Code weight="fill" className="h-5 w-5" /> },
      { name: "Discord.js", icon: <DiscordLogo weight="fill" className="h-5 w-5" /> },
      { name: "Flutter", icon: <Leaf weight="fill" className="h-5 w-5" /> },
    ],
    technologies: [
      { name: "Stripe", icon: <CreditCard weight="fill" className="h-5 w-5" /> },
      { name: "REST API", icon: <ArrowsClockwise weight="fill" className="h-5 w-5" /> },
      { name: "GraphQL", icon: <Code weight="fill" className="h-5 w-5" /> },  
      { name: "Docker", icon: <Wrench weight="fill" className="h-5 w-5" /> },
    ]
  }

  // Add this for theme toggling
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Add Navbar with theme toggle */}
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-5xl mx-auto px-6 flex h-14 items-center justify-between">
          <Link href="/" className="font-bold text-xl">@doniczka</Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" weight="fill" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" weight="fill" />
          </Button>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-6 py-10">
        {/* Hero Section - 2 Column Grid */}
        <motion.section
          className="py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Column - Personal Info */}
          <motion.div
            className="flex flex-col items-center md:items-start space-y-6 mx-auto md:mx-0"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Avatar Image */}
            <motion.div
              className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 mb-4"
              variants={fadeIn}
            >
              <Image
                src="/cwel.jpg"
                alt="Profile Avatar"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <motion.div className="inline-block p-2 bg-primary/10 rounded-lg" variants={fadeIn}>
              <span className="text-primary font-medium flex items-center gap-2">
                <Circuitry className="h-4 w-4" weight="fill" />
                Full Stack Developer
              </span>
            </motion.div>
            <motion.h1 className="text-4xl md:text-5xl font-bold text-center md:text-left" variants={fadeIn}>
              Miłosz Strzałkowski
            </motion.h1>
            <motion.p className="text-muted-foreground text-center md:text-left mb-1" variants={fadeIn}>
              @doniczka
            </motion.p>
            <motion.p className="text-xl text-muted-foreground text-center md:text-left" variants={fadeIn}>
              Building modern web and mobile applications with cutting-edge technologies. Specialized in TypeScript,
              React, and Next.js with 5+ years of experience.
            </motion.p>
            <motion.div className="flex gap-4 pt-4" variants={fadeIn}>
              <Button asChild className="px-8">
                <Link href="#projects">View Projects</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            className="bg-muted/50 p-4 sm:p-8 rounded-lg space-y-4 sm:space-y-6 mx-auto md:mx-0 w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Details</h2>

            <motion.div className="space-y-3 sm:space-y-4" variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div className="flex items-center gap-2 sm:gap-3 bg-background/80 p-2 sm:p-3 rounded-md" variants={fadeIn}>
                <EnvelopeSimple className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" weight="fill" />
                <div className="flex flex-col w-full">
                  <span className="text-xs sm:text-sm text-muted-foreground truncate">milosz.strzalkowski25@gmail.com</span>
                  <span className="text-xs px-1.5 py-0.5 bg-muted rounded-full text-muted-foreground inline-block w-fit mt-1">personal</span>
                </div>
              </motion.div>

              <motion.div className="flex items-center gap-2 sm:gap-3 bg-background/80 p-2 sm:p-3 rounded-md" variants={fadeIn}>
                <EnvelopeSimple className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" weight="fill" />
                <div className="flex flex-col w-full">
                  <span className="text-xs sm:text-sm text-muted-foreground">touch@strzala.lol</span>
                  <span className="text-xs px-1.5 py-0.5 bg-primary/20 rounded-full text-primary inline-block w-fit mt-1">work</span>
                </div>
              </motion.div>

              <motion.div className="flex items-center gap-2 sm:gap-3 bg-background/80 p-2 sm:p-3 rounded-md" variants={fadeIn}>
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" weight="fill" />
                <span className="text-xs sm:text-sm text-muted-foreground">+48 517 663 952</span>
              </motion.div>

              <motion.div className="flex items-center gap-2 sm:gap-3 bg-background/80 p-2 sm:p-3 rounded-md" variants={fadeIn}>
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" weight="fill" />
                <span className="text-xs sm:text-sm text-muted-foreground">Lodz, Poland</span>
              </motion.div>

              <motion.div className="flex items-center gap-2 pt-2 sm:pt-4 justify-center md:justify-start" variants={fadeIn}>
                <Button variant="outline" size="icon" asChild className="rounded-full h-8 w-8 sm:h-10 sm:w-10">
                  <Link href="https://github.com/doniczek" target="_blank">
                    <GithubLogo className="h-4 w-4 sm:h-5 sm:w-5" weight="fill" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild className="rounded-full h-8 w-8 sm:h-10 sm:w-10">
                  <Link href="https://www.linkedin.com/in/mi%C5%82osz-strza%C5%82kowski-a58189229/" target="_blank">
                    <LinkedinLogo className="h-4 w-4 sm:h-5 sm:w-5" weight="fill" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild className="rounded-full h-8 w-8 sm:h-10 sm:w-10">
                  <Link href="https://discord.com/users/485414045516562443" target="_blank">
                    <DiscordLogo className="h-4 w-4 sm:h-5 sm:w-5" weight="fill" />
                    <span className="sr-only">Discord</span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Tech Stack Percentage Section */}
        <AnimatedSection className="py-20">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Tech Stack Distribution
          </motion.h2>

          <div className="max-w-5xl mx-auto space-y-10">
            {/* Languages Card */}
            <AnimatedSection className="bg-background/40 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Programming Languages</h3>
              <motion.div 
                variants={staggerContainer} 
                initial="hidden" 
                animate="visible" 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {techStackData.languages.map((tech) => (
                  <TechItem
                    key={tech.name}
                    name={tech.name}
                    icon={tech.icon}
                  />
                ))}
              </motion.div>
            </AnimatedSection>

            {/* Frameworks Card */}
            <AnimatedSection className="bg-background/40 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Frameworks & Libraries</h3>
              <motion.div 
                variants={staggerContainer} 
                initial="hidden" 
                animate="visible" 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {techStackData.frameworks.map((tech) => (
                  <TechItem
                    key={tech.name}
                    name={tech.name}
                    icon={tech.icon}
                  />
                ))}
              </motion.div>
            </AnimatedSection>

            {/* Technologies Card */}
            <AnimatedSection className="bg-background/40 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Technologies & Tools</h3>
              <motion.div 
                variants={staggerContainer} 
                initial="hidden" 
                animate="visible" 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {techStackData.technologies.map((tech) => (
                  <TechItem
                    key={tech.name}
                    name={tech.name}
                    icon={tech.icon}
                  />
                ))}
              </motion.div>
            </AnimatedSection>

            {/* Stats Card */}
            <AnimatedSection className="bg-background/60 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-8">Tech Stack Analysis</h3>
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6" variants={staggerContainer}>
                  <motion.div variants={fadeIn}>
                    <StatsCard title="Projects" value="6+" description="Plus several minor projects" />
                  </motion.div>
                  <motion.div variants={fadeIn}>
                    <StatsCard title="Main Focus" value="TypeScript" />
                  </motion.div>
                  <motion.div variants={fadeIn}>
                    <StatsCard title="Frontend" value="60%" />
                  </motion.div>
                  <motion.div variants={fadeIn}>
                    <StatsCard title="Backend" value="40%" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        {/* Projects Section - Updated to use JSON data */}
        <AnimatedSection className="py-20" id="projects">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Featured Projects
          </motion.h2>
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8"
          >
            {projectsData.map((project) => (
              <AnimatedProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                githubUrl={project.githubUrl}
                websiteUrl={project.websiteUrl}
              />
            ))}
          </div>
        </AnimatedSection>
      </main>

      <footer className="border-t py-6">
        <div className="container max-w-5xl mx-auto px-6 flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © {new Date().getFullYear()} doniczka. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

function TechItem({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <motion.div 
      className="flex items-center gap-3 bg-background/60 p-3 rounded-md border border-border/50" 
      variants={fadeIn}
    >
      <div className="text-primary">{icon}</div>
      <span className="text-foreground font-medium">{name}</span>
    </motion.div>
  )
}

function AnimatedProjectCard({ 
  title, 
  description, 
  tags, 
  image, 
  githubUrl,
  websiteUrl 
}: { 
  title: string; 
  description: string; 
  tags: string[]; 
  image?: string;
  githubUrl?: string;
  websiteUrl?: string;
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.05 })
  
  const [forceRender, setForceRender] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceRender(true)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div 
      ref={ref} 
      variants={fadeIn}
      initial={{ opacity: 0, y: 20 }}
      animate={(isInView || forceRender) ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] bg-background/40 border border-border/50">
        {image && (
          <div className="p-4 sm:p-6 pt-6 sm:pt-8 flex justify-center bg-background/60">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-full border-4 border-primary/10">
              <Image 
                src={image} 
                alt={title}
                fill
                sizes="(max-width: 640px) 96px, 128px"
                className="object-cover"
                loading="eager"
                priority={true}
              />
            </div>
          </div>
        )}
        <CardContent className="p-4 sm:p-6">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">{title}</h3>
            <div className="flex gap-1">
              {websiteUrl && (
                <Button variant="ghost" size="icon" asChild className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-primary/10 hover:text-primary">
                  <Link href={websiteUrl} target="_blank">
                    <Globe className="h-3 w-3 sm:h-4 sm:w-4" weight="fill" />
                    <span className="sr-only">Website</span>
                  </Link>
                </Button>
              )}
              {githubUrl && (
                <Button variant="ghost" size="icon" asChild className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-primary/10 hover:text-primary">
                  <Link href={githubUrl} target="_blank">
                    <GithubLogo className="h-3 w-3 sm:h-4 sm:w-4" weight="fill" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 line-clamp-3">{description}</p>
          <div className="flex flex-wrap gap-1 sm:gap-2 mt-auto pt-2 border-t border-border/30">
            {tags.map((tag, index) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-primary/10 px-1.5 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function StatsCard({ title, value, description }: { title: string; value: string; description?: string }) {
  const [count, setCount] = useState(0)
  const isNumeric = !isNaN(parseInt(value))
  const finalValue = isNumeric ? parseInt(value) : 0
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (!isInView || !isNumeric) return
    
    let start = 0
    const end = finalValue
    const duration = 2000 // 2 seconds
    const startTime = Date.now()
    
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress === 1) {
        clearInterval(timer)
      }
    }, 16) // ~60fps
    
    return () => clearInterval(timer)
  }, [isInView, finalValue, isNumeric])
  
  return (
   <div>
   <div className="bg-background/80 p-5 rounded-lg shadow-sm border border-border/50 h-full flex flex-col justify-between" ref={ref}>
      <div className="text-sm text-muted-foreground mb-1">{title}</div>
      <div className="sm:text-xl font-bold text-primary">
        {isNumeric ? (
          <>
            {count}{value.includes("+") ? "+" : value.includes("%") ? "%" : ""}
          </>
        ) : (
          value
        )}
      </div>
      </div>
      <div>
        {description && (
          <div className="text-xs text-muted-foreground bg-background/80 mt-1 p-2">{description}</div>
        )}
      </div>
    </div>
  )
}

function getColorClass(index: number) {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-red-500",
  ]
  return colors[index % colors.length]
}

