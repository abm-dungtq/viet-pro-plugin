---
type: "guide"
title: "Hướng Dẫn Cài Đặt & Setup Viet-Pro Plugin (Agent & Human Protocol)"
description: "Quy trình cài đặt tự động dành cho AI Agent và lập trình viên thiết lập bộ skill viet-pro chuẩn Antigravity cá nhân hóa bởi ABM.DungTQ (0976202028)."
tags:
  - install-guide
  - agent-setup
  - viet-pro
  - antigravity-plugin
  - abm-dungtq
resource: "https://github.com/abm-dungtq/viet-pro-plugin"
timestamp: "2026-07-25T09:53:05+07:00"
version: "4.0"
---

# 🚀 Hướng Dẫn Cài Đặt Viet-Pro 4.0 (ABM.DungTQ Edition)

> [!NOTE]
> Bộ skill này được phát triển & đóng gói cá nhân hóa bởi **ABM.DungTQ (Hotline/Zalo: 0976202028)**.
> Hỗ trợ 2 môi trường chính: **Google Antigravity IDE / AGY CLI** và **Claude Code CLI / Desktop**.

---

## 🤖 Dành Cho AI Agent (Agentic Auto-Setup Protocol)

Khi một AI Agent nhận được yêu cầu cài đặt hoặc kích hoạt bộ skill `viet-pro`, Agent **PHẢI** thực hiện theo các bước dưới đây. **BẮT BUỘC SỬ DỤNG DỮ LIỆU THẬT (REAL DIRECTORY), TUYỆT ĐỐI KHÔNG SỬ DỤNG SYMLINK (ln -s / mklink) HAY BASH FUNCTION VÌ SẼ GÂY LỖI.**

### Bước 1: Lấy Plugin Về Thư Mục Config Tùy Theo Hệ Điều Hành

**1. Dành cho macOS / Linux (Terminal):**
```bash
# CÀI ĐẶT MỚI (Chạy lần đầu)
git clone https://github.com/abm-dungtq/viet-pro-plugin.git ~/.gemini/config/plugins/viet-pro-plugin

# CẬP NHẬT (Nếu đã cài rồi, tránh làm mất file .env)
git -C ~/.gemini/config/plugins/viet-pro-plugin pull
```

**2. Dành cho Windows (PowerShell/CMD):**
```powershell
# CÀI ĐẶT MỚI (Chạy lần đầu)
git clone https://github.com/abm-dungtq/viet-pro-plugin.git "$env:USERPROFILE\.gemini\config\plugins\viet-pro-plugin"

# CẬP NHẬT (Nếu đã cài rồi, tránh làm mất file .env)
git -C "$env:USERPROFILE\.gemini\config\plugins\viet-pro-plugin" pull
```
> [!TIP]
> Nếu bạn sử dụng Claude Code hoặc môi trường CLI khác trên macOS/Linux, hãy sao chép thư mục skills và agents thật vào vị trí tương ứng (KHÔNG dùng symlink):
> ```bash
> mkdir -p ~/.claude/skills ~/.claude/agents
> cp -r ~/.gemini/config/plugins/viet-pro-plugin/skills/viet-pro ~/.claude/skills/
> cp ~/.gemini/config/plugins/viet-pro-plugin/agents/*.md ~/.claude/agents/
> ```

### Bước 2: Kiểm Tra & Chạy Self-Test Linter

AI Agent chạy lệnh kiểm thử tự động để đảm bảo môi trường Node.js và script linting hoạt động hoàn hảo:

```bash
# Lệnh Node.js này chạy được trên mọi OS (Mac/Windows/Linux)
node ~/.gemini/config/plugins/viet-pro-plugin/skills/viet-pro/scripts/lint-vietnamese-content.mjs --self-test
```
*(Trên Windows, Agent dùng đường dẫn `%USERPROFILE%\.gemini\...` hoặc `$env:USERPROFILE\.gemini\...` tương ứng)*

**Kỳ vọng kết quả:** `SELF-TEST PASS — bắt đủ 7 loại vi phạm, 0 false positive ERROR trên văn sạch`

### Bước 3: Đóng Gói / Phân Phối (Nếu Cần)

Nếu Agent cần đóng gói skill ra file ZIP để chia sẻ:

```bash
node ~/.gemini/config/plugins/viet-pro-plugin/skills/viet-pro/scripts/package-viet-pro-skill.mjs
```

---

## 👤 Dành Cho Người Dùng (Manual Installation)

**LƯU Ý QUAN TRỌNG:** Phải cài đặt dữ liệu thật trực tiếp vào thư mục hệ thống. **Tuyệt đối KHÔNG sử dụng lệnh Symlink (như `ln -s` trên Mac hoặc `mklink` trên Windows)** vì Antigravity/Claude Code sẽ không load được cấu hình.

### Phương án 1: Cài đặt Toàn cục (Global - Khuyên dùng)

**Dành cho macOS / Linux (Terminal):**
```bash
# CÀI ĐẶT MỚI (Chạy lần đầu)
git clone https://github.com/abm-dungtq/viet-pro-plugin.git ~/.gemini/config/plugins/viet-pro-plugin

# CẬP NHẬT (Nếu đã cài rồi, tránh làm mất file .env)
git -C ~/.gemini/config/plugins/viet-pro-plugin pull
```

**Dành cho Windows (PowerShell/CMD):**
```powershell
# CÀI ĐẶT MỚI (Chạy lần đầu)
git clone https://github.com/abm-dungtq/viet-pro-plugin.git "$env:USERPROFILE\.gemini\config\plugins\viet-pro-plugin"

# CẬP NHẬT (Nếu đã cài rồi, tránh làm mất file .env)
git -C "$env:USERPROFILE\.gemini\config\plugins\viet-pro-plugin" pull
```
Khởi động lại Antigravity IDE / CLI để nạp tự động plugin `viet-pro-plugin`.

### Phương án 2: Cài đặt Theo Workspace/Project

1. **Clone folder plugin vào project của bạn (không dùng symlink):**
   ```bash
   git clone https://github.com/abm-dungtq/viet-pro-plugin.git ./plugins/viet-pro-plugin
   ```

---

## 🛠️ Kiểm Tra Kích Hoạt (Activation Verification)

Gõ hoặc gửi đề bài sáng tạo nội dung cho Agent:
- *"Viết bài post LinkedIn chia sẻ về AI Agent"*
- *"Lập kế hoạch nội dung và kịch bản video TikTok từ tài liệu này"*

Agent sẽ tự động kích hoạt skill `viet-pro` (Tổng Biên Tập ABM.DungTQ Edition), xuất quy trình **GATE** và điều phối 4 ban subagent tác nghiệp!

---

**Tác giả:** **ABM.DungTQ**  
**Hotline / Zalo:** **0976202028**  
**Repository:** [github.com/abm-dungtq/viet-pro-plugin](https://github.com/abm-dungtq/viet-pro-plugin)
