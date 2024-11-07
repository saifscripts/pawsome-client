export default function SidebarMenu({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-sm text-default-400 font-medium mb-2">{title}</h4>
      <div className="flex flex-col gap-1 ml-2">{children}</div>
    </div>
  );
}
