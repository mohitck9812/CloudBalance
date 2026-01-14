package com.cloudBalance.backend.service.impl;

import com.cloudBalance.backend.dto.response.CostExplorerResponse;
import com.cloudBalance.backend.repository.CostExplorerRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CostExplorerServiceImpl implements com.cloudBalance.backend.service.CostExplorerService {
    private final CostExplorerRepository repository;

    @Override
    public List<CostExplorerResponse> getExplorerData(
            String groupBy,
            LocalDate from,
            LocalDate to,
            Map<String, String> filters) {

        return repository.getExplorerData(groupBy, from, to, filters);
    }
}
