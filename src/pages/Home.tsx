import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Warehouse Flow</CardTitle>
          <CardDescription>
            Manage your warehouse operations efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full justify-center"
              onClick={() => navigate("/settings")}
            >
              Connection Settings
            </Button>
            <Button
              variant="outline"
              className="w-full justify-center"
              onClick={() => navigate("/publish")}
            >
              Publish Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home; 