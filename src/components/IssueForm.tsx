
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { MapPin, Upload, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

// Define the form schema
const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface IssueFormProps {
  onSubmit: (data: FormValues & { location: { lat: number; lng: number; address: string } }) => void;
}

const IssueForm: React.FC<IssueFormProps> = ({ onSubmit }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('Image size should not exceed 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    form.setValue('image', file);
  };

  const getLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // For demo purposes, use Delhi addresses
          // In a real app, would use Google Maps Geocoding API
          const delhiAreas = [
            "Connaught Place, New Delhi",
            "Nehru Place, New Delhi",
            "Karol Bagh, Delhi",
            "Chandni Chowk, Old Delhi",
            "Lajpat Nagar, Delhi",
            "Dwarka Sector 10, New Delhi",
            "Rohini Sector 9, Delhi",
            "Greater Kailash, New Delhi",
            "Rajouri Garden, Delhi",
            "Saket, New Delhi"
          ];
          
          const randomAddress = delhiAreas[Math.floor(Math.random() * delhiAreas.length)];
          
          setLocation({
            lat: latitude,
            lng: longitude,
            address: randomAddress
          });
          
          setIsGettingLocation(false);
          toast.success('Location detected successfully');
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsGettingLocation(false);
          toast.error('Failed to detect location. Please try again.');
        }
      );
    } else {
      setIsGettingLocation(false);
      toast.error('Geolocation is not supported by your browser');
    }
  };

  const handleFormSubmit = (values: FormValues) => {
    if (!location) {
      toast.error('Please detect your location first');
      return;
    }
    onSubmit({ ...values, location });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Title</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Broken road in Karol Bagh" {...field} />
              </FormControl>
              <FormDescription>
                Common issues: Broken Roads, Illegal Parking, Garbage Disposal, Noise Pollution, Open Defecation
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please describe the issue in detail... For example: Large potholes on the road near Karol Bagh Metro Station are causing accidents for two-wheelers." 
                  className="min-h-32"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormLabel className="block mb-2">Upload Image</FormLabel>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              <Input 
                type="file" 
                accept="image/*" 
                id="image-upload" 
                className="hidden"
                onChange={handleImageChange}
              />
              <label 
                htmlFor="image-upload" 
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  Click to upload an image of the issue
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  (Max size: 5MB)
                </span>
              </label>
            </div>
            
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                <div className="relative h-32 w-full overflow-hidden rounded">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div>
            <FormLabel className="block mb-2">Location</FormLabel>
            <div className="border-2 rounded-md p-4">
              <Button 
                type="button"
                variant="outline"
                className="w-full mb-4"
                disabled={isGettingLocation}
                onClick={getLocation}
              >
                <MapPin className="mr-2 h-4 w-4" />
                {isGettingLocation ? 'Detecting...' : 'Detect My Location'}
              </Button>
              
              {location ? (
                <div className="text-sm">
                  <p className="font-medium">Detected Address:</p>
                  <p className="text-gray-600 mt-1">{location.address}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  No location detected yet
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Button type="submit" className="w-full">Submit Report</Button>
      </form>
    </Form>
  );
};

export default IssueForm;
