# CQ — Quartz サイト

清原紫の Quartz サイト。

## セットアップ

```sh
npm ci
npx quartz build --serve   # ローカルプレビュー (http://localhost:8080)
```

## 公開設定

### 記事の公開

フロントマターに `publish: true` を設定した記事のみビルド対象になる。

```yaml
---
publish: true
tags:
  - public
---
```

`publish: true` がない記事はビルド時に除外される（`quartz/plugins/filters/draft.ts`）。

### 非公開タグ（Hidden Tags）

`quartz/hiddenTags.ts` で管理。ここに追加したタグは **TagList**（記事下のタグ表示）と **グラフビュー** から自動的に除外される。

```ts
// quartz/hiddenTags.ts
export const HIDDEN_TAGS: string[] = ["public"]
```

内部的に Obsidian で整理用に使うが、サイト上では非表示にしたいタグをここに追加する。

## デプロイ

`main` ブランチに push すると GitHub Actions が自動ビルド＆デプロイ。
