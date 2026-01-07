#!/usr/bin/env python3
"""
FAQセクションとJSON-LDを比較するスクリプト
"""
import re
import json
from html.parser import HTMLParser

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
# すべてのJSON-LDスクリプトを見つける
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

if jsonld_data:
    jsonld_faqs = []
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

for i in range(max(len(html_faqs), len(jsonld_faqs))):
    print(f"\n[FAQ #{i+1}]")
    print("-"*80)

    if i < len(html_faqs):
        html_q = html_faqs[i]['question']
        html_a = html_faqs[i]['answer']
        print(f"HTML Q: {html_q}")
        print(f"HTML A: {html_a[:100]}..." if len(html_a) > 100 else f"HTML A: {html_a}")
    else:
        print("HTML: (missing)")

    print()

    if i < len(jsonld_faqs):
        jsonld_q = jsonld_faqs[i]['question']
        jsonld_a = jsonld_faqs[i]['answer']
        print(f"JSON Q: {jsonld_q}")
        print(f"JSON A: {jsonld_a[:100]}..." if len(jsonld_a) > 100 else f"JSON A: {jsonld_a}")
    else:
        print("JSON-LD: (missing)")

    # 差異をチェック
    if i < len(html_faqs) and i < len(jsonld_faqs):
        # 質問を比較（Q1., Q2. などの部分を除く）
        html_q_clean = re.sub(r'^Q\d+\.\s*', '', html_faqs[i]['question'])
        if html_q_clean != jsonld_faqs[i]['question']:
            print("\n⚠️  質問が異なります！")

        if html_faqs[i]['answer'] != jsonld_faqs[i]['answer']:
            print("\n⚠️  回答が異なります！")
            print(f"\n差分の詳細:")
            print(f"HTML length: {len(html_faqs[i]['answer'])}")
            print(f"JSON length: {len(jsonld_faqs[i]['answer'])}")
