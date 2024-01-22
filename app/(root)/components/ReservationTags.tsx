import React from "react";

// タグのリスト
const tags = [
  "面談",
  "履歴書の作成・添付",
  "ES作成",
  "企業探し",
  "企業の面談",
  "その他",
];

/**
 * ReservationTags Component
 * @param {string | null} selectedTag - 現在選択されているタグ
 * @param {Function} setSelectedTag - 選択されたタグを設定する関数
 */

// Propsの型定義
interface ReservationTagsProps {
  selectedTag: string | null;
  setSelectedTag: (tag: string) => void;
}

const ReservationTags: React.FC<ReservationTagsProps> = ({
  selectedTag,
  setSelectedTag,
}) => {
  return (
    <div className="m-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2">
      {tags.map((tag) => (
        <div
          key={tag}
          onClick={() => setSelectedTag(tag)}
          className={`m-1 p-1 border rounded cursor-pointer shadow hover:shadow-md transition-all text-center ${
            tag === selectedTag ? "bg-blue-200" : "bg-white"
          }`}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default ReservationTags;
