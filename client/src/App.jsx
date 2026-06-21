import { usePortfolioData } from './hooks/usePortfolioData';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ExperienceLog from './components/ExperienceLog';
import About from './components/About';
import Contact from './components/Contact';
import { LoadingScreen, ErrorScreen } from './components/StatusScreens';

export default function App() {
  const { data, loading, error } = usePortfolioData();

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;

  return (
    <>
      <NavBar name={data.profile?.name} />
      <Hero profile={data.profile} />
      <Projects projects={data.projects} />
      <ExperienceLog internships={data.internships} />
      <About
        summary={data.profile?.summary}
        skills={data.skills}
        education={data.education}
        achievements={data.achievements}
        research={data.research}
        certifications={data.certifications}
      />
      <Contact profile={data.profile} />
    </>
  );
}
