import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quora Clone",
  description: "A platform for users to ask their queries to get answers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
