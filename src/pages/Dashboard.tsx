import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Robot, Package, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Dashboard | Warehouse Flow Pilot';
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Robot className="w-8 h-8 text-primary" />
          Dashboard
        </h1>
        <Button onClick={() => navigate('/settings')}>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      // ... existing code ...
    </div>
  );
} 