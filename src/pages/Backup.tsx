import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { DatabaseBackup } from 'lucide-react';

const Backup = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: 'Backup realizado',
        description: 'O backup foi realizado com sucesso.',
      });
    }, 1000);
  };

  return (
    <div className="flex w-full">
      <main className="flex-1 flex flex-col justify-start p-8 max-w-5xl">
        <div className="flex gap-3 mb-6 py-1 items-center">
          <h1 className="text-2xl font-bold">Backup do Sistema</h1>
          <DatabaseBackup className="text-primary h-6 w-6" />
        </div>
        <div className="w-full max-w-5xl">
          <Card>
            <CardHeader>
              <CardTitle>Backup</CardTitle>
              <CardDescription>
                Realize o backup dos dados do sistema manualmente ou configure o backup automático.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="auto-backup" defaultChecked />
                <Label htmlFor="auto-backup">Backup Automático</Label>
              </div>
              <div className="pt-4">
                <Button variant="default" onClick={handleSave} disabled={saving}>
                  {saving ? 'Realizando backup...' : 'Iniciar Backup Manual'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Backup;
