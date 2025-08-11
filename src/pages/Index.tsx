import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <article className="card card-hover p-6 space-y-4">
    <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
    <div className="prose prose-neutral max-w-none dark:prose-invert">
      {children}
    </div>
  </article>
);

const Index = () => {
  return (
    <main>
      <SEOHead
        title="Bộ bài tập React UI – 3 mức độ"
        description="Bài tập React: JavaScript trong React, Component tuỳ biến, State/Props, Styling, Lifecycle với useEffect – không dùng API."
        canonicalPath="/"
      />
      <section className="bg-gradient-primary">
        <div className="container mx-auto py-14 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Bộ bài tập React UI – 3 mức độ</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Không gọi API, dữ liệu mock cục bộ. Chạm đủ 5 chủ đề: JavaScript in React, Custom Components,
            State & Props, Styling, và React Lifecycle (useEffect).
          </p>
          <div className="mt-6 inline-flex items-center gap-3">
            <Link to="/guides" className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity">Xem Guides</Link>
            <a href="#exercises" className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity">Đi tới bài tập</a>
          </div>
        </div>
      </section>

      <section id="exercises" className="container mx-auto py-10 space-y-8">
        <Section title="Mức Cơ bản – “Mini Todo/Notes”">
          <h3>Mô tả bài toán</h3>
          <p>
            Xây dựng ứng dụng ghi chú/todo nhỏ cho phép thêm, xoá, sửa và đánh dấu hoàn thành. Giao diện tối giản,
            tập trung vào thao tác nhanh và lưu dữ liệu cục bộ để không mất khi reload trang.
          </p>
          <p>
            Bố cục gồm thanh nhập nhanh, danh sách item, và thanh lọc trạng thái. Tách nhỏ UI để tái sử dụng được.
          </p>

          <h3>Yêu cầu chức năng</h3>
          <ul>
            <li><strong>Bắt buộc:</strong> Thêm/xoá/sửa; toggle hoàn thành; Component hoá: Item, List, InputBar, FilterBar.</li>
            <li>State/Props 1 chiều: state ở cha; con phát sự kiện lên cha (onAdd, onToggle, onEdit, onRemove, onFilterChange).</li>
            <li>Styling: chọn 1 kỹ thuật duy nhất và nêu lý do chọn.</li>
            <li>Lifecycle: đồng bộ localStorage; khôi phục khi mount; cleanup nếu có timer.</li>
            <li><strong>Tuỳ chọn:</strong> phím tắt Enter để thêm, Esc để huỷ sửa.</li>
          </ul>

          <h3>Wireframe</h3>
          <pre>{`[InputBar.................][Add]
[Filter: All | Active | Done]
---------------------------------
[ ] Item title inline [Edit] [x]
[x] Completed item     [Edit] [x]
`}</pre>

          <h3>Acceptance Criteria</h3>
          <ul>
            <li><input type="checkbox" disabled /> Enter để tạo mục</li>
            <li><input type="checkbox" disabled /> Sửa inline</li>
            <li><input type="checkbox" disabled /> Lọc All/Active/Done</li>
            <li><input type="checkbox" disabled /> Giữ dữ liệu sau reload</li>
            <li><input type="checkbox" disabled /> Responsive cơ bản</li>
          </ul>

          <h3>Hướng dẫn kỹ thuật</h3>
          <ul>
            <li>JavaScript in React: dùng map/filter/sort khi hiển thị và lọc; format ngày/giờ nếu có.</li>
            <li>Custom Components: Item nhận props {"{ id, title, done }"}; phát sự kiện onToggle(id).</li>
            <li>State & Props: lifting state lên ListContainer; prop drilling tối thiểu, chỉ xuống 1–2 cấp.</li>
            <li>Styling: Tailwind với token semantic (background, foreground, primary,...).</li>
            <li>Lifecycle: useEffect đọc/ghi localStorage; thêm cleanup cho timer edit debounce (nếu dùng).</li>
          </ul>

          <h3>Bonus mở rộng</h3>
          <ul>
            <li>Keyboard nav với ArrowUp/Down để chọn item, Enter để toggle.</li>
            <li>Sort Done xuống cuối; sort theo thời gian tạo.</li>
          </ul>

          <h3>Kiểm thử thủ công</h3>
          <ol>
            <li>Gõ tiêu đề và nhấn Enter để tạo.</li>
            <li>Click checkbox để toggle.</li>
            <li>Nhấn Edit, sửa tiêu đề, Enter để lưu.</li>
            <li>Chuyển Filter All/Active/Done, quan sát kết quả.</li>
            <li>Reload trang: dữ liệu còn giữ.</li>
            <li>Thu nhỏ màn hình: layout không vỡ.</li>
          </ol>

          <h3>Yêu cầu nộp bài</h3>
          <pre>{`src/
  components/ (Item, List, InputBar, FilterBar)
  pages/
  data/ (mock nếu cần)
README: cách chạy, GIF demo ngắn`}</pre>
        </Section>

        <Section title="Mức Trung cấp – “Danh bạ liên hệ (Contact Book)”">
          <h3>Mô tả bài toán</h3>
          <p>
            Xây danh bạ đơn giản từ dữ liệu mock {"{ id, name, phone, group }"}. Hỗ trợ tìm kiếm có debounce,
            lọc theo nhóm, và sắp xếp theo tên A→Z/Z→A; hiển thị dạng lưới responsive.
          </p>

          <h3>Yêu cầu chức năng</h3>
          <ul>
            <li><strong>Bắt buộc:</strong> Search debounce 300ms; filter theo group; sort A→Z/Z→A.</li>
            <li>Component hoá: ContactCard, ContactGrid, SearchBox, GroupChips, Toolbar.</li>
            <li>State ở cha: filters/search/sort; truyền props rõ kiểu (TS type gợi ý).</li>
            <li>Lifecycle: cập nhật document.title theo số kết quả; cleanup debounce.</li>
            <li><strong>Tuỳ chọn:</strong> highlight chuỗi khớp trong tên.</li>
          </ul>

          <h3>Wireframe</h3>
          <pre>{`[SearchBox...........] [Sort ⬇︎] [GroupChips]
---------------------------------------------
| Card | Card | Card | Card |
| Card | Card | Card | Card |
`}</pre>

          <h3>Acceptance Criteria</h3>
          <ul>
            <li><input type="checkbox" disabled /> Tìm kiếm mượt, không giật</li>
            <li><input type="checkbox" disabled /> Lọc/Sort hoạt động đúng</li>
            <li><input type="checkbox" disabled /> document.title cập nhật & cleanup chuẩn</li>
            <li><input type="checkbox" disabled /> Grid responsive 2–4 cột</li>
          </ul>

          <h3>Hướng dẫn kỹ thuật</h3>
          <ul>
            <li>JS in React: filter theo includes, sort với localeCompare.</li>
            <li>Components: Card nhận name/phone/group; Grid nhận mảng contacts đã xử lý.</li>
            <li>State/Props: nâng state filter/search/sort lên cha; truyền callback xuống con.</li>
            <li>Styling: Tailwind + token; card có hover lift (transform/box-shadow).</li>
            <li>Lifecycle: useEffect debounce setTimeout; cleanup trong return.</li>
          </ul>

          <h3>Bonus mở rộng</h3>
          <ul>
            <li>Sort đa tiêu chí (group trước, name sau).</li>
            <li>Keyboard nav trong Grid (Arrow keys + Enter).</li>
          </ul>

          <h3>Kiểm thử thủ công</h3>
          <ol>
            <li>Nhập chuỗi tìm kiếm, quan sát debounce.</li>
            <li>Đổi sort A→Z/Z→A, kết quả cập nhật đúng.</li>
            <li>Chọn group chip, chỉ còn nhóm tương ứng.</li>
            <li>Xoá nội dung search: danh sách trở về trạng thái ban đầu.</li>
            <li>Quan sát document.title hiển thị số kết quả.</li>
            <li>Resize màn hình: grid đổi số cột 2–4.</li>
          </ol>

          <h3>Yêu cầu nộp bài</h3>
          <pre>{`src/
  components/ (ContactCard, ContactGrid, SearchBox, GroupChips, Toolbar)
  data/ contacts.mock.ts
README + GIF demo`}</pre>
        </Section>

        <Section title="Mức Nâng cao – “Dashboard Widgets – KHÔNG API”">
          <h3>Mô tả bài toán</h3>
          <p>
            Tạo dashboard gồm các widget độc lập trên dữ liệu mock. Giả bất đồng bộ bằng setTimeout. Có counter tự tăng,
            list có lọc/sort, và theme toggle light/dark đồng bộ localStorage.
          </p>

          <h3>Yêu cầu chức năng</h3>
          <ul>
            <li><strong>Bắt buộc:</strong> Widget: Counter (timer tự tăng start/stop), ListPanel (lọc/sort), ThemeSwitch.</li>
            <li>Component hoá: DashboardLayout, Toolbar, MetricCard, ListPanel, ThemeSwitch.</li>
            <li>State/Props: theme ở cha, truyền xuống con; mỗi widget quản lý state riêng; lifting khi cần.</li>
            <li>Lifecycle: sync theme vào localStorage; timer cleanup khi unmount hoặc khi toggle.</li>
            <li><strong>Tuỳ chọn:</strong> nhớ trạng thái mở/đóng panel vào localStorage.</li>
          </ul>

          <h3>Wireframe</h3>
          <pre>{`[Toolbar: ThemeSwitch | Refresh Mock]
------------------------------------
| MetricCard | MetricCard | Counter |
|        ListPanel (filter/sort)    |
`}</pre>

          <h3>Acceptance Criteria</h3>
          <ul>
            <li><input type="checkbox" disabled /> Theme toggle lưu & khôi phục</li>
            <li><input type="checkbox" disabled /> Counter dừng khi rời trang/tắt</li>
            <li><input type="checkbox" disabled /> Không memory leak</li>
            <li><input type="checkbox" disabled /> Không cảnh báo dependency useEffect</li>
          </ul>

          <h3>Hướng dẫn kỹ thuật</h3>
          <ul>
            <li>JS in React: map/sort cho list; format số cho metrics.</li>
            <li>Components: tách nhỏ theo chức năng; prop rõ ràng.</li>
            <li>State/Props: theme context (tuỳ chọn) hoặc prop xuống con; tránh prop drilling sâu.</li>
            <li>Styling: Tailwind tokens đồng bộ light/dark.</li>
            <li>Lifecycle: timer với setInterval; cleanup trên unmount và khi pause.</li>
          </ul>

          <h3>Bonus mở rộng</h3>
          <ul>
            <li>Persist layout (thứ tự widget) bằng localStorage.</li>
            <li>Animations nhẹ khi card xuất hiện.</li>
          </ul>

          <h3>Kiểm thử thủ công</h3>
          <ol>
            <li>Toggle theme, reload: theme giữ nguyên.</li>
            <li>Bật Counter, chuyển trang khác: dừng đúng, không leak.</li>
            <li>Lọc/sort list hiển thị đúng.</li>
            <li>Thay đổi nhanh filter nhiều lần: không lỗi, không cảnh báo.</li>
            <li>Resize: layout adapt tốt.</li>
          </ol>

          <h3>Yêu cầu nộp bài</h3>
          <pre>{`src/
  components/ (DashboardLayout, MetricCard, ListPanel, ThemeSwitch)
  data/ widgets.mock.ts
README + GIF demo`}</pre>
        </Section>

        <div className="text-center">
          <Link to="/guides" className="underline hover:opacity-80">Mở trang Guides để xem snippet & checklist →</Link>
        </div>
      </section>
    </main>
  );
};

export default Index;
