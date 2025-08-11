
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Moon, 
  Sun, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

type MetricData = {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  trend: 'up' | 'down' | 'stable';
};

type ListItem = {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
  value: number;
};

const mockMetrics: MetricData[] = [
  { label: 'Tổng người dùng', value: 1234, icon: Users, trend: 'up' },
  { label: 'Doanh thu', value: 56789, icon: TrendingUp, trend: 'up' },
  { label: 'Đơn hàng', value: 432, icon: ShoppingCart, trend: 'stable' },
];

const mockListData: ListItem[] = [
  { id: '1', name: 'Dự án Alpha', status: 'active', priority: 'high', value: 85 },
  { id: '2', name: 'Tính năng Beta', status: 'pending', priority: 'medium', value: 60 },
  { id: '3', name: 'Cập nhật Gamma', status: 'completed', priority: 'low', value: 100 },
  { id: '4', name: 'Phát triển Delta', status: 'active', priority: 'high', value: 40 },
  { id: '5', name: 'Kiểm tra Epsilon', status: 'pending', priority: 'medium', value: 75 },
];

const DashboardDemo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isCounterRunning, setIsCounterRunning] = useState(false);
  const [listFilter, setListFilter] = useState<string>('all');
  const [listSort, setListSort] = useState<'name' | 'value'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Theme persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem('demo-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('demo-theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Counter timer with cleanup
  useEffect(() => {
    let interval: number | undefined;
    if (isCounterRunning) {
      interval = window.setInterval(() => {
        setCounter(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCounterRunning]);

  const toggleCounter = () => {
    setIsCounterRunning(!isCounterRunning);
  };

  const resetCounter = () => {
    setCounter(0);
    setIsCounterRunning(false);
  };

  const getFilteredAndSortedList = () => {
    let filtered = mockListData;
    
    if (listFilter !== 'all') {
      filtered = filtered.filter(item => item.status === listFilter);
    }
    
    filtered.sort((a, b) => {
      let comparison = 0;
      if (listSort === 'name') {
        comparison = a.name.localeCompare(b.name, 'vi');
      } else {
        comparison = a.value - b.value;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return filtered;
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'completed': return 'outline';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  return (
    <main className="container mx-auto py-8">
      <SEOHead
        title="Dashboard Demo - Mức Nâng cao"
        description="Demo dashboard với widgets và theme toggle"
        canonicalPath="/demos/dashboard"
      />
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Demo</h1>
            <p className="text-muted-foreground">Mức Nâng cao - Bảng điều khiển với widgets</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Sun className="h-4 w-4" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
            <Moon className="h-4 w-4" />
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold">{formatNumber(metric.value)}</p>
                  </div>
                  <metric.icon className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Counter Widget */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Bộ đếm tự động</p>
                <p className="text-2xl font-bold">{formatNumber(counter)}</p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={toggleCounter}>
                    {isCounterRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={resetCounter}>
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* List Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách dự án</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="text-sm">Lọc:</span>
                {['all', 'active', 'pending', 'completed'].map(status => (
                  <Button
                    key={status}
                    size="sm"
                    variant={listFilter === status ? 'default' : 'outline'}
                    onClick={() => setListFilter(status)}
                  >
                    {status === 'all' ? 'Tất cả' :
                     status === 'active' ? 'Đang thực hiện' :
                     status === 'pending' ? 'Chờ xử lý' : 'Hoàn thành'}
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                <span className="text-sm">Sắp xếp:</span>
                <Button
                  size="sm"
                  variant={listSort === 'name' ? 'default' : 'outline'}
                  onClick={() => setListSort('name')}
                >
                  Tên
                </Button>
                <Button
                  size="sm"
                  variant={listSort === 'value' ? 'default' : 'outline'}
                  onClick={() => setListSort('value')}
                >
                  Giá trị
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {getFilteredAndSortedList().map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-md border">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{item.name}</span>
                      <Badge variant={getStatusBadgeVariant(item.status)}>
                        {item.status === 'active' ? 'Đang thực hiện' :
                         item.status === 'pending' ? 'Chờ xử lý' : 'Hoàn thành'}
                      </Badge>
                      <span className={`text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority === 'high' ? 'Cao' :
                         item.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default DashboardDemo;
