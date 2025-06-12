import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { FolderX } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-muted p-4">
              <FolderX className="h-12 w-12 text-primary" aria-hidden="true" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold">404</CardTitle>
          <CardDescription className="text-xl mt-2">
            Página não encontrada
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 text-center">
          <p className="text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
          <p className="text-sm text-muted-foreground">
            URL acessada: <code className="text-primary">{location.pathname}</code>
          </p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 transition-colors"
          >
            Voltar para o início
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
