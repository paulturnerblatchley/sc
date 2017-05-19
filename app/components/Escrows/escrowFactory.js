app.factory("escrow", ['$http',
  function($http) {
      var o = {
        progress: {
          "day01" : {
            label: "Day 1",
            tasks: {
              "open" : {
                label: "Open Escrow",
                status: false
              },
              "contract" : {
                label: "Go over Contract",
                status: false
              },
              "nhd" : {
                label: "NHD Report",
                status: false
              },
              "intro_email" : {
                label: "Send Intro Email",
                status: false
              },
              "work_on_disclosures" : {
                label: "Work on Disclosures",
                status: false
              },
            }
          },
          "day03" : {
            label: "Day 3",
            tasks: {
              "emd_followup" : {
                label: "Follow up on EMD",
                status: false
              },
              "send_qs" : {
                label: "Send QS to Escrow",
                status: false,
                date: true
              },
              "ask_home_inspect" : {
                label: "Ask if Buyer is doing Home Inspection",
                status: false,
                inspection: true,
                date: true
              },
              "send_disclosures" : {
                label: "Send Disclosures to Buyers Agent",
                status: false,
                date: true
              }
            }
          },
          "day07" : {
            label: "Day 7",
            tasks: {
              "send_instruct_back" : {
                label: "Send Escrow Instructions Back to Escrow",
                status: false,
                date: true
              }
            }
          },
          "day12" : {
            label: "Day 12-15",
            tasks: {
              "disclosures_followup" : {
                label: "Follow up on Disclosures with buyers agent or TC",
                status: false,
                date: true
              },
              "check_loan_approval" : {
                label: "Check with Buyers agent on Loan Pre Approval",
                status: false,
                date: true
              },
              "termite_report" : {
                label: "Request for Termite Report from Listing agent",
                status: false,
                date: true
              },
              "termite_clear" : {
                label: "Request Termite Clearance",
                status: false,
                date: true
              },
              "go_over_file" : {
                label: "Go Over file",
                status: false
              },
            }
          },
          "day15" : {
            label: "Day 15-17",
            tasks: {
              "send_contingency" : {
                label: "Send Contingency Removal (Inspections & Appraisal) ",
                status: false,
                date: true
              }
            }
          },
          "day21" : {
            label: "Day 21",
            tasks: {
              "loan_contingency" : {
                label: "Loan Contingency Removal",
                status: false,
                date: true
              }
            }
          },
          "day23" : {
            label: "Day 23",
            tasks: {
              "request_warranty" : {
                label: "Request copy of Home Warranty",
                status: false,
                date: true
              }
            }
          }
        }
      };

      o.getEscrowProgress = function(q, pid) {
        return $http.get(serviceBase + q).then(function(results) {
          for(i = 0; i < results.data.length; i++) {
            if (results.data[i].pid == pid) {
              for (j in results.data[i]) {
                if (j == "home_inspect") {
                  o.progress["day03"].tasks["ask_home_inspect"].inspection = results.data[i][j];
                }
                if (j.includes("_date")) {
                  var k = j.replace("_date", "");
                  for (day in o.progress) {
                    if (o.progress[day].tasks[k]) {
                      var date;
                      if (results.data[i][j] == '0000-00-00') {
                        o.progress[day].tasks[k].date = results.data[i][j]
                      } else {
                        date = results.data[i][j].split("-");
                        o.progress[day].tasks[k].date = new Date(date[0],date[1]-1,date[2]);
                      }
                    }
                  }
                }
                for (day in o.progress) {
                  if (o.progress[day].tasks[j]) {
                    o.progress[day].tasks[j].status = (results.data[i][j] == "1") ? true : false;
                  }
                } 
              }
            }
          }
        });
      };
      return o;
  }
]);