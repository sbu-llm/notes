---
title: "02 - Attention Mechanism"
lang: en
slug: attention
order: 2
---

## Self-Attention

This lecture has no Persian version yet. If FA mode is selected, it still shows up in the sidebar with an "EN" tag, falling back to this English page.

```python
attn = softmax(Q @ K.T / sqrt(d_k)) @ V
```
