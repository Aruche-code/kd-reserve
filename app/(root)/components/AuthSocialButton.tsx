import { IconType } from "react-icons";

// AuthSocialButtonコンポーネントのプロパティを定義します。
interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

// AuthSocialButton: ソーシャルメディアアイコンを持つ認証用ボタンのためのReact関数コンポーネント
const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    // 様々なスタイリングクラスを持つボタン要素
    <button
      type="button"
      onClick={onClick}
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

export default AuthSocialButton;
