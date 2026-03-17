const MarketingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-slate-50 w-full min-h-screen">
      <main>{children}</main>
    </div>
  );
};

export default MarketingLayout;
