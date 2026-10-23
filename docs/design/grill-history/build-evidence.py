#!/usr/bin/env python3
"""Build and verify the bounded T3 messages export. No network or product mutation."""
import argparse
import hashlib
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parents[2]
THREAD = "53d0b426-056c-4920-a3df-13786d026007"
CUTOFF = 2584
CUTOFF_ID = "turn-item:message:425366e2-b93b-4b69-b3fc-fcd9c068ecc6"
GENERATED = ["messages.jsonl", "transcript.md", "rounds.json", "rounds.md", "document-comparison.json", "manifest.json", "SHA256SUMS"]


def digest(data):
    return hashlib.sha256(data).hexdigest()


def dump(value):
    return json.dumps(value, ensure_ascii=False, indent=2) + "\n"


def fence(text):
    size = max([len(x) for x in re.findall(r"~+", text)] + [2]) + 1
    mark = "~" * max(3, size)
    return mark + "text\n" + text + "\n" + mark + "\n"


def link(position):
    return f"[P{position}](transcript.md#p-{position})"


def assemble():
    page_files = sorted((ROOT / "source-pages").glob("messages-*.json"))
    assert len(page_files) == 7, "Expected the seven saved API pages"
    pages = [json.loads(p.read_text()) for p in page_files]
    previous = None
    all_items, locations = [], {}
    for path, page in zip(page_files, pages):
        args, response = page["arguments"], page["structuredResponse"]
        assert page["tool"] == "mcp__t3_code__t3_thread_read"
        assert args["threadId"] == THREAD and args["view"] == "messages"
        assert args.get("afterPosition") == previous
        assert response["thread"]["threadId"] == THREAD
        for index, item in enumerate(response["items"]):
            assert not item["textTruncated"] and item.get("nextTextOffset") is None
            assert item["sourceThreadId"] == THREAD
            assert item["position"] not in locations
            locations[item["position"]] = {"page": str(path.relative_to(ROOT)), "jsonPointer": f"/structuredResponse/items/{index}"}
            all_items.append(item)
        previous = response["nextPosition"]
    assert not pages[-1]["structuredResponse"]["hasMore"]
    assert [x["position"] for x in all_items] == sorted(x["position"] for x in all_items)
    assert len({x["itemId"] for x in all_items}) == len(all_items)
    items = [i for i in all_items if i["position"] <= CUTOFF]
    assert items[0]["position"] == 0
    assert items[-1]["itemId"] == CUTOFF_ID
    assert len(items) == 681
    assert Counter(i["type"] for i in items) == {"user_message": 196, "assistant_message": 485}
    by_position = {i["position"]: i for i in items}
    review = json.loads((ROOT / "review-notes.json").read_text())
    assert review["cutoffPosition"] == CUTOFF

    records = []
    previous_user_index = -1
    for index, item in enumerate(items):
        if item["type"] != "user_message":
            continue
        number = len(records) + 1
        context = [i for i in items[previous_user_index + 1:index] if i["type"] == "assistant_message"]
        notes = review["events"][str(number)]
        focuses = notes.get("proposalPositions", [context[-1]["position"]] if context else [])
        for p in focuses:
            assert p in by_position and by_position[p]["type"] == "assistant_message" and p < item["position"]
        records.append({
            "id": f"R{number:03d}", "userSequence": number,
            "userPosition": item["position"], "userItemId": item["itemId"],
            "userText": item["text"], "source": locations[item["position"]],
            "precedingAssistantPositions": [i["position"] for i in context],
            "focusAssistantPositions": focuses,
            "classification": notes["classification"], "topic": notes["topic"],
            "assessment": notes.get("assessment", ""),
            "supersededBy": notes.get("supersededBy", []),
        })
        previous_user_index = index
    assert set(review["events"]) == {str(i) for i in range(1, 197)}
    assert len(records) == 196
    for r in records:
        assert r["classification"] in review["classificationDefinitions"]
        assert all(1 <= i <= 196 for i in r["supersededBy"])
    for c in review["claims"]:
        for p in c["sourcePositions"]:
            assert p in by_position
        for u in c["userSequences"]:
            assert 1 <= u <= 196
        for quote in c.get("quotes", []):
            assert quote["text"] in by_position[quote["position"]]["text"], c["id"]

    transcript = ["# Lịch sử nguyên văn — bounded messages export\n",
                  f"Nguồn: [T3 thread](t3-thread://v1/{THREAD}). Giữ nguyên text từ API, theo position. Cutoff: P{CUTOFF}.\n",
                  "Đây là view `messages`, không phải toàn bộ tool timeline. `updatedAt` là trường API trả về, không được đổi tên thành thời điểm gửi. Nội dung nằm trong code fence để tránh biến lời nói cũ thành chỉ dẫn hiện hành.\n"]
    for item in items:
        p = item["position"]
        transcript += [f'<a id="p-{p}"></a>\n', f"## P{p} · {item['type']}\n",
                       f"Item ID: `{item['itemId']}`  \nMessage ID: `{item['messageId']}`  \nUpdated at: `{item['updatedAt']}`  \nSource: `{locations[p]['page']}#{locations[p]['jsonPointer']}`\n",
                       fence(item["text"] or "")]

    rounds = ["# Sổ đối chiếu từng lượt user\n",
              "R001–R196 là ID phục vụ audit, không phải số buổi grill nguyên thủy. Bao gồm yêu cầu research, sửa tài liệu, câu hỏi, bác bỏ và xác nhận; không gọi mọi lượt là một quyết định.\n",
              "Bản phân loại do người rà diễn giải. Bằng chứng là text/ID trong API pages và transcript. Các proposal refs có thể lùi qua commentary hoặc báo cáo xen ngang; toàn bộ interval được giữ lại.\n",
              "## Mục lục\n", "| ID | Chủ đề | Phân loại | User |\n|---|---|---|---|\n"]
    for r in records:
        rounds.append(f"| [{r['id']}](#{r['id'].lower()}) | {r['topic']} | {r['classification']} | {link(r['userPosition'])} |\n")
    for r in records:
        rounds += [f'\n<a id="{r["id"].lower()}"></a>\n', f"## {r['id']} · {r['topic']}\n",
                   f"Phân loại: **{r['classification']}**. {r['assessment']}\n",
                   "Toàn bộ assistant context trước lượt này: " + (", ".join(link(p) for p in r["precedingAssistantPositions"]) or "không có") + ".\n"]
        for p in r["focusAssistantPositions"]:
            rounds += [f"Đề xuất/ngữ cảnh cần đối chiếu: {link(p)}.\n", fence(by_position[p]["text"] or "")]
        rounds += [f"Người dùng trả lời: {link(r['userPosition'])}; `{r['userItemId']}`.\n", fence(r["userText"] or "")]
        if r["supersededBy"]:
            rounds += ["Được làm rõ/thay thế về phần liên quan ở: " + ", ".join(f"[R{n:03d}](#r{n:03d})" for n in r["supersededBy"]) + ".\n"]

    # Freeze document evidence on the first build. Future design edits must not
    # silently rewrite historical excerpts or make archive verification depend
    # on the current contents of a mutable design document.
    comparison_file = ROOT / "document-comparison.json"
    if comparison_file.exists():
        comparisons = json.loads(comparison_file.read_text())["documents"]
        assert len(comparisons) == len(review["documentChecks"])
        for spec, captured in zip(review["documentChecks"], comparisons):
            assert all(captured[k] == v for k, v in spec.items())
            assert re.fullmatch(r"[0-9a-f]{64}", captured["sha256AtAudit"])
            assert spec["mustContain"] in captured["exactExcerpt"]
    else:
        comparisons = []
        for spec in review["documentChecks"]:
            path = REPO / spec["path"]
            data = path.read_bytes()
            lines = data.decode().splitlines()
            excerpt = "\n".join(lines[spec["startLine"] - 1:spec["endLine"]])
            assert spec["mustContain"] in excerpt, spec["path"]
            comparisons.append({**spec, "sha256AtAudit": digest(data), "exactExcerpt": excerpt})
    outputs = {
        "messages.jsonl": "".join(json.dumps({**i, "exportSource": locations[i["position"]]}, ensure_ascii=False) + "\n" for i in items),
        "transcript.md": "\n".join(transcript),
        "rounds.json": dump({"schemaVersion": 1, "threadId": THREAD, "cutoffPosition": CUTOFF, "classificationDefinitions": review["classificationDefinitions"], "rounds": records, "claims": review["claims"]}),
        "rounds.md": "\n".join(rounds),
        "document-comparison.json": dump({"purpose": "Document claims/open sections compared at audit; not evidence of user approval", "documents": comparisons}),
    }
    included = sorted(set([str(p.relative_to(ROOT)) for p in page_files] + list(outputs) + ["review-notes.json", "build-evidence.py", "README.md", "decision-ledger.md"]))
    files = []
    for name in included:
        data = outputs[name].encode() if name in outputs else (ROOT / name).read_bytes()
        files.append({"path": name, "bytes": len(data), "sha256": digest(data)})
    manifest = {
        "schemaVersion": 1, "threadId": THREAD,
        "threadTitleAtExport": pages[0]["structuredResponse"]["thread"]["title"],
        "tool": "mcp__t3_code__t3_thread_read", "view": "messages",
        "sourcePagesSavedByUtc": "2026-10-23T02:31:53Z",
        "cutoffPosition": CUTOFF, "cutoffItemId": CUTOFF_ID,
        "firstPosition": items[0]["position"], "pageCount": len(pages),
        "sourcePageItemCount": len(all_items), "includedItemCount": len(items),
        "countsByType": dict(Counter(i["type"] for i in items)),
        "userEventCount": len(records),
        "classificationCounts": dict(Counter(r["classification"] for r in records)),
        "lastResponseHasMore": pages[-1]["structuredResponse"]["hasMore"],
        "lastResponseNextPosition": pages[-1]["structuredResponse"]["nextPosition"],
        "truncatedItems": 0,
        "excludedAfterCutoffPositions": [i["position"] for i in all_items if i["position"] > CUTOFF],
        "redactionsApplied": [],
        "completenessScope": "All messages-view items returned by seven consecutive API pages, from position 0 through this user's request P2584. Numeric position gaps are activity omitted by this view, not missing message pages.",
        "limitations": [
            "Paginated read is not an atomic database snapshot; export is bounded to an already-present user item.",
            "Structured API responses are preserved; transport bytes and provider-native transcripts are not captured.",
            "Messages view excludes tool requests/results, reasoning, child-thread transcripts and attachment bytes.",
            "API updatedAt is retained as updatedAt; original send timestamps not returned are not invented.",
            "No claim about deleted/edited content that the API did not return.",
            "SHA-256 verifies local byte integrity, not independent authenticity or approval semantics.",
            "Round labels, classification and claim assessments are this audit's interpretation; original text remains separate.",
        ],
        "files": files,
    }
    outputs["manifest.json"] = dump(manifest)
    hashes = {f["path"]: f["sha256"] for f in files}
    hashes["manifest.json"] = digest(outputs["manifest.json"].encode())
    outputs["SHA256SUMS"] = "".join(f"{h}  {p}\n" for p, h in sorted(hashes.items()))
    return outputs, manifest


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="read-only: verify generated artifacts and hashes")
    args = parser.parse_args()
    outputs, manifest = assemble()
    for name, value in outputs.items():
        path = ROOT / name
        if args.check:
            assert path.read_text() == value, f"Stale or changed artifact: {name}"
        else:
            path.write_text(value)
    print(json.dumps({"mode": "check" if args.check else "build", "messages": manifest["includedItemCount"], "userEvents": manifest["userEventCount"], "pages": manifest["pageCount"], "truncatedItems": manifest["truncatedItems"], "hashedFiles": len(manifest["files"]) + 1, "classificationCounts": manifest["classificationCounts"]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
