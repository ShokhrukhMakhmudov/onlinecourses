"use client";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-[-150px]">
        <h1 className="text-center text-2xl font-bold mb-4 text-primary">
          Onlinecourse.uz
        </h1>
        {children}
      </div>
    </div>
  );
}
