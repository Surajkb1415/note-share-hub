import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, BookOpen, Clock, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: string;
  title: string;
  subject: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserNotes();
    }
  }, [user]);

  const fetchUserNotes = async () => {
    setNotesLoading(true);
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user?.id)
      .order('updated_at', { ascending: false });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not load your notes.',
      });
    } else {
      setNotes(data || []);
    }
    setNotesLoading(false);
  };

  if (loading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">Manage and view your notes</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/notes">
                <FileText className="w-4 h-4 mr-2" />
                Browse All Notes
              </Link>
            </Button>
            <Button asChild>
              <Link to="/notes/create">
                <PlusCircle className="w-4 h-4 mr-2" />
                Create Note
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notesLoading ? (
            <Card className="col-span-full">
              <CardContent className="py-8 text-center text-muted-foreground">
                Loading your notes...
              </CardContent>
            </Card>
          ) : notes.length === 0 ? (
            <Card className="col-span-full shadow-card">
              <CardContent className="py-12 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No notes yet</h3>
                <p className="text-muted-foreground mb-4">Start creating your first note!</p>
                <Button asChild>
                  <Link to="/notes/create">Create Note</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            notes.map((note) => (
              <Card key={note.id} className="hover:shadow-soft transition-shadow cursor-pointer" onClick={() => navigate(`/notes/${note.id}`)}>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{note.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <span className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-md text-xs font-medium">
                      {note.subject}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{note.content}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Updated {new Date(note.updated_at).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
