import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Image, Download, Calendar, MapPin, Heart, X, ChevronLeft, ChevronRight, Sparkles, Camera, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Photo {
  id: string;
  filename: string;
  src: string;
  date: Date;
  type: 'photo' | 'sticker' | 'video';
  size: number;
}

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Dynamically load all images from the data folder
  useEffect(() => {
    const loadAllImages = async () => {
      try {
        // Get all files from the data folder
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
        const videoExtensions = ['.mp4', '.mov', '.avi'];
        
        // Create a list of all image and video files
        const allFiles: Photo[] = [];
        let id = 1;

        // This is a simplified approach - in a real app you'd fetch this from an API
        // For now, we'll create a comprehensive list based on the files we know exist
        const fileList = [
          // Photos
          { name: '00004584-PHOTO-2025-06-14-20-29-36.jpg', type: 'photo', size: 46 },
          { name: '00004392-PHOTO-2025-06-13-14-23-31.jpg', type: 'photo', size: 38 },
          { name: '00004389-PHOTO-2025-06-13-14-22-26.jpg', type: 'photo', size: 49 },
          { name: '00004372-PHOTO-2025-06-13-14-19-17.jpg', type: 'photo', size: 50 },
          { name: '00004359-PHOTO-2025-06-13-14-13-06.jpg', type: 'photo', size: 44 },
          { name: '00004196-PHOTO-2025-06-12-16-47-53.jpg', type: 'photo', size: 46 },
          { name: '00004151-PHOTO-2025-06-12-12-00-40.jpg', type: 'photo', size: 191 },
          { name: '00004072-PHOTO-2025-06-08-13-53-18.jpg', type: 'photo', size: 46 },
          { name: '00003455-PHOTO-2025-06-07-15-38-49.jpg', type: 'photo', size: 92 },
          { name: '00001368-PHOTO-2025-05-16-08-40-26.jpg', type: 'photo', size: 198 },
          { name: '00000860-PHOTO-2025-03-24-16-41-42.jpg', type: 'photo', size: 50 },
          { name: '00000483-PHOTO-2025-02-10-18-30-59.jpg', type: 'photo', size: 80 },
          { name: '00000416-PHOTO-2025-05-18-08-10-32.jpg', type: 'photo', size: 860 },
          { name: '00001818-PHOTO-2025-05-25-16-56-49.jpg', type: 'photo', size: 689 },
          { name: '00000425-PHOTO-2025-05-18-08-10-37.jpg', type: 'photo', size: 927 },
          { name: '00000620-PHOTO-2025-05-19-10-11-16.jpg', type: 'photo', size: 84 },
          { name: '00000647-PHOTO-2025-05-19-10-14-09.jpg', type: 'photo', size: 61 },
          { name: '00000426-PHOTO-2025-05-18-08-10-38.jpg', type: 'photo', size: 626 },
          { name: '00000431-PHOTO-2025-05-18-08-58-32.jpg', type: 'photo', size: 165 },
          { name: '00001820-PHOTO-2025-05-25-16-56-50.jpg', type: 'photo', size: 769 },
          { name: '00001814-PHOTO-2025-05-25-16-56-46.jpg', type: 'photo', size: 568 },
          { name: '00000624-PHOTO-2025-05-19-10-11-20.jpg', type: 'photo', size: 98 },
          { name: '00001828-PHOTO-2025-05-25-16-56-54.jpg', type: 'photo', size: 770 },
          { name: '00000419-PHOTO-2025-05-18-08-10-33.jpg', type: 'photo', size: 921 },
          { name: '00001817-PHOTO-2025-05-25-16-56-48.jpg', type: 'photo', size: 925 },
          { name: '00001827-PHOTO-2025-05-25-16-56-53.jpg', type: 'photo', size: 733 },
          { name: '00001813-PHOTO-2025-05-25-16-56-45.jpg', type: 'photo', size: 698 },
          { name: '00001831-PHOTO-2025-05-25-16-56-55.jpg', type: 'photo', size: 976 },
          { name: '00000422-PHOTO-2025-05-18-08-10-35.jpg', type: 'photo', size: 961 },
          { name: '00000623-PHOTO-2025-05-19-10-11-20.jpg', type: 'photo', size: 98 },
          { name: '00001829-PHOTO-2025-05-25-16-56-54.jpg', type: 'photo', size: 947 },
          { name: '00001821-PHOTO-2025-05-25-16-56-51.jpg', type: 'photo', size: 826 },
          { name: '00000418-PHOTO-2025-05-18-08-10-33.jpg', type: 'photo', size: 786 },
          { name: '00000625-PHOTO-2025-05-19-10-11-21.jpg', type: 'photo', size: 111 },
          { name: '00000428-PHOTO-2025-05-18-08-10-39.jpg', type: 'photo', size: 678 },
          { name: '00001815-PHOTO-2025-05-25-16-56-46.jpg', type: 'photo', size: 542 },
          { name: '00000646-PHOTO-2025-05-19-10-14-09.jpg', type: 'photo', size: 59 },
          { name: '00000427-PHOTO-2025-05-18-08-10-38.jpg', type: 'photo', size: 728 },
          { name: '00000410-PHOTO-2025-05-18-08-10-21.jpg', type: 'photo', size: 708 },
          { name: '00000414-PHOTO-2025-05-18-08-10-29.jpg', type: 'photo', size: 769 },
          { name: '00000621-PHOTO-2025-05-19-10-11-17.jpg', type: 'photo', size: 104 },
          { name: '00000424-PHOTO-2025-05-18-08-10-36.jpg', type: 'photo', size: 937 },
          { name: '00000417-PHOTO-2025-05-18-08-10-32.jpg', type: 'photo', size: 950 },
          { name: '00001806-PHOTO-2025-05-25-16-56-38.jpg', type: 'photo', size: 1015 },
          { name: '00000405-PHOTO-2025-05-18-08-10-13.jpg', type: 'photo', size: 843 },
          { name: '00001812-PHOTO-2025-05-25-16-56-44.jpg', type: 'photo', size: 1200 },
          { name: '00000413-PHOTO-2025-05-18-08-10-28.jpg', type: 'photo', size: 826 },
          { name: '00001826-PHOTO-2025-05-25-16-56-53.jpg', type: 'photo', size: 791 },
          { name: '00001808-PHOTO-2025-05-25-16-56-41.jpg', type: 'photo', size: 746 },
          { name: '00000420-PHOTO-2025-05-18-08-10-34.jpg', type: 'photo', size: 885 },
          { name: '00001811-PHOTO-2025-05-25-16-56-44.jpg', type: 'photo', size: 580 },
          { name: '00001807-PHOTO-2025-05-25-16-56-40.jpg', type: 'photo', size: 679 },
          { name: '00001825-PHOTO-2025-05-25-16-56-53.jpg', type: 'photo', size: 797 },
          { name: '00000430-PHOTO-2025-05-18-08-10-40.jpg', type: 'photo', size: 1200 },
          { name: '00001816-PHOTO-2025-05-25-16-56-47.jpg', type: 'photo', size: 591 },
          { name: '00001822-PHOTO-2025-05-25-16-56-51.jpg', type: 'photo', size: 586 },
          { name: '00000406-PHOTO-2025-05-18-08-10-14.jpg', type: 'photo', size: 882 },
          { name: '00001819-PHOTO-2025-05-25-16-56-50.jpg', type: 'photo', size: 862 },
          { name: '00000626-PHOTO-2025-05-19-10-11-21.jpg', type: 'photo', size: 109 },
          { name: '00000412-PHOTO-2025-05-18-08-10-26.jpg', type: 'photo', size: 127 },
          { name: '00001836-PHOTO-2025-05-25-17-05-48.jpg', type: 'photo', size: 828 },
          { name: '00001824-PHOTO-2025-05-25-16-56-52.jpg', type: 'photo', size: 137 },
          { name: '00001809-PHOTO-2025-05-25-16-56-42.jpg', type: 'photo', size: 709 },
          { name: '00000421-PHOTO-2025-05-18-08-10-34.jpg', type: 'photo', size: 913 },
          { name: '00000408-PHOTO-2025-05-18-08-10-15.jpg', type: 'photo', size: 866 },
          { name: '00001810-PHOTO-2025-05-25-16-56-43.jpg', type: 'photo', size: 652 },
          { name: '00002515-PHOTO-2025-05-30-13-57-10.jpg', type: 'photo', size: 127 },
          { name: '00002517-PHOTO-2025-05-30-13-58-07.jpg', type: 'photo', size: 937 },
          { name: '00001823-PHOTO-2025-05-25-16-56-52.jpg', type: 'photo', size: 627 },
          { name: '00007499-PHOTO-2025-06-25-00-23-33.jpg', type: 'photo', size: 194 },
          
          // Stickers
          { name: '00005031-STICKER-2025-06-21-22-59-53.webp', type: 'sticker', size: 3.9 },
          { name: '00004037-STICKER-2025-06-08-12-39-38.webp', type: 'sticker', size: 12 },
          { name: '00001898-STICKER-2025-05-23-04-39-48.webp', type: 'sticker', size: 14 },
          { name: '00000691-STICKER-2025-02-27-08-20-45.webp', type: 'sticker', size: 37 },
          { name: '00000397-STICKER-2025-01-20-10-01-35.webp', type: 'sticker', size: 202 },
          { name: '00000232-STICKER-2025-01-12-22-00-05.webp', type: 'sticker', size: 279 },
          { name: '00000233-STICKER-2025-01-12-22-00-38.webp', type: 'sticker', size: 363 },
          { name: '00000817-STICKER-2025-03-20-18-05-26.webp', type: 'sticker', size: 363 },
          { name: '00004858-STICKER-2025-06-17-14-15-03.webp', type: 'sticker', size: 363 },
          { name: '00007497-STICKER-2025-06-25-00-18-20.webp', type: 'sticker', size: 23 },
          { name: '00007498-STICKER-2025-06-25-00-19-26.webp', type: 'sticker', size: 20 },
          { name: '00000266-STICKER-2025-05-10-20-35-28.webp', type: 'sticker', size: 443 },
          { name: '00002000-STICKER-2025-05-26-17-36-17.webp', type: 'sticker', size: 37 },
          { name: '00002005-STICKER-2025-05-26-18-13-33.webp', type: 'sticker', size: 96 },
          { name: '00002004-STICKER-2025-05-26-18-12-38.webp', type: 'sticker', size: 26 },
          { name: '00002003-STICKER-2025-05-26-18-11-22.webp', type: 'sticker', size: 67 },
          { name: '00000642-STICKER-2025-05-19-10-13-22.webp', type: 'sticker', size: 190 },
          { name: '00002002-STICKER-2025-05-26-17-49-25.webp', type: 'sticker', size: 55 },
          { name: '00002008-STICKER-2025-05-26-18-14-41.webp', type: 'sticker', size: 15 },
          
          // Videos
          { name: '00001765-VIDEO-2025-05-21-23-00-30.mp4', type: 'video', size: 6700 },
          { name: '00000645-VIDEO-2025-05-19-10-14-08.mp4', type: 'video', size: 5100 },
          { name: '00000831-VIDEO-2025-05-22-15-16-43.mp4', type: 'video', size: 9200 },
          { name: '00001842-VIDEO-2025-05-25-17-06-13.mp4', type: 'video', size: 2100 },
          { name: '00001835-VIDEO-2025-05-25-17-01-24.mp4', type: 'video', size: 4200 },
          { name: '00001839-VIDEO-2025-05-25-17-05-59.mp4', type: 'video', size: 1600 },
          { name: '00001832-VIDEO-2025-05-25-16-56-56.mp4', type: 'video', size: 3600 },
          { name: '00000404-VIDEO-2025-05-18-08-10-11.mp4', type: 'video', size: 2100 },
          { name: '00000672-VIDEO-2025-05-21-19-55-19.mp4', type: 'video', size: 161 },
          { name: '00000411-VIDEO-2025-05-18-08-10-25.mp4', type: 'video', size: 887 },
          { name: '00001840-VIDEO-2025-05-25-17-06-00.mp4', type: 'video', size: 403 },
          { name: '00000429-VIDEO-2025-05-18-08-10-39.mp4', type: 'video', size: 1600 },
          { name: '00000403-VIDEO-2025-05-18-08-10-07.mp4', type: 'video', size: 3200 },
          { name: '00000911-VIDEO-2025-05-22-18-05-46.mp4', type: 'video', size: 688 },
          { name: '00001841-VIDEO-2025-05-25-17-06-11.mp4', type: 'video', size: 13000 },
          { name: '00000643-VIDEO-2025-05-19-10-13-53.mp4', type: 'video', size: 560 },
          { name: '00000402-VIDEO-2025-05-18-08-10-03.mp4', type: 'video', size: 1400 },
          { name: '00001837-VIDEO-2025-05-25-17-05-52.mp4', type: 'video', size: 4900 },
          { name: '00000644-VIDEO-2025-05-19-10-13-54.mp4', type: 'video', size: 638 },
          { name: '00000409-VIDEO-2025-05-18-08-10-19.mp4', type: 'video', size: 2200 },
        ];

        // Process each file
        for (const file of fileList) {
          const filename = file.name;
          const dateMatch = filename.match(/(\d{4})-(\d{2})-(\d{2})/);
          
          if (dateMatch) {
            const [, year, month, day] = dateMatch;
            const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            
            allFiles.push({
              id: id.toString(),
              filename: filename,
              src: `/data/${filename}`,
              date: date,
              type: file.type as 'photo' | 'sticker' | 'video',
              size: file.size
            });
            id++;
          }
        }

        // Sort by date (newest first)
        allFiles.sort((a, b) => b.date.getTime() - a.date.getTime());
        
        setPhotos(allFiles);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading photos:', error);
        setIsLoading(false);
      }
    };

    loadAllImages();
  }, []);

  const openPhoto = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    if (selectedPhoto) {
      const nextIndex = (currentIndex + 1) % photos.length;
      setSelectedPhoto(photos[nextIndex]);
      setCurrentIndex(nextIndex);
    }
  };

  const prevPhoto = () => {
    if (selectedPhoto) {
      const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
      setSelectedPhoto(photos[prevIndex]);
      setCurrentIndex(prevIndex);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} KB`;
    return `${(size / 1024).toFixed(1)} MB`;
  };

  const photosByMonth = photos.reduce((acc, photo) => {
    const monthKey = photo.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(photo);
    return acc;
  }, {} as Record<string, Photo[]>);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sticker': return '🎯';
      case 'video': return '🎥';
      default: return '📸';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sticker': return 'bg-yellow-500 text-white';
      case 'video': return 'bg-red-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* New Header Design */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        {/* Background with animated elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Animated floating elements */}
          <div className="absolute top-4 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-20 w-3 h-3 bg-white/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-4 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
        </div>
        
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              {/* Left side - Navigation and title */}
              <div className="flex items-center gap-8">
                <Link 
                  to="/"
                  className="group p-4 rounded-2xl bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30"
                >
                  <ArrowLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </Link>
                
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-lg">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Memory Lane</h1>
                    <p className="text-white/80 text-lg">Every moment captured with love, Divya</p>
                  </div>
                </div>
              </div>
              
              {/* Right side - Stats */}
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{photos.filter(p => p.type === 'photo').length}</div>
                      <div className="text-white/80 text-sm">Photos</div>
                    </div>
                    <div className="w-px h-12 bg-white/30"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{photos.filter(p => p.type === 'sticker').length}</div>
                      <div className="text-white/80 text-sm">Stickers</div>
                    </div>
                    <div className="w-px h-12 bg-white/30"></div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{photos.filter(p => p.type === 'video').length}</div>
                      <div className="text-white/80 text-sm">Videos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">Loading your beautiful memories...</p>
          </motion.div>
        ) : (
          <div className="space-y-10">
            {Object.entries(photosByMonth).map(([month, monthPhotos], monthIndex) => (
              <motion.div
                key={month}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: monthIndex * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-1">{month}</h2>
                    <p className="text-white/90">{monthPhotos.length} precious moments</p>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                    {monthPhotos.map((photo, index) => (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (monthIndex * 0.1) + (index * 0.03) }}
                        whileHover={{ scale: 1.05, y: -8 }}
                        className="group cursor-pointer"
                        onClick={() => openPhoto(photo, photos.indexOf(photo))}
                      >
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg border border-gray-200">
                          {photo.type === 'video' ? (
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group cursor-pointer" onClick={() => openPhoto(photo, photos.indexOf(photo))}>
                              <div className="text-center">
                                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                                  <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                                </div>
                                <p className="text-xs text-gray-600">Click to play video</p>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={photo.src}
                              alt={photo.filename}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCAxMDBDODAgODkuNTQ0IDg4LjU0NCA4MSA5OSA4MUgxMDFDMTExLjQ1NiA4MSAxMjAgODkuNTQ0IDEyMCAxMDBDMTIwIDExMC40NTYgMTExLjQ1NiAxMTkgMTAxIDExOUg5OUM4OC41NDQgMTE5IDgwIDExMC40NTYgODAgMTAwWiIgZmlsbD0iI0QxRDRGQSIvPgo8cGF0aCBkPSJNMTIwIDEyMEg4MFYxNDBIMTIwVjEyMFoiIGZpbGw9IiNEMUQ0RkEiLz4KPC9zdmc+';
                              }}
                            />
                          )}
                          
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                <Image className="w-6 h-6 text-gray-800" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Type indicator */}
                          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(photo.type)} shadow-lg`}>
                            {getTypeIcon(photo.type)}
                          </div>
                          
                          {/* Date overlay */}
                          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded-lg backdrop-blur-sm">
                            {photo.date.getDate()}
                          </div>
                        </div>
                        
                        <div className="mt-3 text-center">
                          <p className="text-xs text-gray-600 truncate font-medium">{photo.filename.split('-').slice(-1)[0]}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(photo.size)}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closePhoto}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closePhoto}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={prevPhoto}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextPhoto}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative">
                {selectedPhoto.type === 'video' ? (
                  <video
                    src={selectedPhoto.src}
                    controls
                    autoPlay
                    className="w-full h-auto max-h-[70vh] object-contain"
                    onError={(e) => {
                      console.error('Video playback error:', e);
                    }}
                  >
                    <source src={selectedPhoto.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.filename}
                    className="w-full h-auto max-h-[70vh] object-contain"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCAxMDBDODAgODkuNTQ0IDg4LjU0NCA4MSA5OSA4MUgxMDFDMTExLjQ1NiA4MSAxMjAgODkuNTQ0IDEyMCAxMDBDMTIwIDExMC40NTYgMTExLjQ1NiAxMTkgMTAxIDExOUg5OUM4OC41NDQgMTE5IDgwIDExMC40NTYgODAgMTAwWiIgZmlsbD0iI0QxRDRGQSIvPgo8cGF0aCBkPSJNMTIwIDEyMEg4MFYxNDBIMTIwVjEyMFoiIGZpbGw9IiNEMUQ0RkEiLz4KPC9zdmc+';
                    }}
                  />
                )}
              </div>

              {/* Info */}
              <div className="p-8 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedPhoto.filename}</h3>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        {formatDate(selectedPhoto.date)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        {formatFileSize(selectedPhoto.size)}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${getTypeColor(selectedPhoto.type)}`}>
                    {selectedPhoto.type === 'sticker' ? 'Sticker' : selectedPhoto.type === 'video' ? 'Video' : 'Photo'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{currentIndex + 1} of {photos.length}</span>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>Precious Memory</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery; 