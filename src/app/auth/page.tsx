import dynamic from "next/dynamic";

const Page = dynamic(() => import("@/components/VerifyEmail"), {
  ssr: false,
});

export default Page;
