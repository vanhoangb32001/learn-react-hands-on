
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowUpDown, Phone, User } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

type Contact = {
  id: string;
  name: string;
  phone: string;
  group: string;
};

const mockContacts: Contact[] = [
  { id: '1', name: 'Nguyễn Văn An', phone: '0901234567', group: 'Bạn bè' },
  { id: '2', name: 'Trần Thị Bình', phone: '0912345678', group: 'Công việc' },
  { id: '3', name: 'Lê Hoàng Cường', phone: '0923456789', group: 'Gia đình' },
  { id: '4', name: 'Phạm Thị Dung', phone: '0934567890', group: 'Bạn bè' },
  { id: '5', name: 'Hoàng Văn Em', phone: '0945678901', group: 'Công việc' },
  { id: '6', name: 'Đỗ Thị Phương', phone: '0956789012', group: 'Gia đình' },
  { id: '7', name: 'Vũ Văn Giang', phone: '0967890123', group: 'Bạn bè' },
  { id: '8', name: 'Bùi Thị Hoa', phone: '0978901234', group: 'Công việc' },
];

type SortType = 'asc' | 'desc';

const ContactDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortType>('asc');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update document title with result count
  useEffect(() => {
    const filteredCount = getFilteredContacts().length;
    document.title = `Danh bạ (${filteredCount} kết quả) - Contact Demo`;
    
    return () => {
      document.title = 'Contact Demo - Mức Trung cấp';
    };
  }, [debouncedSearch, selectedGroup, sortOrder]);

  const getFilteredContacts = () => {
    let filtered = mockContacts;

    // Filter by search term
    if (debouncedSearch) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Filter by group
    if (selectedGroup) {
      filtered = filtered.filter(contact => contact.group === selectedGroup);
    }

    // Sort by name
    filtered.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name, 'vi');
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  };

  const groups = Array.from(new Set(mockContacts.map(contact => contact.group)));
  const filteredContacts = getFilteredContacts();

  const highlightMatch = (text: string, search: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <mark key={index} className="bg-yellow-200 dark:bg-yellow-800">{part}</mark> : part
    );
  };

  return (
    <main className="container mx-auto py-8">
      <SEOHead
        title="Contact Demo - Mức Trung cấp"
        description="Demo ứng dụng danh bạ với tìm kiếm và lọc"
        canonicalPath="/demos/contact"
      />
      
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Danh bạ liên hệ Demo</h1>
          <p className="text-muted-foreground">Mức Trung cấp - Tìm kiếm và lọc danh bạ</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Công cụ tìm kiếm & lọc</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm theo tên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Button
                variant="outline"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-2"
              >
                <ArrowUpDown className="h-4 w-4" />
                {sortOrder === 'asc' ? 'A→Z' : 'Z→A'}
              </Button>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedGroup === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedGroup('')}
              >
                Tất cả nhóm
              </Button>
              {groups.map(group => (
                <Button
                  key={group}
                  variant={selectedGroup === group ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedGroup(group)}
                >
                  {group}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Kết quả ({filteredContacts.length} liên hệ)
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredContacts.map(contact => (
              <Card key={contact.id} className="card-hover">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {highlightMatch(contact.name, debouncedSearch)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{contact.phone}</span>
                    </div>
                    
                    <Badge variant="secondary" className="text-xs">
                      {contact.group}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredContacts.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Không tìm thấy liên hệ nào phù hợp với tiêu chí tìm kiếm.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
};

export default ContactDemo;
