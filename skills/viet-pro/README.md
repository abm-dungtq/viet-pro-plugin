---
type: "guide"
title: "Viết Pro 4.0 — Tòa Sạn Báo AI Tiếng Việt Đa Nền Tảng (ABM.DungTQ Edition)"
description: "Tòa soạn báo AI tiếng Việt đa nền tảng cá nhân hóa bởi ABM.DungTQ (0976202028). Mô hình subagent thật phân công 6 ban tác nghiệp, kiểm duyệt tiếng Việt deterministic, xuất bản 9 kênh."
tags:
  - viet-pro
  - ai-newsroom
  - content-generation
  - vietnamese-lint
  - abm-dungtq
  - antigravity-plugin
resource: "https://github.com/abm-dungtq/viet-pro-plugin"
timestamp: "2026-07-25T09:53:05+07:00"
version: "4.0"
---

# Viết Pro 4.0 — Tòa Sạn Báo AI Tiếng Việt Đa Nền Tảng

> **Tác giả & Cá nhân hóa:** ABM.DungTQ (Hotline/Zalo: **0976202028**)  
> **Repository:** [github.com/abm-dungtq/viet-pro-plugin](https://github.com/abm-dungtq/viet-pro-plugin)  
> **Môi trường chuẩn:** Google Antigravity IDE / AGY CLI / Claude Code

Skill viết content tiếng Việt đa nền tảng theo mô hình **tòa soạn báo bằng subagent thật**. Tổng Biên Tập (TBT — `SKILL.md`, context chính) phân tích đề bài, thiết kế quy trình **GATE**, rồi điều phối 4 ban tác nghiệp chạy bằng Subagent độc lập + 2 ban hỗ trợ.

---

## 🏛️ Sơ Đồ Kiến Trúc Tòa Sạn Báo AI

```
                        Người dùng
                            │
                            ▼
           SKILL.md — Tổng Biên Tập (ABM.DungTQ Edition)
      Phân tích → Chọn ban → Thiết kế GATE → Spawn subagents
                            │
    ┌───────────────────────┼───────────────────────┬───────────────────────┐
    ▼                       ▼                       ▼                       ▼
viet-pro-researcher     viet-pro-editor      viet-pro-publisher ×n   viet-pro-reviewer
  (Ban Thu thập)         (Ban Biên tập)        (Ban Xuất bản)         (Ban Kiểm duyệt)
 WebSearch/WebFetch   references/editorial/     SONG SONG 9 kênh      Lint + Rà tay thủ công
  ➔ 00-brief.md         ➔ 01-draft.md        ➔ published/{kênh}.md   ➔ 02-review-ticket.md
    │                       │                       │                       │
    └───────────────────────┴───────────────────────┴───────────────────────┘
                                        │
                 ┌──────────────────────┴──────────────────────┐
                 ▼                                             ▼
          references/archive/                      references/development/
           (Ban Tư liệu)                           (Ban Phát triển)
     Pattern Catalog (42 patterns)                 Cải tiến & Audit Skill
```

---

## 🏬 6 Ban Tác Nghiệp

| Ban | Trạng thái | Vận hành | Files Reference | Nhiệm vụ chính |
|-----|------------|----------|-----------------|----------------|
| **Thu thập** (`research/`) | Subagent | `viet-pro-researcher` | 3 files | 5W1H, 3-tier research, phân tích data, ICE scoring → Content Brief (`00-brief.md`) |
| **Biên tập** (`editorial/`) | Subagent | `viet-pro-editor` | 9 files | Story-core, hook-close, rhythm, metaphor, reframe, debunk, emphasis, technical → Draft (`01-draft.md`) |
| **Xuất bản** (`publishing/`) | Subagent ×n | `viet-pro-publisher` | 10 files | **9 kênh:** Facebook, LinkedIn, X/Threads, Blog SEO, Newsletter, Video Script (TikTok/YouTube), Zalo, Instagram |
| **Kiểm duyệt** (`review/`) | Subagent | `viet-pro-reviewer` | 7 files | Deterministic Linter (7 lỗi tiếng Việt) + Rà tay văn phong, anti-AI, fact-check |
| **Tư liệu** (`archive/`) | Dữ liệu | TBT / Agent đọc trực tiếp | 2+ files | Pattern Catalog (42 bài mẫu / 7 nhóm) + Sample Archive |
| **Phát triển** (`development/`) | Main Context | TBT + User Duyệt | 5 files | Style Audit, Upgrade, Research Framework, Changelog |

---

## 📺 Xuất Bản Đa Nền Tảng (9 Kênh)

1 draft sau khi PASS kiểm duyệt nội dung sẽ được `viet-pro-publisher` xuất bản **song song** ra 9 kênh:
- 🔵 **Facebook**: Post cảm xúc / bài viết dài kèm hook & emoji chuẩn.
- 💼 **LinkedIn**: Bài viết chuyên nghiệp, cấu trúc dòng thoáng, CTA rõ ràng.
- 🐦 **X / Threads**: Chuỗi Thread được đánh số logic (1/n, 2/n...).
- 🌐 **Blog SEO**: Tiêu đề H1, H2, H3 chuẩn SEO, thẻ meta & từ khóa phụ.
- ✉️ **Newsletter**: Thư gửi độc giả cá nhân hóa, tiêu đề kích thích open-rate.
- 🎬 **Video Script**: Kịch bản chuyển thể văn nói cho TikTok/Reels/Shorts & YouTube (thời lượng, hình ảnh, lời thoại).
- 💬 **Zalo**: Tin nhắn tương tác ngắn gọn, xúc tích.
- 📷 **Instagram**: Caption kèm thẻ hashtag xu hướng & ý tưởng hình ảnh/carousel.
- 🔄 **Repurpose Matrix**: Bảng ma trận chuyển đổi định dạng chuẩn hóa.

---

## 🛠️ Công Cụ & Scripts Tự Động

| Script | Đường dẫn | Chức năng |
|--------|-----------|-----------|
| **Vietnamese Content Linter** | `scripts/lint-vietnamese-content.mjs` | Tự động phát hiện 7 loại lỗi: Em-dash `—`, Oxford comma `, và`, dấu cách trước dấu câu, nhãn AI slop, Title Case tiếng Anh, từ nối lặp lại, đoạn văn đều nhau nghi AI. Chạy `--self-test` để kiểm tra. |
| **Cross-Platform Packager** | `scripts/package-viet-pro-skill.mjs` | Đóng gói bộ skill + subagents + hướng dẫn cài đặt thành file ZIP phân phối (`dist/viet-pro-4.0.zip`). Hỗ trợ macOS, Linux và Windows. |

---

## ⚙️ Cài Đặt & Sử Dụng

Xem tài liệu chi tiết tại [INSTALL.md](file:///Users/tqd/.gemini/config/plugins/viet-pro-plugin/INSTALL.md).

### Dành cho Agentic Setup:
```bash
mkdir -p ~/.gemini/config/plugins
git clone https://github.com/abm-dungtq/viet-pro-plugin.git ~/.gemini/config/plugins/viet-pro-plugin
node ~/.gemini/config/plugins/viet-pro-plugin/skills/viet-pro/scripts/lint-vietnamese-content.mjs --self-test
```

---

## 👤 Thông Tin Tác Giả & Hỗ Trợ

* **Tác giả:** ABM.DungTQ
* **Hotline / Zalo:** 0976202028
* **GitHub:** [https://github.com/abm-dungtq/viet-pro-plugin](https://github.com/abm-dungtq/viet-pro-plugin)
* **Phiên bản:** 4.0 (Tòa soạn báo AI Subagent)
