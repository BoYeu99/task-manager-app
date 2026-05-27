# Custom Copilot Agents

## agent-backend
**Mục Đích**: Agent chuyên biệt cho phát triển Node.js và Express backend.

**Khả Năng**:
- Thiết kế và triển khai API endpoints
- Cấu hình Express middleware
- Logic xử lý lỗi và validation
- Lựa chọn HTTP status codes
- REST API best practices

**Khi Gọi**:
- Thêm hoặc sửa API endpoints
- Triển khai business logic
- Sửa server-side bugs
- Tối ưu hóa database queries
- Debug Express middleware issues

## agent-frontend
**Mục Đích**: Agent chuyên biệt cho phát triển UI/UX frontend.

**Khả Năng**:
- Cấu trúc HTML và semantic markup
- CSS styling và responsive design
- JavaScript DOM manipulation
- Fetch API và async operations
- Tối ưu hóa hiệu suất trình duyệt
- Cải thiện accessibility

**Khi Gọi**:
- Tạo UI components mới
- Sửa UI bugs hoặc visual issues
- Cải thiện user interactions
- Tối ưu hóa CSS và animations
- Triển khai filters và dynamic rendering
- Audits accessibility

## agent-fullstack
**Mục Đích**: Điều phối các tính năng full-stack spanning backend và frontend.

**Khả Năng**:
- Lập kế hoạch tính năng trên các layers
- Thiết kế API contract (request/response formats)
- Data flow orchestration
- Integration testing
- Deployment và DevOps concerns

**Khi Gọi**:
- Triển khai các tính năng lớn mới (e.g., authentication, persistence)
- Refactor trên frontend và backend
- Tối ưu hóa hiệu suất trên stack
- Thiết lập testing và CI/CD
- Lập kế hoạch thay đổi database schema

---

## Ví Dụ Sử Dụng

### Thêm endpoint API mới
Sử dụng `agent-backend` để triển khai endpoint xóa tất cả completed tasks:
- Thiết kế endpoint path và HTTP method
- Triển khai handler logic
- Thêm proper validation và error handling

### Cải thiện styling
Sử dụng `agent-frontend` để cải thiện task list styling:
- Thêm animations
- Cải thiện responsive breakpoints
- Enhance accessibility

### Migrate sang database
Sử dụng `agent-fullstack` để điều phối chuyển từ in-memory storage sang MongoDB:
- Thiết kế new API response structures
- Update backend models
- Migrate frontend API calls nếu cần
