import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { 
  Settings, 
  RefreshCw, 
  Github, 
  Trophy,
  Bell,
  User,
  LogIn,
  ExternalLink,
  Moon,
  Sun,
  Palette,
  Download,
  Share,
  Check,
  Clock,
  Code,
  GitBranch,
  Volume2,
  Shield,
  Database
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { useToast } from '../../hooks/use-toast';

export const Header = () => {
  const { lastUpdated, isLoading } = useSelector((state: RootState) => state.codingStats);
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Code Warrior',
    email: 'warrior@codearena.dev',
    bio: 'Passionate developer building amazing things'
  });
  const [notificationSettings, setNotificationSettings] = useState({
    achievements: true,
    milestones: true,
    updates: false,
    sound: true
  });
  
  // Apply theme on component mount and when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  
  const notifications = [
    {
      id: 1,
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'You completed 100 commits this month',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'milestone',
      title: 'Coding Streak',
      message: '🔥 15 day coding streak achieved!',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'update',
      title: 'Stats Updated',
      message: 'Your GitHub stats have been synced',
      time: '3 hours ago',
      read: true
    }
  ];
  
  const handleRefresh = () => {
    console.log('Refreshing stats...');
    toast({
      title: "Stats Refreshed",
      description: "Your coding stats have been updated successfully.",
    });
  };

  const handleGitHubAuth = () => {
    if (isAuthenticated) {
      // Redirect to GitHub profile
      window.open('https://github.com', '_blank');
    } else {
      // Simulate GitHub OAuth
      window.open('https://github.com/login/oauth/authorize?client_id=your_client_id&scope=user:email', '_blank');
      toast({
        title: "GitHub Authentication",
        description: "Redirecting to GitHub for authentication...",
      });
    }
  };

  const handleSignIn = () => {
    setIsAuthenticated(true);
    toast({
      title: "Signed In Successfully",
      description: "Welcome to CodeArena! Your GitHub account is now connected.",
    });
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    toast({
      title: isDarkMode ? "Light Mode Activated" : "Dark Mode Activated",
      description: `Successfully switched to ${isDarkMode ? 'light' : 'dark'} theme`,
    });
  };

  const openThemeCustomization = () => {
    setThemeDialogOpen(true);
  };

  const exportData = () => {
    const statsData = {
      profile: userProfile,
      notifications: notifications,
      settings: {
        theme: isDarkMode ? 'dark' : 'light',
        notifications: notificationSettings
      },
      stats: {
        commits: 1247,
        repos: 23,
        contributions: 892,
        streak: 15
      },
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(statsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `codearena-stats-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Stats Exported Successfully",
      description: "Your coding stats have been downloaded as JSON file",
    });
  };

  const shareProfile = async () => {
    const shareData = {
      title: 'Check out my CodeArena Stats!',
      text: 'See my coding achievements and progress on CodeArena',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Profile Shared",
          description: "Thanks for sharing your coding journey!",
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Profile Link Copied",
          description: "Share your coding dashboard with others!",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Share Failed",
        description: "Could not share profile. Link copied to clipboard instead.",
      });
    }
  };

  const openProfileSettings = () => {
    setProfileDialogOpen(true);
  };

  const openNotificationSettings = () => {
    setNotificationDialogOpen(true);
  };

  const saveProfileSettings = () => {
    setProfileDialogOpen(false);
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully",
    });
  };

  const saveNotificationSettings = () => {
    setNotificationDialogOpen(false);
    toast({
      title: "Notification Settings Updated",
      description: "Your preferences have been saved",
    });
  };

  const markAsRead = (notificationId: number) => {
    toast({
      title: "Marked as Read",
      description: "Notification marked as read",
    });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CodeArena</h1>
              <p className="text-sm text-muted-foreground">3D Developer Stats</p>
            </div>
          </div>

          {/* Status */}
          <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-success pulse-neon"></div>
              <span>Live Data</span>
            </div>
            {lastUpdated && (
              <span>
                Updated {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              disabled={isLoading}
              className="neon-glow"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full text-xs flex items-center justify-center text-primary-foreground">
                    {notifications.filter(n => !n.read).length}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-background border border-border shadow-lg z-50">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="p-4 text-sm text-muted-foreground text-center">
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem 
                      key={notification.id}
                      className="flex flex-col items-start p-4 cursor-pointer"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-between w-full">
                        <div className="flex items-center space-x-2">
                          {notification.type === 'achievement' && <Trophy className="w-4 h-4 text-primary" />}
                          {notification.type === 'milestone' && <Code className="w-4 h-4 text-success" />}
                          {notification.type === 'update' && <GitBranch className="w-4 h-4 text-info" />}
                          <span className="font-medium text-sm">{notification.title}</span>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                      <div className="flex items-center space-x-1 mt-2">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-center">
                  <span className="w-full text-sm text-primary">View All Notifications</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Github className="w-4 h-4" />
                  {isAuthenticated && (
                    <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-success rounded-full"></span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem onClick={handleGitHubAuth} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open('https://github.com/settings', '_blank')} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open('https://github.com/new', '_blank')} className="cursor-pointer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Create Repository
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={handleSignIn} className="cursor-pointer">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In with GitHub
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.open('https://github.com/join', '_blank')} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Create Account
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background border border-border shadow-lg z-50">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
                  {isDarkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={openThemeCustomization} className="cursor-pointer">
                  <Palette className="mr-2 h-4 w-4" />
                  Theme Customization
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={exportData} className="cursor-pointer">
                  <Download className="mr-2 h-4 w-4" />
                  Export Stats Data
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={shareProfile} className="cursor-pointer">
                  <Share className="mr-2 h-4 w-4" />
                  Share Profile
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={openProfileSettings} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={openNotificationSettings} className="cursor-pointer">
                  <Bell className="mr-2 h-4 w-4" />
                  Notification Preferences
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Theme Customization Dialog */}
      <Dialog open={themeDialogOpen} onOpenChange={setThemeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Theme Customization</DialogTitle>
            <DialogDescription>
              Customize your CodeArena experience with theme options.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="h-12 bg-blue-500/20 border-blue-500">
                Blue
              </Button>
              <Button variant="outline" className="h-12 bg-purple-500/20 border-purple-500">
                Purple
              </Button>
              <Button variant="outline" className="h-12 bg-green-500/20 border-green-500">
                Green
              </Button>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setThemeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setThemeDialogOpen(false)}>
              Apply Theme
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Settings Dialog */}
      <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Profile Settings</DialogTitle>
            <DialogDescription>
              Update your profile information and preferences.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={userProfile.name}
                onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userProfile.email}
                onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                value={userProfile.bio}
                onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setProfileDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveProfileSettings}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notification Preferences Dialog */}
      <Dialog open={notificationDialogOpen} onOpenChange={setNotificationDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Notification Preferences</DialogTitle>
            <DialogDescription>
              Choose which notifications you'd like to receive.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4" />
                <Label htmlFor="achievements">Achievement Notifications</Label>
              </div>
              <Switch
                id="achievements"
                checked={notificationSettings.achievements}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, achievements: checked})
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <Label htmlFor="milestones">Milestone Notifications</Label>
              </div>
              <Switch
                id="milestones"
                checked={notificationSettings.milestones}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, milestones: checked})
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4" />
                <Label htmlFor="updates">System Updates</Label>
              </div>
              <Switch
                id="updates"
                checked={notificationSettings.updates}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, updates: checked})
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4" />
                <Label htmlFor="sound">Sound Notifications</Label>
              </div>
              <Switch
                id="sound"
                checked={notificationSettings.sound}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, sound: checked})
                }
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setNotificationDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveNotificationSettings}>
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.header>
  );
};