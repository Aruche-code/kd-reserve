// Control: セレクトボックス全体のコンテナです。通常、ボーダーや背景色などをカスタマイズします。

// ValueContainer: 選択された値または入力されたテキストを表示するコンテナです。

// IndicatorsContainer: セレクタのインジケータ（例えば、ドロップダウンの矢印）を含むコンテナです。

// IndicatorSeparator: インジケータと選択された値を区切るセパレータです。

// DropdownIndicator: ドロップダウンメニューを開くための矢印インジケータです。

// Menu: ドロップダウンメニュー全体のコンテナです。

// MenuList: 実際のオプションが含まれるメニューのリスト部分です。

// Option: 個々のドロップダウンメニューオプションです。

// SingleValue: 選択された単一の値を表示するコンポーネントです。

// Placeholder: プレースホルダーテキストを表示するコンポーネントです。

// Input: ユーザーの入力を受け付けるテキスト入力フィールドです。

// ClearIndicator: 選択をクリアするためのインジケータ（通常は×マーク）です。

// MultiValue: 複数選択モードで選択された各値を表示するコンポーネントです。

// MultiValueLabel: 複数選択された値のラベル部分です。

// MultiValueRemove: 複数選択された値を削除するためのボタンやアイコンです。

export const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "white",
    borderColor: "transparent", // ボーダーを透明に
    minHeight: "20px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    "&:hover": {
      boxShadow: "0 0 10px rgba(0, 0, 255, 0.2)",
    },
    width: "auto",
    margin: "4px",
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: "1px 4px",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#9a9a9a",
    fontSize: "12px",
    fontWeight: "normal",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#333",
    fontSize: "14px",
    fontWeight: "500",
  }),
  // 他のスタイル定義...
};
