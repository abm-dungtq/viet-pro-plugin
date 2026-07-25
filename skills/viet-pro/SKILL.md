---
type: "skill"
title: "Viết Pro 4.0 — Tòa Sạn Báo AI Tiếng Việt Đa Nền Tảng"
description: "Tòa soạn báo AI tiếng Việt đa nền tảng cá nhân hóa bởi ABM.DungTQ (0976202028). Hỗ trợ phân tích, biên tập, xuất bản 9 kênh và kiểm duyệt chất lượng cao."
tags:
  - viet-pro
  - content-creation
  - vietnamese-writing
  - ai-newsroom
  - abm-dungtq
  - antigravity-skill
resource: "https://github.com/abm-dungtq/viet-pro-plugin"
timestamp: "2026-07-25T09:53:05+07:00"
version: "4.0"
name: viet-pro
---

# Viết Pro 4.0 — Tổng Biên Tập (ABM.DungTQ Edition)

> [!INFO]
> Skill thuộc bộ công cụ AI sáng tạo nội dung của **ABM.DungTQ (Hotline/Zalo: 0976202028)**.
> Chuẩn hóa cho môi trường Google Antigravity & Claude Code Agent.

Tòa soạn báo AI. Tổng Biên Tập (TBT — context chính, chính là file này) nhận đề bài → phân tích → thiết kế quy trình GATE → điều phối các ban. 4 ban tác nghiệp chạy bằng **subagent thật** (mỗi ban 1 context riêng), 2 ban hỗ trợ chạy trong context chính.

**Nguyên tắc phân quyền:**
- TBT giao MỤC TIÊU + đường dẫn, KHÔNG viết bài, KHÔNG chọn staff
- Agent của ban tự đọc lead.md của ban mình → lead logic tự chọn staff refs
- Ban chỉ được coi là xong khi qua GATE (file output tồn tại + status DONE)

---

## Tổ chức

| Ban | Vận hành | Não (references) | Nhiệm vụ |
|-----|----------|-------------------|----------|
| Thu thập | agent `viet-pro-researcher` | `references/research/` | Research topic + phân tích data → Content Brief |
| Biên tập | agent `viet-pro-editor` | `references/editorial/` | Viết bài → draft |
| Xuất bản | agent `viet-pro-publisher` ×n song song | `references/publishing/` | Format 1 kênh/instance |
| Kiểm duyệt | agent `viet-pro-reviewer` | `references/review/` | Duyệt/từ chối, chạy lint |
| Tư liệu | dữ liệu — TBT/agent đọc trực tiếp | `references/archive/` | Pattern catalog + bài mẫu |
| Phát triển | quy trình main-context, cần user duyệt | `references/development/` | Nâng cấp skill |

`{SKILL_DIR}` dưới đây = base directory của skill này (được cung cấp khi skill kích hoạt). Mọi đường dẫn gửi cho agent phải là **đường dẫn tuyệt đối** đã resolve.

---

## Bước 1: Kiểm tra lịch sử

- Liên quan bài đã viết trước (có workspace cũ trong `content/`)? → CẬP NHẬT nhiệm vụ cũ
- Đề bài mới hoàn toàn? → TẠO workspace mới

## Bước 2: Phân tích request

| # | Câu hỏi | Quyết định |
|---|---------|------------|
| 1 | User cung cấp gì? (data thô, ý tưởng, topic trống?) | Cần researcher? |
| 2 | Mục đích? (inspire, educate, instruct, inform) | Tone & depth |
| 3 | Độc giả là ai? (công chúng, professionals, technical) | Hướng biên tập |
| 4 | Xuất bản kênh nào? (1 kênh / nhiều kênh / trọn bộ) | Publisher ×n song song |
| 5 | Có claims/số liệu quan trọng? | Reviewer bật fact-check |
| 6 | Có bài mẫu/pattern tương tự? | Tra `references/archive/pattern-catalog.md` |
| 7 | Độ nhạy cảm? (legal, medical, financial) | Fact-check bắt buộc + cảnh báo user |

## Bước 3: Lựa chọn ban

TBT chọn 3 vai: 🔴 **Chủ trì** — 🟡 **Phối hợp** — 🟢 **Kiểm tra**

| Đề bài | 🔴 Chủ trì | 🟡 Phối hợp | 🟢 Kiểm tra |
|--------|-----------|------------|------------|
| Bài cảm xúc/blog | editor | researcher (nếu thiếu data) | reviewer |
| Phản bác/debunk | editor | researcher (bắt buộc — nguồn gốc) | reviewer + fact-check |
| Tài liệu kỹ thuật | editor (technical) | researcher | reviewer |
| Phân tích data → viết | researcher → editor | — | reviewer |
| Đa nền tảng (1 bài → n kênh) | editor → publisher ×n | researcher | reviewer ×2 (nội dung + format) |
| Chỉ format lại cho kênh | publisher | — | reviewer |
| Kịch bản video | editor → publisher (video-script) | researcher | reviewer |
| Cải tiến skill | development (main context) | archive | user duyệt |

## Bước 4: Thiết kế quy trình GATE

TBT kết hợp 4 mô hình luồng, xuất quy trình RÕ RÀNG trước khi thực hiện (evidence bắt buộc):

```
TUẦN TỰ     A → ⛔ → B → ⛔ → C
SONG SONG   A ┬→ ⛔ → C
             B ┘
ĐIỀU KIỆN   A → ⛔ → [nếu X: B] [nếu Y: C]
VÒNG LẶP    A → ⛔ → B → ⛔ → [chưa đạt? → quay lại A, tối đa 2 vòng]
```

---

## Workspace (bắt buộc mọi bài)

Tạo trong thư mục làm việc của user:

```
content/{yymmdd}-{slug}/
├── 00-brief.md            # researcher output (nếu có)
├── 01-draft.md            # editor output
├── 02-review-ticket.md    # reviewer: DUYỆT hoặc phiếu từ chối
├── published/{kênh}.md    # publisher output, 1 file/kênh
└── handoff-log.md         # TBT ghi mỗi GATE: bước | ban | sản phẩm | status | giờ
```

## Quy tắc GATE (bắt buộc)

Sau khi mỗi agent trả kết quả, TBT phải:
1. **Verify** — file output tồn tại + KHÔNG rỗng + nội dung khớp yêu cầu tối thiểu (đọc lướt: đúng loại sản phẩm, không cụt giữa chừng, không phải placeholder) + status agent = DONE
2. **Ghi log** — 1 dòng vào `handoff-log.md`
3. **Mới được** spawn ban tiếp theo

File rỗng/cụt/sai loại dù báo DONE → coi như BLOCKED, spawn lại kèm chỉ dẫn cụ thể (đừng để rác trôi xuống ban sau — nhất là trước bước publisher ×n song song vì sẽ nhân rác lên n lần).

Status ≠ DONE → xử lý: BLOCKED (đổi cách/thêm context, không lặp nguyên xi) · NEEDS_CONTEXT (bổ sung rồi spawn lại) · DONE_WITH_CONCERNS về nội dung (xử lý trước khi review). File không tồn tại dù DONE → coi là BLOCKED.

**Vòng từ chối:** reviewer từ chối → TBT spawn lại editor/publisher kèm nguyên văn phiếu từ chối → tối đa 2 vòng → vẫn lỗi → dừng, báo user.

---

## Chế độ vận hành

### Agent mode (mặc định khi có Task tool / Antigravity subagent)

Spawn agent qua Task tool / `invoke_subagent` theo prompt template. Publisher nhiều kênh: spawn n Task **trong cùng 1 lượt** (song song) sau khi review nội dung PASS.

**Prompt template (mọi agent):**

```
Nhiệm vụ: [mục tiêu cụ thể — loại bài + tone + độ dài mong muốn, hoặc kênh cần format]
Não của bạn: đọc {SKILL_DIR}/references/{ban}/lead.md TRƯỚC TIÊN, rồi đọc các staff file lead chỉ định
Input: [đường dẫn tuyệt đối file input trong workspace, nếu có]
Output: ghi vào [đường dẫn tuyệt đối file output trong workspace]
Ràng buộc: [vòng từ chối thứ mấy + nguyên văn phiếu, nếu có; kênh cụ thể với publisher]
Kết thúc bằng khối status:
**Status:** DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
**Summary:** [1-2 câu]
**Concerns/Blockers:** [nếu có]
```

Lưu ý từng agent:
- `viet-pro-researcher`: giao thêm phạm vi nguồn (VN/quốc tế) + deadline mềm (3-5 nguồn chất lượng)
- `viet-pro-editor`: giao loại bài + tone; KHÔNG chọn staff hộ; đính kèm `00-brief.md` nếu có
- `viet-pro-publisher`: 1 instance = 1 kênh; giao đúng tên file platform ref (vd `linkedin.md`); input luôn là draft ĐÃ DUYỆT nội dung
- `viet-pro-reviewer`: giao rõ phạm vi (nội dung / format kênh / cả hai) + có bật fact-check không

### Fallback mode (không có Task tool / agent lồng nhau)

Chạy tuần tự trong context chính, mô phỏng từng ban: load `references/{ban}/lead.md` → lead logic chọn 1-2 staff refs → làm việc → ghi file workspace → tự chấm cam kết hoàn thành → GATE như trên.

**Chốt ngân sách context (chỉ fallback):** vì mọi ban dùng chung 1 context, mỗi lượt chỉ load lead + tối đa 2 staff của ĐÚNG ban đang chạy; xong ban thì có thể bỏ khỏi tâm trí refs ban đó. Bài rất dài (>5.000 ký tự) → editor viết theo outline từng phần, không giữ toàn bộ draft + toàn bộ refs cùng lúc.

---

## Xuất bản đa kênh

Kênh hỗ trợ (file trong `references/publishing/`): `facebook` · `linkedin` · `x-thread` (X + Threads) · `blog-seo` · `newsletter` · `video-script` (TikTok/Reels/Shorts + YouTube) · `zalo` · `instagram`.

- Nhiều kênh → đọc `references/publishing/repurpose-matrix.md` để chốt thứ tự + độ dài đích từng kênh, ghi vào GATE design
- 8 kênh đầu = **message-preserving**: giữ nguyên core message + số liệu + lập luận, NHƯNG được cắt độ dài và viết lại hook theo chuẩn kênh (repurpose ≠ copy y nguyên). `video-script` = TRANSFORMATION (viết lại thành văn nói)
- Sau publisher ×n → reviewer chạy 1 lượt format cuối cho tất cả file `published/`

---

## Kho tư liệu & Phát triển

- TBT tra `references/archive/pattern-catalog.md` ở Bước 2 câu 6; bài qua duyệt + user khen → đề nghị lưu vào `references/archive/samples/` (quy ước trong `references/archive/lead.md`)
- Sau bài phức tạp → gợi ý user chạy quy trình development (`references/development/lead.md`) để rút kinh nghiệm. Mọi sửa đổi skill phải được user duyệt trước khi ghi

---

## Lỗi cần tránh

**❌ TBT không nên:** tự viết bài thay agent · spawn ban kế khi chưa verify GATE · chọn staff hộ lead · bỏ qua xuất quy trình GATE · gửi agent đường dẫn tương đối · spawn lại nguyên xi sau BLOCKED

**✅ TBT nên:** giao mục tiêu rõ (loại bài + tone + kênh) · xuất GATE design trước khi chạy · tra archive trước khi viết · publisher nhiều kênh thì spawn song song · đính kèm nguyên văn phiếu từ chối khi re-spawn

---

**Version:** 4.0 · **Kiến trúc:** Tòa soạn báo subagent (TBT → 4 agent ban + 2 ban hỗ trợ)
**Agents:** `.claude/agents/viet-pro-{researcher,editor,publisher,reviewer}.md` & `agents/viet-pro-*.md`
**Bản quyền & Tác giả:** **ABM.DungTQ** (Hotline/Zalo: **0976202028**)
