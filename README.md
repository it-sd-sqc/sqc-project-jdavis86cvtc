# Note Taker
Jasper Davis

This site will be used to take notes.

[https://note-taker-s5rh.onrender.com]

```mermaid
---
title: ER diagrams
---
erDiagram
    USER ||--o{ COST : "uses"
    USER ||--o{ CHAPTER : "creates"
    COST ||--o{ SUPPLIER : "supplies"
    COST ||--o{ AMOUNT : "contains"
    CHAPTER ||--o{ TITLE : "has"
    CHAPTER ||--o{ BODY : "contains"

Hello from NATHAN!