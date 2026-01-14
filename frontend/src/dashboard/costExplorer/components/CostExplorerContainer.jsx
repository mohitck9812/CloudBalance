import { useEffect, useMemo, useState } from "react";
import CostExplorerHeader from "./CostExplorerHeader";
import CostExplorerBody from "./CostExplorerBody";
import FilterPanel from "./FilterPanel";
import useChartData from "../../../api/costExplorer/useChartData";

export default function CostExplorerContainer() {
  const { data, loading, error, fetchChartData } = useChartData();

  const [groupBy, setGroupBy] = useState("SERVICE");
  const [fromDate, setFromDate] = useState("2025-01-01");
  const [toDate, setToDate] = useState("2025-06-30");
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(true);

  const filtersKey = useMemo(() => {
    return JSON.stringify(filters);
  }, [filters]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("groupBy", groupBy);
    params.append("from", fromDate);
    params.append("to", toDate);

    Object.entries(filters || {}).forEach(([key, values]) => {
      values.forEach((v) => params.append(key, v));
    });

    fetchChartData(params);
  }, [groupBy, fromDate, toDate, filtersKey, fetchChartData]);

  return (
    <div>
      {/* HEADER */}
      <CostExplorerHeader
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        onToggleFilters={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
      />

      {/* BODY + FILTER */}
      <div className="flex gap-6 w-full">
        {/* BODY */}
        <div className="flex-1 w-full min-w-0">
          <CostExplorerBody
            groupBy={groupBy}
            data={data}
            loading={loading}
            error={error}
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
          />
        </div>

        {/* FILTER PANEL */}
        {showFilters && (
          <div className="w-72 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onApply={setFilters}
              onReset={() => setFilters({})}
              onClose={() => setShowFilters(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
