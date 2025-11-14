import "./globals.css";

import ConfirmProvider from "@/components/common/modal/Modal";
import Header from "@/components/layout/Header";
import MSWProvider from "@/providers/MSWProvider";
import QueryProvider from "@/providers/QueryProvider";
import ReduxProvider from "@/shared/store/ReduxProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col bg-background text-gray-100">
        <QueryProvider>
          <ConfirmProvider>
            <ReduxProvider>
              <MSWProvider>
                <Header />
                <main className="mx-auto w-full max-w-layout flex-1">{children}</main>
              </MSWProvider>
            </ReduxProvider>
          </ConfirmProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
