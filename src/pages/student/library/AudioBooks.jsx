import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';

const AudioBooks = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold sm:text-left">Text Book (Audio)</h1>
      
      <Card>
        <CardHeader className="bg-eduos-primary text-white sm:text-left py-3 sm:py-4">
          <CardTitle className="text-lg sm:text-xl">School Books Library</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center">
          <p className="text-gray-500 text-sm sm:text-base">No books found for this class</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AudioBooks;
