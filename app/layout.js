export const metadata = {
  title: 'Career Compass AI',
  description: '3 分钟找到你的天命职业',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}