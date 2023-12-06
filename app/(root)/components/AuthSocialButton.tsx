import { IconType } from "react-icons";

// AuthSocialButtonコンポーネントのプロパティを定義します。
interface AuthSocialButtonProps {
  icon: IconType; // 'react-icons'からのIconTypeで、ボタンに使用されるアイコンを表します
  onClick: () => void; // ボタンクリックイベントを処理するonClick関数
}

// AuthSocialButton: ソーシャルメディアアイコンを持つ認証用ボタンのためのReact関数コンポーネント
const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon, // iconプロパティを分解し、JSXで使用するためにIconと名前を変更します
  onClick, // onClick関数を分解します
}) => {
  return (
    // 様々なスタイリングクラスを持つボタン要素
    <button
      type="button" // ボタンのタイプ
      onClick={onClick} // propsを通して渡されたonClickハンドラーを割り当てます
      className="
        inline-flex w-full 
        justify-center rounded-md
        bg-white
        px-4
        py-2 
        text-gray-500
        shadow-sm 
        ring-1 
        ring-inset
        ring-gray-300
        hover:bg-gray-50 
        focus:outline-offset-0"
    >
      <Icon /> {/* propsとして渡されたIconコンポーネントをレンダリングします */}
    </button>
  );
};

export default AuthSocialButton; // 他のアプリケーションパーツで使用するためにコンポーネントをエクスポートします
