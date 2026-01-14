import CostExplorerContainer from "./components/CostExplorerContainer";

export default function CostExplorer() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50 flex flex-col overflow-y-scroll">
      <main className="p-6 pb-20 gap-6 w-full flex ">
        <div className="flex-1 max-w-[calc(100vw-330px)]">
          <CostExplorerContainer />
        </div>
      </main>
    </div>
  );
}
