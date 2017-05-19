app.service('GanttData', function GanttData() {
  return {
    getGanttData: function($scope) {
      return [
            {name: 'Timeline', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from: $scope.r.planned_start, to: $scope.r.planned_finish},
                {name: 'Actual', classes: "actual", from:$scope.r.actual_start, to: $scope.r.actual_finish}
                ]
            },
            {name: 'Bathrooms', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from: $scope.r.bath.planned_start, to: $scope.r.bath.planned_finish},
                {name: 'Actual', classes: "actual", from: $scope.r.bath.actual_start, to: $scope.r.bath.actual_finish}
              ]
            },
            {name: 'Demo-Trashout', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from: $scope.r.demo.planned_start, to: $scope.r.demo.planned_finish},
                {name: 'Actual', classes: "actual", from:$scope.r.demo.actual_start, to: $scope.r.demo.actual_finish}
                ]
            },
            {name: 'Plumbing', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from:$scope.r.plumbing.planned_start, to: $scope.r.plumbing.planned_finish},
                {name: 'Actual', classes: "actual", from:$scope.r.plumbing.actual_start, to: $scope.r.plumbing.actual_finish}
                ]
            },
            {name: 'Electrical', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from:$scope.r.electrical.planned_start, to: $scope.r.electrical.planned_finish},
                {name: 'Actual', classes: "actual", from:$scope.r.electrical.actual_start, to: $scope.r.electrical.actual_finish}
                ]
            },
            {name: 'Framing', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from:$scope.r.framing.planned_start, to: $scope.r.framing.planned_finish},
                {name: 'Actual', classes: "actual", from:$scope.r.framing.actual_start, to: $scope.r.framing.actual_finish}
                ]
            },
            {name: 'Drywall', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from:$scope.r.drywall.planned_start, to: $scope.r.drywall.planned_finish},
                {name: 'Actual', classes: "actual", from:$scope.r.drywall.actual_start, to: $scope.r.drywall.actual_finish}
                ]
            },
            {name: 'Windows', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from:$scope.r.windows.planned_start, to: $scope.r.windows.planned_finish},
                {name: 'Actual', classes: "actual", from:$scope.r.windows.actual_start, to: $scope.r.windows.actual_finish}
                ]
            },
            {name: 'Roof', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from:$scope.r.roof.planned_start, to: $scope.r.roof.planned_finish},
                {name: 'Actual', classes: "actual", from:$scope.r.roof.actual_start, to: $scope.r.roof.actual_finish}
                ]
            },
            {name: 'HVAC', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from: $scope.r.hvac.planned_start, to: $scope.r.hvac.planned_finish},
                {name: 'Actual', classes: "actual", from: $scope.r.hvac.actual_start, to: $scope.r.hvac.actual_finish}
              ]
            },
            {name: 'Flooring', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from: $scope.r.flooring.planned_start, to: $scope.r.flooring.planned_finish},
                {name: 'Actual', classes: "actual", from: $scope.r.flooring.actual_start, to: $scope.r.flooring.actual_finish}
              ]
            },
            {name: 'Interior Paint', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from: $scope.r.int_paint.planned_start, to: $scope.r.int_paint.planned_finish},
                {name: 'Actual', classes: "actual", from: $scope.r.int_paint.actual_start, to: $scope.r.int_paint.actual_finish}
              ]
            },
            {name: 'Kitchen', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from: $scope.r.kitchen.planned_start, to: $scope.r.kitchen.planned_finish},
                {name: 'Actual', classes: "actual", from: $scope.r.kitchen.actual_start, to: $scope.r.kitchen.actual_finish}
              ]
            },
            {name: 'Fixtures', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from: $scope.r.fixtures.planned_start, to: $scope.r.fixtures.planned_finish},
                {name: 'Actual', classes: "actual", from: $scope.r.fixtures.actual_start, to: $scope.r.fixtures.actual_finish}
              ]
            },
            {name: 'Exterior Paint', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from: $scope.r.ext_paint.planned_start, to: $scope.r.ext_paint.planned_finish},
                {name: 'Actual', classes: "actual", from: $scope.r.ext_paint.actual_start, to: $scope.r.ext_paint.actual_finish}
              ]
            },
            {name: 'Stucco', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from: $scope.r.stucco.planned_start, to: $scope.r.stucco.planned_finish},
                {name: 'Actual', classes: "actual", from: $scope.r.stucco.actual_start, to: $scope.r.stucco.actual_finish}
              ]
            },
            {name: 'Landscaping', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from: $scope.r.landscaping.planned_start, to: $scope.r.landscaping.planned_finish},
                {name: 'Actual', classes: "actual", from: $scope.r.landscaping.actual_start, to: $scope.r.landscaping.actual_finish}
              ]
            },
            {name: 'Hardscape/Fence', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from: $scope.r.hardscape.planned_start, to: $scope.r.hardscape.planned_finish},
                {name: 'Actual', classes: "actual", from: $scope.r.hardscape.actual_start, to: $scope.r.hardscape.actual_finish}
              ]
            },
            {name: 'Garage Door', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from: $scope.r.garage_door.planned_start, to: $scope.r.garage_door.planned_finish},
                {name: 'Actual', classes: "actual", from: $scope.r.garage_door.actual_start, to: $scope.r.garage_door.actual_finish}
              ]
            },
            {name: 'Pool/Spa', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from: $scope.r.pool_spa.planned_start, to: $scope.r.pool_spa.planned_finish},
                {name: 'Actual', classes: "actual", from: $scope.r.pool_spa.actual_start, to: $scope.r.pool_spa.actual_finish}
              ]
            },
            {name: 'Sales Clean', color: '#f5f5f5', height: '4em', tasks: [
                {name: 'Planned', classes: "expected", from: $scope.r.sales_clean.planned_start, to: $scope.r.sales_clean.planned_finish},
                {name: 'Actual', classes: "actual", from: $scope.r.sales_clean.actual_start, to: $scope.r.sales_clean.actual_finish}
              ]
        }];
    }
  }
});