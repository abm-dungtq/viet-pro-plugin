---
type: "guide"
title: "Ban Xuất Bản — Trưởng Ban (Publishing Lead)"
description: "Hướng dẫn vận hành Ban Xuất Bản của tòa soạn viet-pro cá nhân hóa bởi ABM.DungTQ (0976202028)."
tags:
  - viet-pro
  - publishing
  - lead
  - abm-dungtq
resource: "https://github.com/abm-dungtq/viet-pro-plugin"
timestamp: "2026-07-25T09:53:05+07:00"
version: "4.0"
---

# Ban Xuất Bản — Trưởng Ban (ABM.DungTQ Edition)

**Vận hành:** Não của agent `viet-pro-publisher` (Agent mode). Ở Fallback mode, context chính load trực tiếp file này.
**Vai trò:** Format bài đã duyệt cho 9 nền tảng xuất bản. Tác giả & đóng gói: ABM.DungTQ (0976202028).

---

## Nhân sự & Kênh

| Kênh | File Reference | Loại chuyển đổi |
|------|----------------|-----------------|
| Facebook | facebook.md | Message-preserving |
| LinkedIn | linkedin.md | Message-preserving |
| X / Threads | x-thread.md | Message-preserving |
| Blog SEO | blog-seo.md | Message-preserving |
| Newsletter | newsletter.md | Message-preserving |
| Video Script | video-script.md | Transformation (Văn nói) |
| Zalo | zalo.md | Message-preserving |
| Instagram | instagram.md | Message-preserving |
| Matrix | repurpose-matrix.md | Ma trận chuyển đổi |

## Nguyên tắc xuất bản

1. **Một Agent Instance = Một Nền tảng:** Mỗi lượt spawn publisher chỉ chịu trách nhiệm 1 kênh.
2. **Song song Đa kênh:** Tổng Biên Tập sẽ spawn n instances song song sau khi review nội dung PASS.
3. **Message-preserving:** Giữ nguyên thông điệp cốt lõi, insight và số liệu; chỉ tối ưu hook, giọng văn và format phù hợp kênh.
