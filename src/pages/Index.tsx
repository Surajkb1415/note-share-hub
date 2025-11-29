import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Users, Zap } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">NoteShare</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-block mb-4">
              <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center shadow-soft">
                <BookOpen className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl font-bold tracking-tight">
              Share Knowledge,<br />Learn Together
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              NoteShare is a platform where students create, share, and discover notes. 
              Build your knowledge base and help others learn.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 mx-auto bg-secondary rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Create Notes</h3>
              <p className="text-muted-foreground">
                Write and organize your notes with an easy-to-use editor. Add titles, subjects, and content.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-14 h-14 mx-auto bg-secondary rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Share & Discover</h3>
              <p className="text-muted-foreground">
                All notes are public. Browse what others have shared and contribute to the community.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-14 h-14 mx-auto bg-secondary rounded-xl flex items-center justify-center">
                <Zap className="w-7 h-7 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Search & Filter</h3>
              <p className="text-muted-foreground">
                Find exactly what you need with powerful search and filtering by subject, creator, and date.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-primary rounded-2xl p-12 text-center shadow-soft max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to start learning?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Join NoteShare today and be part of a growing community of students helping each other succeed.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Create Account</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 NoteShare. Made for students, by students.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
