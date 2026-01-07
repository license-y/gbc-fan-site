#!/usr/bin/env python3
"""
FAQセクションとJSON-LDの差異を見つけるスクリプト
"""
import re
import json

# HTMLファイルを読み込む
with open('public/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# HTMLからFAQを抽出（質問と回答）
html_faqs = []
faq_pattern = r'<span>(Q\d+\..*?)</span>.*?<p>(.*?)</p>'
matches = re.findall(faq_pattern, html_content, re.DOTALL)
for question, answer in matches:
    # HTMLタグを削除
    answer_clean = re.sub(r'<[^>]+>', '', answer)
    # 空白を正規化
    answer_clean = ' '.join(answer_clean.split())
    html_faqs.append({
        'question': question.strip(),
        'answer': answer_clean.strip()
    })

# JSON-LDからFAQを抽出
jsonld_scripts = re.findall(r'<script type="application/ld\+json">\s*({.*?})\s*</script>', html_content, re.DOTALL)
jsonld_data = None
for script in jsonld_scripts:
    try:
        data = json.loads(script)
        if data.get('@type') == 'FAQPage':
            jsonld_data = data
            break
    except json.JSONDecodeError:
        continue

jsonld_faqs = []
if jsonld_data:
    for item in jsonld_data.get('mainEntity', []):
        question = item.get('name', '')
        answer = item.get('acceptedAnswer', {}).get('text', '')
        jsonld_faqs.append({
            'question': question.strip(),
            'answer': answer.strip()
        })

# 比較
print(f"HTML FAQs: {len(html_faqs)}")
print(f"JSON-LD FAQs: {len(jsonld_faqs)}")
print("\n" + "="*80)

differences = []

for i in range(max(len(html_faqs), len(jsonld_faqs))):
    html_q_clean = None
    has_diff = False

    if i < len(html_faqs) and i < len(jsonld_faqs):
        # 質問を比較（Q1., Q2. などの部分を除く）
        html_q_clean = re.sub(r'^Q\d+\.\s*', '', html_faqs[i]['question'])

        if html_q_clean != jsonld_faqs[i]['question']:
            differences.append({
                'index': i + 1,
                'type': 'question',
                'html': html_faqs[i]['question'],
                'jsonld': jsonld_faqs[i]['question']
            })
            has_diff = True

        if html_faqs[i]['answer'] != jsonld_faqs[i]['answer']:
            differences.append({
                'index': i + 1,
                'type': 'answer',
                'html': html_faqs[i]['answer'],
                'jsonld': jsonld_faqs[i]['answer']
            })
            has_diff = True

    elif i < len(html_faqs):
        differences.append({
            'index': i + 1,
            'type': 'missing_in_jsonld',
            'html': html_faqs[i]
        })
        has_diff = True

    elif i < len(jsonld_faqs):
        differences.append({
            'index': i + 1,
            'type': 'missing_in_html',
            'jsonld': jsonld_faqs[i]
        })
        has_diff = True

if not differences:
    print("\n✅ HTMLとJSON-LDのFAQは完全に一致しています！")
else:
    print(f"\n⚠️  {len(differences)}個の差異が見つかりました:\n")

    for diff in differences:
        print(f"\n[FAQ #{diff['index']}] - {diff['type']}")
        print("-" * 80)

        if diff['type'] == 'question':
            print(f"HTML質問: {diff['html']}")
            print(f"JSON質問: {diff['jsonld']}")

        elif diff['type'] == 'answer':
            print(f"\nHTML回答:")
            print(diff['html'])
            print(f"\nJSON回答:")
            print(diff['jsonld'])

        elif diff['type'] == 'missing_in_jsonld':
            print(f"HTML質問: {diff['html']['question']}")
            print(f"HTML回答: {diff['html']['answer']}")
            print("⚠️  JSON-LDに存在しません")

        elif diff['type'] == 'missing_in_html':
            print(f"JSON質問: {diff['jsonld']['question']}")
            print(f"JSON回答: {diff['jsonld']['answer']}")
            print("⚠️  HTMLに存在しません")
