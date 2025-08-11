import { SEOHead } from "@/components/SEOHead";

const Code = ({ children }: { children: React.ReactNode }) => (
  <pre className="p-4 rounded-md bg-muted overflow-x-auto text-sm leading-relaxed">
    {children}
  </pre>
);

const Guides = () => {
  return (
    <main className="container mx-auto py-10 space-y-10">
      <SEOHead
        title="Guides – React UI Exercises"
        description="Snippet ngắn: State/Props, Lifting state, Controlled input, Effect + cleanup, Tổ chức component, Styling."
        canonicalPath="/guides"
      />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Guides</h1>
        <p className="text-muted-foreground">
          Hướng dẫn cô đọng (snippet ≤ 10–15 dòng), không có full code hoàn chỉnh.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">State vs Props & Lifting State</h2>
        <p>Giữ state ở cha khi nhiều con cùng cần giá trị/điều khiển. Props 1 chiều; sự kiện đi ngược lên.</p>
        <Code>{`type Item = { id: string; done: boolean };
function Parent(){
  const [items,setItems]=useState<Item[]>([]);
  const toggle=(id:string)=>setItems(xs=>xs.map(x=>x.id===id?{...x,done:!x.done}:x));
  return <List items={items} onToggle={toggle}/>;
}
function List({items,onToggle}:{items:Item[];onToggle:(id:string)=>void}){
  return (<ul>{items.map(i=>
    <li key={i.id}>
      <input type="checkbox" checked={i.done} onChange={()=>onToggle(i.id)} />
    </li>)}</ul>);
}`}</Code>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Controlled Inputs</h2>
        <p>Giá trị đến từ state; onChange cập nhật state. Tránh chuyển uncontrolled → controlled.</p>
        <Code>{`function InputBar({onAdd}:{onAdd:(t:string)=>void}){
  const [v,setV]=useState("");
  const onKey=(e:React.KeyboardEvent)=>{
    if(e.key==='Enter'&&v.trim()){onAdd(v.trim());setV("");}
  };
  return <input value={v} onChange={e=>setV(e.target.value)} onKeyDown={onKey}/>;
}`}</Code>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Effect & Cleanup (Không API)</h2>
        <p>Đồng bộ document.title, localStorage, debounce, event listener có cleanup.</p>
        <Code>{`// Debounce title theo kết quả
useEffect(()=>{
  const id=setTimeout(()=>{document.title=
    \
      \`Kết quả: \${count}\`;},300);
  return ()=>clearTimeout(id);
},[count]);

// LocalStorage
useEffect(()=>{localStorage.setItem('todos',JSON.stringify(items));},[items]);`}</Code>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Class Lifecycle (tuỳ chọn)</h2>
        <p>So sánh nhanh với useEffect.</p>
        <Code>{`class Timer extends React.Component{ id?:number;
  componentDidMount(){ this.id=window.setInterval(this.props.tick,1000); }
  componentWillUnmount(){ if(this.id) clearInterval(this.id); }
  render(){ return null; }
}
// Hooks
useEffect(()=>{const id=setInterval(tick,1000);return()=>clearInterval(id);},[]);`}</Code>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tổ chức Component</h2>
        <p>Container quản lý state/business; Presentational chỉ nhận props hiển thị.</p>
        <Code>{`// Container
function Contacts(){
  const [q,setQ]=useState("");
  const filtered=DATA.filter(x=>x.name.toLowerCase().includes(q.toLowerCase()));
  return <ContactGrid data={filtered} onSearch={setQ}/>;
}
// Presentational
function ContactGrid({data,onSearch}:{data:Contact[];onSearch:(v:string)=>void}){
  return (<>
    <input onChange={e=>onSearch(e.target.value)} />
    <div className="grid">{data.map(c=>/* Card */)}</div>
  </>);
}`}</Code>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Styling (chọn: Tailwind)</h2>
        <p>Lý do: nhanh, thống nhất bằng semantic tokens; light/dark sẵn; không rò rỉ scope.</p>
        <Code>{`// Dùng token: bg-background, text-foreground, primary
export function Button({children}:{children:React.ReactNode}){
  return <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90">{children}</button>;
}`}</Code>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Checklist chất lượng</h2>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>Đặt tên rõ ràng; tách component hợp lý; không lặp logic.</li>
          <li>State 1 chiều; không mutate trực tiếp.</li>
          <li>useEffect có dependency đúng; luôn cleanup timer/listener.</li>
          <li>Không dùng any bừa bãi (nếu TS); lint OK.</li>
          <li>Không gọi API; dữ liệu mock tĩnh hoặc setTimeout giả.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Hướng dẫn kỹ thuật chung</h2>
        <h3 className="text-lg font-medium">Cấu trúc gợi ý</h3>
        <Code>{`src/
  components/
  pages/
  styles/
  utils/
  data/ // mock .ts/.js`}</Code>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>JS in React: map/filter/reduce/sort; format số/ngày; xử lý phím.</li>
          <li>Lifecycle không API: localStorage, document.title, listener, timer + cleanup.</li>
          <li>Styling: Tailwind nhất quán toàn dự án.</li>
        </ul>
        <h3 className="text-lg font-medium">Rubric chấm điểm (100)</h3>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>Logic & đáp ứng yêu cầu: 30</li>
          <li>UI/UX & Styling: 25</li>
          <li>State/Props chuẩn 1 chiều: 20</li>
          <li>Lifecycle/Effects + cleanup: 15</li>
          <li>Code style & tổ chức: 10</li>
        </ul>
        <h3 className="text-lg font-medium">Kiểm thử thủ công (mẫu)</h3>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>Tạo/sửa/xoá mục → UI cập nhật đúng.</li>
          <li>Lọc/sort/tìm kiếm → kết quả chính xác; debounce mượt.</li>
          <li>Reload trang → dữ liệu/theme còn giữ (nếu có).</li>
          <li>Chuyển nhanh filter/search nhiều lần → không lỗi, không leak timer.</li>
          <li>Toggle theme → toàn bộ đổi style hợp lệ.</li>
          <li>Thu/phóng màn hình → layout không vỡ.</li>
        </ul>
      </section>
    </main>
  );
};

export default Guides;
