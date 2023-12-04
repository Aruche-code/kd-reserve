import React from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyIcon from '@mui/icons-material/Key';
import Link from 'next/link';

const Signup= () => {
    return (
        <main className="flex flex-col flex-1 p-4 overflow-auto items-center">
        <div className="mt-5 flex flex-col items-center w-5/12 py-2 bg-gray-200 shadow-xl rounded-lg h-8/10">
          <h1 className="mt-10 text-2xl text-gray-600 font-banana">新規登録</h1>

          <div className="w-8/12 mt-8 relative">
            <span className="absolute top-1/2 transform -translate-y-1/2 left-2"><MailOutlineIcon /></span>
            <input className="h-hull w-full p-2 px-10 border-2 rounded-lg" placeholder="メールアドレス" />
          </div>

          <div className="w-8/12 mt-5 relative">
            <span className="absolute top-1/2 transform -translate-y-1/2 left-2"><KeyIcon /></span>
            <input className="h-hull w-full p-2 px-10 border-2 rounded-lg" placeholder="パスワード" />
          </div>

          {/* <div className="w-8/12 mt-2 relative"> */}
          {/* <span className="absolute top-1/2 transform -translate-y-1/2 left-2"><KeyIcon /></span> */}
          {/* <input className="h-hull w-full p-2 px-10 border-2 rounded-lg" placeholder="パスワード(再度入力)" /> */}
          {/* </div> */}

          {/* <div className="w-8/12 flex"> */}
          <Link href="/profile">
            <button className="flex items-center px-16 py-2 text-center text-white bg-green-400 rounded-xl hover:bg-green-700 mt-7 mb-4">
              次へ
            </button>
          </Link>
          {/* </div> */}
          <div className="grid items-center mt-4 mb-3 text-center w-8/12">
            <div className="mt-3 mb-2 flex-grow border-b border-gray-400" ></div>
            <p className="text-1xl text-black font-banana font-semibold">アカウントをお持ちの方はこちら</p>
          </div>
          <p className="mt-2 mb-10 text-1xl text-blue-400 font-banana font-semibold">
            <Link href="/login">
              ログイン
            </Link>
          </p>
        </div>
      </main>
    );
}

export default Signup