# Quartz カスタマイズ & 移行ガイド

## 1. プロジェクトの移行 (GitHubから切り離す)
このプロジェクトを `/Users/kino/Projects/site_maker` にコピーし、GitHubの管理下から外して「実験用」にするには、以下の手順をターミナルで実行してください。

```bash
# 1. フォルダをコピー (node_modulesも含めるためcp -rを使います)
cp -r /Users/kino/Documents/my-quartz-site /Users/kino/Projects/site_maker

# 2. 新しいフォルダに移動
cd /Users/kino/Projects/site_maker

# 3. Gitの履歴（.gitフォルダ）を削除してGitHubとの連携を解除
rm -rf .git

# 4. VS Codeで新しいフォルダを開く
code .
```

以後は、この新しい `site_maker` フォルダで作業すれば、GitHubに影響を与えることはありません。

---

## 2. デザインの編集 (CSS & HTML)

Quartzのデザインはいくつかの場所に分かれています。

### CSS (スタイルシート)
見た目や色、フォントなどを変更したい場合。

- **場所**: `quartz/styles/custom.scss`
- **使い方**: ここに標準的なSCSS/CSSを書きます。`base.scss` などのデフォルトスタイルを上書きできます。
- **設定**: 色のテーマ（Light/Dark mode）やフォント設定は `quartz.config.ts` で一括管理されています。

### HTML (構造・コンポーネント)
ヘッダー、フッター、記事のタイトル周りなど、ページの構造を変えたい場合。
Quartzは生のHTMLではなく、**TSX (Reactコンポーネント)** を使用しています。

- **場所**: `quartz/components/`
    - 例: `PageTitle.tsx` (サイトタイトル), `Footer.tsx` (フッター), `ArticleTitle.tsx` (記事タイトル)
- **使い方**: これらのファイルを直接編集して、HTML構造や表示ロジックを変更します。
    - ※ `.tsx` ファイルですが、基本的には `<div class="...">...</div>` のようにHTMLライクに書けます。

### レイアウト設定 (配置)
どのページにどのコンポーネント（サイドバー、目次など）を表示するかを決める設定。

- **場所**: `quartz.layout.ts`
- **使い方**: `Component.PageTitle()`, `Component.MobileOnly()` などをリストに追加・削除して配置を変えます。

---

## 3. プレビュー方法

新しいフォルダでも、以下のコマンドでプレビューできます。

```bash
npx quartz build --serve
```
または、VS Codeの「NPM SCRIPTS」から `serve` を実行してください。
