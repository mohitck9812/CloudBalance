package com.cloudBalance.backend.service;

import com.cloudBalance.backend.dto.response.CostExplorerResponse;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface CostExplorerService {
    List<CostExplorerResponse> getExplorerData(
            String groupBy,
            LocalDate from,
            LocalDate to,
            Map<String, String> filters);
}
