import "../globals.css";

export const metadata = {
  title: "LanguageTalk.live",
  description: "Connect Globally. Speak Confidently.",
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
