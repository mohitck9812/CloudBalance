package com.cloudBalance.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CostExplorerResponse {
        private String service;
        private String month;
        private Double cost;
}
