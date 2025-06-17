
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface HandwritingSample {
  id: string;
  text_content: string;
  style: string;
  image_url: string | null;
  created_at: string;
}

export const useHandwritingData = () => {
  const { user } = useAuth();
  const [samples, setSamples] = useState<HandwritingSample[]>([]);
  const [loading, setLoading] = useState(false);
  const [generationsLeft, setGenerationsLeft] = useState(5); // Free tier default
  const [bonusGenerations, setBonusGenerations] = useState(0);

  // Fetch user's handwriting samples
  const fetchSamples = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('handwriting_samples')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSamples(data || []);
    } catch (error) {
      console.error('Error fetching samples:', error);
      toast.error('Failed to load your handwriting samples');
    } finally {
      setLoading(false);
    }
  };

  // Save a new handwriting sample
  const saveSample = async (textContent: string, style: string, imageUrl?: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('handwriting_samples')
        .insert({
          user_id: user.id,
          text_content: textContent,
          style: style,
          image_url: imageUrl
        })
        .select()
        .single();

      if (error) throw error;
      
      setSamples(prev => [data, ...prev]);
      
      // Decrease generation count
      if (bonusGenerations > 0) {
        setBonusGenerations(prev => prev - 1);
      } else {
        setGenerationsLeft(prev => Math.max(0, prev - 1));
      }
      
      toast.success('Handwriting sample saved!');
      return data;
    } catch (error) {
      console.error('Error saving sample:', error);
      toast.error('Failed to save handwriting sample');
      return null;
    }
  };

  // Add bonus generations from watching ads
  const addBonusGenerations = (count: number = 2) => {
    setBonusGenerations(prev => prev + count);
    toast.success(`Added ${count} bonus generations!`);
  };

  useEffect(() => {
    if (user) {
      fetchSamples();
    }
  }, [user]);

  return {
    samples,
    loading,
    generationsLeft,
    bonusGenerations,
    saveSample,
    addBonusGenerations,
    refetchSamples: fetchSamples
  };
};
