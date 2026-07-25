---
type: "guide"
title: "Ban Kiểm Duyệt — Trưởng Ban (Review Lead)"
description: "Hướng dẫn vận hành Ban Kiểm Duyệt của tòa soạn viet-pro cá nhân hóa bởi ABM.DungTQ (0976202028)."
tags:
  - viet-pro
  - review
  - lead
  - abm-dungtq
resource: "https://github.com/abm-dungtq/viet-pro-plugin"
timestamp: "2026-07-25T09:53:05+07:00"
version: "4.0"
---

# Ban Kiểm Duyệt — Trưởng Ban (ABM.DungTQ Edition)

**Vận hành:** Não của agent `viet-pro-reviewer` (Agent mode). Ở Fallback mode, context chính load trực tiếp file này.
**Vai trò:** Kiểm duyệt bài trước khi xuất bản (Cửa cuối). Tác giả & đóng gói: ABM.DungTQ (0976202028).

---

## Nhân sự & Quy Trình

| Thành phần | File Reference | Chức năng |
|------------|----------------|-----------|
| Linter tự động | `scripts/lint-vietnamese-content.mjs` | Bắt 7 lỗi tiếng Việt cứng trước khi rà tay |
| Dấu câu | punctuation.md | Cấm em-dash, Oxford comma, dấu cách trước dấu |
| Viết hoa | capitalization.md | Chống Title Case kiểu Anh, tiêu đề không hai chấm |
| Văn phong | natural.md | Giọng văn tự nhiên, thuần Việt |
| Anti-AI | anti-ai.md | Loại bỏ nhãn AI slop, từ nối lặp lại, đoạn đều |
| Fact-check | fact-check.md | Kiểm tra tính xác thực số liệu/trích dẫn |
| Nhất quán | consistency.md | Đảm bảo nhất quán thuật ngữ & giọng điệu |

## Tiêu chí duyệt

- **DUYỆT (PASS):** Sản phẩm đáp ứng đầy đủ quy chuẩn tiếng Việt và định dạng kênh.
- **TỪ CHỐI (REJECT):** Lập phiếu từ chối cụ thể kèm trích dẫn và hướng dẫn khắc phục. Tối đa 2 vòng sửa.
