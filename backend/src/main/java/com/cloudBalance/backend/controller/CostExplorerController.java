package com.cloudBalance.backend.controller;

import com.cloudBalance.backend.dto.response.CostExplorerResponse;
import com.cloudBalance.backend.service.CostExplorerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/cost")
@RequiredArgsConstructor
public class CostExplorerController {

    private final CostExplorerService service;

    @GetMapping("/explorer")
    public List<CostExplorerResponse> explorer(
            @RequestParam String groupBy,
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam Map<String, String> params) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate fromDate = LocalDate.parse(from, formatter);
        LocalDate toDate = LocalDate.parse(to, formatter);

        params.remove("groupBy");
        params.remove("from");
        params.remove("to");

        return service.getExplorerData(groupBy, fromDate, toDate, params);
    }
}
