"use client";
import axios from "axios";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGoogle, BsGithub } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// type Variant = "LOGIN" | "REGISTER";

// const AuthForm = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [variant, setVariant] = useState<Variant>("LOGIN");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (status === "authenticated") {
//       if (session?.user?.role === "student") {
//         router.push("/student");
//         console.log("Authenticated as student");
//       } else if (session?.user?.role === "staff") {
//         router.push("/staff");
//         console.log("Authenticated as staff");
//       }
//     }
//   }, [status, session?.user?.role, router]);

//   const toggleVariant = useCallback(() => {
//     if (variant === "LOGIN") {
//       setVariant("REGISTER");
//     } else {
//       setVariant("LOGIN");
//     }
//   }, [variant]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FieldValues>({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     setIsLoading(true);

//     if (variant === "REGISTER") {
//       // Axios Register
//       axios
//         .post("/api/register", data)
//         .then(() => signIn("credentials", data))
//         .catch(() => toast.error("登録に失敗、再入力してください。"))
//         .finally(() => setIsLoading(false));
//     }

//     if (variant === "LOGIN") {
//       // NextAuth SignIn
//       signIn("credentials", {
//         ...data,
//         redirect: false,
//       })
//         .then((callback) => {
//           if (callback?.error) {
//             toast.error("ログインできませんでした。");
//           }
//           if (callback?.ok && !callback?.error) {
//             toast.success("ログインしました。");
//             router.push("/staff");
//           }
//         })
//         .finally(() => setIsLoading(false));
//     }
//   };

//   const socialAction = (action: string) => {
//     setIsLoading(true);
//     // NextAuth Social Sign In
//     signIn(action, { redirect: false })
//       .then((callback) => {
//         if (callback?.error) {
//           toast.error("ログインできませんでした。");
//         }
//         if (callback?.ok && !callback?.error) {
//           toast.success("ログインしました。");
//           router.push("/student");
//         }
//       })
//       .finally(() => setIsLoading(false));
//   };

//   return (
//     <div
//       className="
//     mt-8
//     sm:mx-auto
//     sm:w-full
//     sm:max-w-md
//   "
//     >
//       <div
//         className="
//       bg-white
//       px-4
//       py-8
//       shadow
//       sm:rounded-lg
//       sm:px-10
//     "
//       >
//         <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//           {variant === "REGISTER" && (
//             <Input
//               id="name"
//               label="名前"
//               register={register}
//               errors={errors}
//               disabled={isLoading}
//             />
//           )}
//           <Input
//             id="email"
//             label="マスターアドレス"
//             type="email"
//             register={register}
//             errors={errors}
//             disabled={isLoading}
//             placeholder="職員の方はマスターアドレスを入力"
//           />
//           <Input
//             id="password"
//             label="パスコード"
//             type="password"
//             register={register}
//             errors={errors}
//             disabled={isLoading}
//             placeholder="職員の方はパスコードを入力"
//           />
//           <div>
//             <Button disabled={isLoading} fullWidth type="submit">
//               {variant === "LOGIN" ? "サインイン" : "新規登録"}
//             </Button>
//           </div>
//         </form>

//         <div className="mt-6">
//           <div className="relative">
//             <div
//               className="
//                 absolute
//                 inset-0
//                 flex
//                 items-center
//               "
//             >
//               <div className="w-full border-t border-gray-300" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="bg-white px-2 text-gray-500">
//                 学生の方はこちらから
//               </span>
//             </div>
//           </div>

//           <div className="mt-6 flex gap-2">
//             <AuthSocialButton
//               icon={BsGithub}
//               onClick={() => socialAction("github")}
//             />
//             <AuthSocialButton
//               icon={BsGoogle}
//               onClick={() => socialAction("google")}
//             />
//           </div>
//         </div>
//         <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
//           <div>
//             {variant === "LOGIN"
//               ? "KD-reserveを初めて利用する"
//               : "すでにアカウントをお持ちですか？"}
//           </div>
//           <div onClick={toggleVariant} className="underline cursor-pointer">
//             {variant === "LOGIN" ? "アカウントを新規作成" : "ログイン"}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [variant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === "student") {
        router.push("/student");
        console.log("Authenticated as student");
      } else if (session?.user?.role === "staff") {
        router.push("/staff");
        console.log("Authenticated as staff");
      }
    }
  }, [status, session?.user?.role, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "LOGIN") {
      // NextAuth SignIn
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("ログインできませんでした。");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("ログインしました。");
            router.push("/staff");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    // NextAuth Social Sign In
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("ログインできませんでした。");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("ログインしました。");
          router.push("/student");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="
    mt-8
    sm:mx-auto
    sm:w-full
    sm:max-w-md
  "
    >
      <div
        className="
      bg-white
      px-4
      py-8
      shadow
      sm:rounded-lg
      sm:px-10
    "
      >
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute
                inset-0
                flex
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                学生の方はこちらから
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6">
            <div className="relative">
              <div
                className="
                absolute
                inset-0
                flex
                items-center
              "
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  職員の方はこちらから
                </span>
              </div>
            </div>
          </div>

          <Input
            id="email"
            label="専用アドレス"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
            placeholder="職員の方は専用アドレスを入力"
          />
          <Input
            id="password"
            label="パスコード"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
            placeholder="職員の方はパスコードを入力"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              サインイン
            </Button>
          </div>
        </form>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>KD-reserveを利用する</div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

// type Variant = "LOGIN" | "REGISTER";
// type RoleVariant = "STUDENT" | "STAFF";

// const AuthForm = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [variant, setVariant] = useState<Variant>("LOGIN");
//   const [roleVariant, setRoleVariant] = useState<RoleVariant>("STUDENT");

//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (status === "authenticated") {
//       if (session?.user?.role === "student") {
//         router.push("/student");
//         console.log("Authenticated as student");
//       } else if (session?.user?.role === "staff") {
//         router.push("/staff");
//         console.log("Authenticated as staff");
//       }
//     }
//   }, [status, session?.user?.role, router]);

//   const toggleVariant = useCallback(() => {
//     if (roleVariant === "STUDENT") {
//       setRoleVariant("STAFF");
//     } else {
//       setRoleVariant("STUDENT");
//     }
//   }, [roleVariant]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FieldValues>({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     setIsLoading(true);

//     if (roleVariant === "STAFF") {
//       // NextAuth SignIn
//       signIn("credentials", {
//         ...data,
//         redirect: false,
//       })
//         .then((callback) => {
//           if (callback?.error) {
//             toast.error("ログインできませんでした。");
//           }
//           if (callback?.ok && !callback?.error) {
//             toast.success("ログインしました。");
//             router.push("/staff");
//           }
//         })
//         .finally(() => setIsLoading(false));
//     }
//   };

//   const socialAction = (action: string) => {
//     setIsLoading(true);
//     // NextAuth Social Sign In
//     signIn(action, { redirect: false })
//       .then((callback) => {
//         if (callback?.error) {
//           toast.error("ログインできませんでした。");
//         }
//         if (callback?.ok && !callback?.error) {
//           toast.success("ログインしました。");
//           router.push("/student");
//         }
//       })
//       .finally(() => setIsLoading(false));
//   };

//   return (
//     <div
//       className="
//     mt-8
//     sm:mx-auto
//     sm:w-full
//     sm:max-w-md
//   "
//     >
//       <div
//         className="
//       bg-white
//       px-4
//       py-8
//       shadow
//       sm:rounded-lg
//       sm:px-10
//     "
//       >
//         <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//           {roleVariant === "STAFF" && (
//             <div>
//               <div>
//                 <Input
//                   id="email"
//                   label="専用アドレス"
//                   type="email"
//                   register={register}
//                   errors={errors}
//                   disabled={isLoading}
//                   placeholder="職員の方は専用アドレスを入力"
//                 />
//                 <Input
//                   id="password"
//                   label="パスコード"
//                   type="password"
//                   register={register}
//                   errors={errors}
//                   disabled={isLoading}
//                   placeholder="職員の方はパスコードを入力"
//                 />
//               </div>

//               <div className=" pt-6">
//                 <Button disabled={isLoading} fullWidth type="submit">
//                   サインイン
//                 </Button>
//               </div>
//             </div>
//           )}
//         </form>

//         {roleVariant === "STUDENT" && (
//           <div className="mt-6">
//             <div className="relative">
//               <div
//                 className="
//                 absolute
//                 inset-0
//                 flex
//                 items-center
//               "
//               >
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="bg-white px-2 text-gray-500">
//                   学生の方はこちらから
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6 flex gap-2">
//               <AuthSocialButton
//                 icon={BsGoogle}
//                 onClick={() => socialAction("google")}
//               />
//             </div>
//           </div>
//         )}
//         <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
//           <div>KD-reserveを利用する</div>
//           <div onClick={toggleVariant} className="underline cursor-pointer">
//             {roleVariant === "STUDENT"
//               ? "職員はこちらから"
//               : "学生はこちらから"}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;
