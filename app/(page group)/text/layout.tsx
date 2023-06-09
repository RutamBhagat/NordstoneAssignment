import CreatePost from "./components/CreatePost";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto pt-[60px]">
          <div className="flex flex-col flex-auto flex-shrink-0 bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">{children}</div>
              </div>
            </div>
            <CreatePost />
          </div>
        </div>
      </div>
    </div>
  );
}
