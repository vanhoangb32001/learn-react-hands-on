
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';

type TodoItem = {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date;
};

type FilterType = 'all' | 'active' | 'done';

const TodoDemo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('demo-todos');
    if (saved) {
      const parsed = JSON.parse(saved);
      setTodos(parsed.map((todo: any) => ({ ...todo, createdAt: new Date(todo.createdAt) })));
    }
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('demo-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: TodoItem = {
        id: Date.now().toString(),
        title: newTodo.trim(),
        done: false,
        createdAt: new Date()
      };
      setTodos(prev => [...prev, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const startEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditingText(currentTitle);
  };

  const saveEdit = () => {
    if (editingText.trim() && editingId) {
      setTodos(prev => prev.map(todo =>
        todo.id === editingId ? { ...todo, title: editingText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.done;
    if (filter === 'done') return todo.done;
    return true;
  });

  return (
    <main className="container mx-auto py-8 max-w-2xl">
      <SEOHead
        title="Todo Demo - Mức Cơ bản"
        description="Demo ứng dụng Todo đơn giản với React"
        canonicalPath="/demos/todo"
      />
      
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Mini Todo Demo</h1>
          <p className="text-muted-foreground">Mức Cơ bản - Ứng dụng ghi chú đơn giản</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Thêm ghi chú mới</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Nhập ghi chú..."
                onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                className="flex-1"
              />
              <Button onClick={addTodo} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {(['all', 'active', 'done'] as FilterType[]).map(filterType => (
                <Button
                  key={filterType}
                  variant={filter === filterType ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(filterType)}
                >
                  {filterType === 'all' ? 'Tất cả' : 
                   filterType === 'active' ? 'Chưa xong' : 'Hoàn thành'}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách ghi chú ({filteredTodos.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredTodos.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                {filter === 'all' ? 'Chưa có ghi chú nào' :
                 filter === 'active' ? 'Không có ghi chú chưa hoàn thành' :
                 'Không có ghi chú đã hoàn thành'}
              </p>
            ) : (
              <div className="space-y-2">
                {filteredTodos.map(todo => (
                  <div key={todo.id} className="flex items-center gap-3 p-3 rounded-md border">
                    <Checkbox
                      checked={todo.done}
                      onCheckedChange={() => toggleTodo(todo.id)}
                    />
                    
                    {editingId === todo.id ? (
                      <div className="flex-1 flex gap-2">
                        <Input
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit();
                            if (e.key === 'Escape') cancelEdit();
                          }}
                          className="flex-1"
                          autoFocus
                        />
                        <Button size="sm" onClick={saveEdit}>Lưu</Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit}>Hủy</Button>
                      </div>
                    ) : (
                      <>
                        <span className={`flex-1 ${todo.done ? 'line-through text-muted-foreground' : ''}`}>
                          {todo.title}
                        </span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => startEdit(todo.id, todo.title)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default TodoDemo;
