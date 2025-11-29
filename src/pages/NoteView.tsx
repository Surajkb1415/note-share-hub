import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Edit, Trash2, User, Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Note {
  id: string;
  title: string;
  subject: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  profiles: {
    username: string;
  };
}

const NoteView = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const [note, setNote] = useState<Note | null>(null);
  const [noteLoading, setNoteLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (id && user) {
      fetchNote();
    }
  }, [id, user]);

  const fetchNote = async () => {
    setNoteLoading(true);
    const { data, error } = await supabase
      .from('notes')
      .select(`
        *,
        profiles (
          username
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not load note.',
      });
      navigate('/notes');
    } else {
      setNote(data);
    }
    setNoteLoading(false);
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('notes').delete().eq('id', id);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not delete note.',
      });
    } else {
      toast({
        title: 'Note deleted',
        description: 'Your note has been deleted successfully.',
      });
      navigate('/dashboard');
    }
  };

  if (loading || noteLoading || !note) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const isOwner = user?.id === note.user_id;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/notes">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Notes
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-card">
          <CardHeader>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h1 className="text-3xl font-bold">{note.title}</h1>
                {isOwner && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/notes/${note.id}/edit`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Note</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this note? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full font-medium">
                  {note.subject}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {note.profiles?.username || 'Unknown'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Created {new Date(note.created_at).toLocaleDateString()}
                </span>
                {note.updated_at !== note.created_at && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Updated {new Date(note.updated_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap text-foreground leading-relaxed">{note.content}</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NoteView;
