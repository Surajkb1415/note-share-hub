import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NoteEditor = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const isEditMode = !!id;

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (isEditMode && user) {
      fetchNote();
    }
  }, [id, user]);

  const fetchNote = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not load note.',
      });
      navigate('/dashboard');
    } else if (data.user_id !== user?.id) {
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'You can only edit your own notes.',
      });
      navigate('/dashboard');
    } else {
      setTitle(data.title);
      setSubject(data.subject);
      setContent(data.content);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !subject || !content) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Please fill in all fields.',
      });
      return;
    }

    setSaving(true);

    if (isEditMode) {
      // Update existing note
      const { error } = await supabase
        .from('notes')
        .update({
          title,
          subject,
          content,
        })
        .eq('id', id);

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not update note.',
        });
      } else {
        toast({
          title: 'Note updated',
          description: 'Your note has been updated successfully.',
        });
        navigate(`/notes/${id}`);
      }
    } else {
      // Create new note
      const { data, error } = await supabase
        .from('notes')
        .insert({
          title,
          subject,
          content,
          user_id: user?.id,
        })
        .select()
        .single();

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not create note.',
        });
      } else {
        toast({
          title: 'Note created',
          description: 'Your note has been created successfully.',
        });
        navigate(`/notes/${data.id}`);
      }
    }

    setSaving(false);
  };

  if (loading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="outline" size="sm" asChild>
            <Link to={isEditMode ? `/notes/${id}` : '/dashboard'}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cancel
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>{isEditMode ? 'Edit Note' : 'Create New Note'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter note title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Mathematics, Physics, History"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your note content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  required
                  className="resize-none"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => navigate(isEditMode ? `/notes/${id}` : '/dashboard')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : isEditMode ? 'Update Note' : 'Create Note'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NoteEditor;
