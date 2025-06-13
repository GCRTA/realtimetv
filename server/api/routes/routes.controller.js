'use strict';

var request = require('request');

// Get list of nearby routes
exports.nearby = function (req, res) {
  const {lat, lon, max_distance} = req.query;

  // Return mock data in development mode
  if (process.env.NODE_ENV !== 'production') {
    console.log('Returning mock data');
    const mockRoutes = [
      {
          "alerts": [
              {
                  "created_at": 1735326900,
                  "description": "The Red Line W.117–Madison Station closes July 17, 2024 until further notice. All other Red Line stations remain in service. Bus service at W.117–Madison: #25, east-west; #78 north-south; and the #26-26A on Detroit Ave., approximately one-half mile north of the station.",
                  "effect": "NO_SERVICE",
                  "severity": "Severe",
                  "title": "The Red Line W.117–Madison Station closes July 17, 2024 until further notice."
              },
              {
                "created_at": 1735326900,
                "description": "66R Shuttle Buses replace Red Line between Tower City and Airport",
                "effect": "NO_SERVICE",
                "severity": "Severe",
                "title": "66R Shuttle Buses replace Red Line between Tower City and Airport"
            }
          ],
          "compact_display_short_name": {
              "boxed_text": "",
              "elements": [
                  null,
                  "Red",
                  null
              ],
              "route_name_redundancy": false
          },
          "fares": [
              {
                  "fare_media_type": 0,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              },
              {
                  "fare_media_type": 1,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              },
              {
                  "fare_media_type": 4,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              }
          ],
          "global_route_id": "GCRTA:32021",
          "itineraries": [
              {
                  "branch_code": "",
                  "closest_stop": {
                      "global_stop_id": "GCRTA:55444",
                      "location_type": 0,
                      "parent_station_global_stop_id": "GCRTA:31138",
                      "route_type": 1,
                      "rt_stop_id": "28908",
                      "stop_code": "28908",
                      "stop_lat": 41.41986179374579,
                      "stop_lon": -81.82350959479132,
                      "stop_name": "Brookpark Station",
                      "wheelchair_boarding": 0
                  },
                  "direction_headsign": "Stokes / Windermere",
                  "direction_id": 0,
                  "headsign": "Stokes / Windermere",
                  "merged_headsign": "Stokes / Windermere",
                  "schedule_items": [
                      {
                          "departure_time": 1749148800,
                          "is_cancelled": false,
                          "is_real_time": false,
                          "rt_trip_id": "18544891",
                          "scheduled_departure_time": 1749148800,
                          "trip_search_key": "GCRTA:48668005:227:3:43",
                          "wheelchair_accessible": 1
                      },
                      {
                          "departure_time": 1749149861,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18544892",
                          "scheduled_departure_time": 1749149700,
                          "trip_search_key": "GCRTA:48668005:227:3:44",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749150600,
                          "is_cancelled": false,
                          "is_real_time": false,
                          "rt_trip_id": "18544893",
                          "scheduled_departure_time": 1749150600,
                          "trip_search_key": "GCRTA:48668005:227:3:45",
                          "wheelchair_accessible": 1
                      }
                  ]
              },
              {
                  "branch_code": "",
                  "closest_stop": {
                      "global_stop_id": "GCRTA:55443",
                      "location_type": 0,
                      "parent_station_global_stop_id": "GCRTA:31138",
                      "route_type": 1,
                      "rt_stop_id": "28897",
                      "stop_code": "28897",
                      "stop_lat": 41.41988877335585,
                      "stop_lon": -81.82356355401144,
                      "stop_name": "Brookpark Station",
                      "wheelchair_boarding": 0
                  },
                  "direction_headsign": "Airport",
                  "direction_id": 1,
                  "headsign": "Airport",
                  "merged_headsign": "Airport",
                  "schedule_items": [
                      {
                          "departure_time": 1749148758,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18544805",
                          "scheduled_departure_time": 1749148560,
                          "trip_search_key": "GCRTA:48668005:226:3:43",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749149621,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18544806",
                          "scheduled_departure_time": 1749149460,
                          "trip_search_key": "GCRTA:48668005:226:3:44",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749150360,
                          "is_cancelled": false,
                          "is_real_time": false,
                          "rt_trip_id": "18544807",
                          "scheduled_departure_time": 1749150360,
                          "trip_search_key": "GCRTA:48668005:226:3:45",
                          "wheelchair_accessible": 1
                      }
                  ]
              }
          ],
          "mode_name": "Subway",
          "real_time_route_id": "66",
          "route_color": "d7182a",
          "route_display_short_name": {
              "boxed_text": "",
              "elements": [
                  "vehicle-rail-a650",
                  "",
                  null
              ],
              "route_name_redundancy": true
          },
          "route_image": "",
          "route_long_name": "",
          "route_network_id": "GCRTA|Cleveland",
          "route_network_name": "GCRTA",
          "route_short_name": "Red",
          "route_text_color": "ffffff",
          "route_timezone": "America/New_York",
          "route_type": 1,
          "sorting_key": "Red",
          "tts_long_name": "",
          "tts_short_name": "red line",
          "vehicle": {
              "image": "vehicle-rail-a650",
              "name": "train",
              "name_inflection": "n"
          }
      },
      {
          "alerts": [
              {
                  "created_at": 1735326900,
                  "description": "Test Alert for the 86",
                  "effect": "NO_SERVICE",
                  "severity": "Info",
                  "title": "Test Alert for the 86"
              }
          ],
          "compact_display_short_name": {
              "boxed_text": "",
              "elements": [
                  null,
                  "86",
                  null
              ],
              "route_name_redundancy": false
          },
          "fares": [
              {
                  "fare_media_type": 0,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              },
              {
                  "fare_media_type": 1,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              },
              {
                  "fare_media_type": 4,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              }
          ],
          "global_route_id": "GCRTA:15214",
          "itineraries": [
              {
                  "branch_code": "",
                  "closest_stop": {
                      "global_stop_id": "GCRTA:48052",
                      "location_type": 0,
                      "parent_station_global_stop_id": null,
                      "route_type": 3,
                      "rt_stop_id": "14768",
                      "stop_code": "14768",
                      "stop_lat": 41.41861173847945,
                      "stop_lon": -81.82643238588166,
                      "stop_name": "18301 Brookpark Rd",
                      "wheelchair_boarding": 0
                  },
                  "direction_headsign": "West Park Station",
                  "direction_id": 0,
                  "headsign": "West Park Station",
                  "merged_headsign": "West Park Station",
                  "schedule_items": [
                      {
                          "departure_time": 1749148740,
                          "is_cancelled": false,
                          "is_real_time": false,
                          "rt_trip_id": "18575278",
                          "scheduled_departure_time": 1749148740,
                          "trip_search_key": "GCRTA:48668005:197:3:17",
                          "wheelchair_accessible": 1
                      },
                      {
                          "departure_time": 1749150493,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574398",
                          "scheduled_departure_time": 1749150540,
                          "trip_search_key": "GCRTA:48668005:197:3:18",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749152400,
                          "is_cancelled": false,
                          "is_real_time": false,
                          "rt_trip_id": "18575279",
                          "scheduled_departure_time": 1749152400,
                          "trip_search_key": "GCRTA:48668005:197:3:19",
                          "wheelchair_accessible": 1
                      }
                  ]
              },
              {
                  "branch_code": "",
                  "closest_stop": {
                      "global_stop_id": "GCRTA:48052",
                      "location_type": 0,
                      "parent_station_global_stop_id": null,
                      "route_type": 3,
                      "rt_stop_id": "14768",
                      "stop_code": "14768",
                      "stop_lat": 41.41861173847945,
                      "stop_lon": -81.82643238588166,
                      "stop_name": "18301 Brookpark Rd",
                      "wheelchair_boarding": 0
                  },
                  "direction_headsign": "Tri-C West",
                  "direction_id": 1,
                  "headsign": "Tri-C West",
                  "merged_headsign": "Tri-C West",
                  "schedule_items": [
                      {
                          "departure_time": 1749149183,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574295",
                          "scheduled_departure_time": 1749149340,
                          "trip_search_key": "GCRTA:48668005:196:3:18",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749151140,
                          "is_cancelled": false,
                          "is_real_time": false,
                          "rt_trip_id": "18575268",
                          "scheduled_departure_time": 1749151140,
                          "trip_search_key": "GCRTA:48668005:196:3:19",
                          "wheelchair_accessible": 1
                      },
                      {
                          "departure_time": 1749153000,
                          "is_cancelled": false,
                          "is_real_time": false,
                          "rt_trip_id": "18574397",
                          "scheduled_departure_time": 1749153000,
                          "trip_search_key": "GCRTA:48668005:196:3:20",
                          "wheelchair_accessible": 1
                      }
                  ]
              }
          ],
          "mode_name": "Bus",
          "real_time_route_id": "86",
          "route_color": "052743",
          "route_display_short_name": {
              "boxed_text": "",
              "elements": [
                  null,
                  "86",
                  null
              ],
              "route_name_redundancy": false
          },
          "route_image": "",
          "route_long_name": "Rocky River Dr.–Bagley",
          "route_network_id": "GCRTA|Cleveland",
          "route_network_name": "GCRTA",
          "route_short_name": "86",
          "route_text_color": "ffffff",
          "route_timezone": "America/New_York",
          "route_type": 3,
          "sorting_key": "86",
          "tts_long_name": "Rocky River Dr.–Bagley",
          "tts_short_name": "86",
          "vehicle": {
              "image": "bus-new",
              "name": "bus",
              "name_inflection": "n"
          }
      },
      {
          "alerts": [],
          "compact_display_short_name": {
              "boxed_text": "",
              "elements": [
                  null,
                  "78",
                  null
              ],
              "route_name_redundancy": false
          },
          "fares": [
              {
                  "fare_media_type": 0,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              },
              {
                  "fare_media_type": 1,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              },
              {
                  "fare_media_type": 4,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              }
          ],
          "global_route_id": "GCRTA:15209",
          "itineraries": [
              {
                  "branch_code": "",
                  "closest_stop": {
                      "global_stop_id": "GCRTA:48055",
                      "location_type": 0,
                      "parent_station_global_stop_id": null,
                      "route_type": 3,
                      "rt_stop_id": "14767",
                      "stop_code": "14767",
                      "stop_lat": 41.41872865012306,
                      "stop_lon": -81.82667520237224,
                      "stop_name": "18200 Brookpark Rd",
                      "wheelchair_boarding": 0
                  },
                  "direction_headsign": "Winton Place",
                  "direction_id": 0,
                  "headsign": "Winton Place",
                  "merged_headsign": "Winton Place",
                  "schedule_items": [
                      {
                          "departure_time": 1749148768,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18575380",
                          "scheduled_departure_time": 1749148560,
                          "trip_search_key": "GCRTA:48668005:186:3:38",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749149502,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574071",
                          "scheduled_departure_time": 1749149460,
                          "trip_search_key": "GCRTA:48668005:186:3:39",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749150360,
                          "is_cancelled": false,
                          "is_real_time": false,
                          "rt_trip_id": "18575383",
                          "scheduled_departure_time": 1749150360,
                          "trip_search_key": "GCRTA:48668005:186:3:40",
                          "wheelchair_accessible": 1
                      }
                  ]
              },
              {
                  "branch_code": "",
                  "closest_stop": {
                      "global_stop_id": "GCRTA:48052",
                      "location_type": 0,
                      "parent_station_global_stop_id": null,
                      "route_type": 3,
                      "rt_stop_id": "14768",
                      "stop_code": "14768",
                      "stop_lat": 41.41861173847945,
                      "stop_lon": -81.82643238588166,
                      "stop_name": "18301 Brookpark Rd",
                      "wheelchair_boarding": 0
                  },
                  "direction_headsign": "Brookpark Station",
                  "direction_id": 1,
                  "headsign": "Brookpark Station",
                  "merged_headsign": "Brookpark Station",
                  "schedule_items": [
                      {
                          "departure_time": 1749148788,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574062",
                          "scheduled_departure_time": 1749148920,
                          "trip_search_key": "GCRTA:48668005:185:3:35",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749149523,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18575378",
                          "scheduled_departure_time": 1749149820,
                          "trip_search_key": "GCRTA:48668005:185:3:36",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749150506,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574257",
                          "scheduled_departure_time": 1749150720,
                          "trip_search_key": "GCRTA:48668005:185:3:37",
                          "wheelchair_accessible": 0
                      }
                  ]
              }
          ],
          "mode_name": "Bus",
          "real_time_route_id": "78",
          "route_color": "052743",
          "route_display_short_name": {
              "boxed_text": "",
              "elements": [
                  null,
                  "78",
                  null
              ],
              "route_name_redundancy": false
          },
          "route_image": "",
          "route_long_name": "West 117–Puritas",
          "route_network_id": "GCRTA|Cleveland",
          "route_network_name": "GCRTA",
          "route_short_name": "78",
          "route_text_color": "ffffff",
          "route_timezone": "America/New_York",
          "route_type": 3,
          "sorting_key": "78",
          "tts_long_name": "West 117–Puritas",
          "tts_short_name": "78",
          "vehicle": {
              "image": "bus-new",
              "name": "bus",
              "name_inflection": "n"
          }
      },
      {
          "alerts": [],
          "compact_display_short_name": {
              "boxed_text": "",
              "elements": [
                  null,
                  "54",
                  null
              ],
              "route_name_redundancy": false
          },
          "fares": [
              {
                  "fare_media_type": 0,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              },
              {
                  "fare_media_type": 1,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              },
              {
                  "fare_media_type": 4,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              }
          ],
          "global_route_id": "GCRTA:15188",
          "itineraries": [
              {
                  "branch_code": "",
                  "closest_stop": {
                      "global_stop_id": "GCRTA:47430",
                      "location_type": 0,
                      "parent_station_global_stop_id": null,
                      "route_type": 3,
                      "rt_stop_id": "10710",
                      "stop_code": "10710",
                      "stop_lat": 41.41941213357804,
                      "stop_lon": -81.82270020648937,
                      "stop_name": "Brookpark Station Stop #2",
                      "wheelchair_boarding": 0
                  },
                  "direction_headsign": "Garfield Cmmons",
                  "direction_id": 0,
                  "headsign": "Garfield Cmmons",
                  "merged_headsign": "Garfield Cmmons",
                  "schedule_items": [
                      {
                          "departure_time": 1749149880,
                          "is_cancelled": false,
                          "is_real_time": false,
                          "rt_trip_id": "18574082",
                          "scheduled_departure_time": 1749149880,
                          "trip_search_key": "GCRTA:48668005:146:3:10",
                          "wheelchair_accessible": 1
                      },
                      {
                          "departure_time": 1749153480,
                          "is_cancelled": false,
                          "is_real_time": false,
                          "rt_trip_id": "18574039",
                          "scheduled_departure_time": 1749153480,
                          "trip_search_key": "GCRTA:48668005:146:3:11",
                          "wheelchair_accessible": 1
                      },
                      {
                          "departure_time": 1749157080,
                          "is_cancelled": false,
                          "is_real_time": false,
                          "rt_trip_id": "18574089",
                          "scheduled_departure_time": 1749157080,
                          "trip_search_key": "GCRTA:48668005:146:3:12",
                          "wheelchair_accessible": 1
                      }
                  ]
              },
              {
                  "branch_code": "",
                  "closest_stop": {
                      "global_stop_id": "GCRTA:47430",
                      "location_type": 0,
                      "parent_station_global_stop_id": null,
                      "route_type": 3,
                      "rt_stop_id": "10710",
                      "stop_code": "10710",
                      "stop_lat": 41.41941213357804,
                      "stop_lon": -81.82270020648937,
                      "stop_name": "Brookpark Station Stop #2",
                      "wheelchair_boarding": 0
                  },
                  "direction_headsign": "Brookpark Station",
                  "direction_id": 1,
                  "headsign": "Brookpark Station",
                  "merged_headsign": "Brookpark Station",
                  "schedule_items": []
              }
          ],
          "mode_name": "Bus",
          "real_time_route_id": "54",
          "route_color": "052743",
          "route_display_short_name": {
              "boxed_text": "",
              "elements": [
                  null,
                  "54",
                  null
              ],
              "route_name_redundancy": false
          },
          "route_image": "",
          "route_long_name": "Brookpark–Rockside",
          "route_network_id": "GCRTA|Cleveland",
          "route_network_name": "GCRTA",
          "route_short_name": "54",
          "route_text_color": "ffffff",
          "route_timezone": "America/New_York",
          "route_type": 3,
          "sorting_key": "54",
          "tts_long_name": "Brookpark–Rockside",
          "tts_short_name": "54",
          "vehicle": {
              "image": "bus-new",
              "name": "bus",
              "name_inflection": "n"
          }
      },
      {
          "alerts": [
            {
                "created_at": 1735326900,
                "description": "#1 Test Alert for the 83",
                "effect": "NO_SERVICE",
                "severity": "Severe",
                "title": "#1 Test Alert for the 83"
            },
            {
                "created_at": 1735326900,
                "description": "#2 Test Alert for the 83",
                "effect": "NO_SERVICE",
                "severity": "Severe",
                "title": "#2 Test Alert for the 83"
            }
          ],
          "compact_display_short_name": {
              "boxed_text": "",
              "elements": [
                  null,
                  "83",
                  null
              ],
              "route_name_redundancy": false
          },
          "fares": [
              {
                  "fare_media_type": 0,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              },
              {
                  "fare_media_type": 1,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              },
              {
                  "fare_media_type": 4,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              }
          ],
          "global_route_id": "GCRTA:15213",
          "itineraries": [
              {
                  "branch_code": "",
                  "closest_stop": {
                      "global_stop_id": "GCRTA:46970",
                      "location_type": 0,
                      "parent_station_global_stop_id": null,
                      "route_type": 3,
                      "rt_stop_id": "06799",
                      "stop_code": "06799",
                      "stop_lat": 41.43359441526876,
                      "stop_lon": -81.79041460644518,
                      "stop_name": "Puritas Av / W 140th St",
                      "wheelchair_boarding": 0
                  },
                  "direction_headsign": "Lakewood Park",
                  "direction_id": 0,
                  "headsign": "Lakewood Park",
                  "merged_headsign": "Lakewood Park",
                  "schedule_items": [
                      {
                          "departure_time": 1749149192,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574439",
                          "scheduled_departure_time": 1749149160,
                          "trip_search_key": "GCRTA:48668005:191:3:15",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749150753,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574096",
                          "scheduled_departure_time": 1749150900,
                          "trip_search_key": "GCRTA:48668005:191:3:16",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749152700,
                          "is_cancelled": false,
                          "is_real_time": false,
                          "rt_trip_id": "18574164",
                          "scheduled_departure_time": 1749152700,
                          "trip_search_key": "GCRTA:48668005:191:3:17",
                          "wheelchair_accessible": 1
                      }
                  ]
              },
              {
                  "branch_code": "",
                  "closest_stop": {
                      "global_stop_id": "GCRTA:46856",
                      "location_type": 0,
                      "parent_station_global_stop_id": null,
                      "route_type": 3,
                      "rt_stop_id": "12123",
                      "stop_code": "12123",
                      "stop_lat": 41.43406206184322,
                      "stop_lon": -81.79075634817266,
                      "stop_name": "W 140th St / Puritas Av",
                      "wheelchair_boarding": 0
                  },
                  "direction_headsign": "Parma TC",
                  "direction_id": 1,
                  "headsign": "Tri-C West",
                  "merged_headsign": "Tri-C West",
                  "schedule_items": [
                      {
                          "departure_time": 1749148975,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574177",
                          "scheduled_departure_time": 1749149040,
                          "trip_search_key": "GCRTA:48668005:190:3:17",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749150731,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574151",
                          "scheduled_departure_time": 1749150900,
                          "trip_search_key": "GCRTA:48668005:190:3:18",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749152700,
                          "is_cancelled": false,
                          "is_real_time": false,
                          "rt_trip_id": "18574441",
                          "scheduled_departure_time": 1749152700,
                          "trip_search_key": "GCRTA:48668005:190:3:19",
                          "wheelchair_accessible": 1
                      }
                  ]
              }
          ],
          "mode_name": "Bus",
          "real_time_route_id": "83",
          "route_color": "052743",
          "route_display_short_name": {
              "boxed_text": "",
              "elements": [
                  null,
                  "83",
                  null
              ],
              "route_name_redundancy": false
          },
          "route_image": "",
          "route_long_name": "Warren–West 130",
          "route_network_id": "GCRTA|Cleveland",
          "route_network_name": "GCRTA",
          "route_short_name": "83",
          "route_text_color": "ffffff",
          "route_timezone": "America/New_York",
          "route_type": 3,
          "sorting_key": "83",
          "tts_long_name": "Warren–West 130",
          "tts_short_name": "83",
          "vehicle": {
              "image": "bus-new",
              "name": "bus",
              "name_inflection": "n"
          }
      },
      {
          "alerts": [],
          "compact_display_short_name": {
              "boxed_text": "",
              "elements": [
                  null,
                  "22",
                  null
              ],
              "route_name_redundancy": false
          },
          "fares": [
              {
                  "fare_media_type": 0,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              },
              {
                  "fare_media_type": 1,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              },
              {
                  "fare_media_type": 4,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              }
          ],
          "global_route_id": "GCRTA:15160",
          "itineraries": [
              {
                  "branch_code": "",
                  "closest_stop": {
                      "global_stop_id": "GCRTA:55453",
                      "location_type": 0,
                      "parent_station_global_stop_id": null,
                      "route_type": 3,
                      "rt_stop_id": "00177",
                      "stop_code": "00177",
                      "stop_lat": 41.45001600459486,
                      "stop_lon": -81.821018477462,
                      "stop_name": "Lorain Av / Old Lorain Rd",
                      "wheelchair_boarding": 0
                  },
                  "direction_headsign": "Downtown",
                  "direction_id": 0,
                  "headsign": "Downtown",
                  "merged_headsign": "Downtown",
                  "schedule_items": [
                      {
                          "departure_time": 1749149434,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574603",
                          "scheduled_departure_time": 1749149460,
                          "trip_search_key": "GCRTA:48668005:52:3:44",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749150364,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574623",
                          "scheduled_departure_time": 1749150480,
                          "trip_search_key": "GCRTA:48668005:52:3:45",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749151380,
                          "is_cancelled": false,
                          "is_real_time": false,
                          "rt_trip_id": "18574578",
                          "scheduled_departure_time": 1749151380,
                          "trip_search_key": "GCRTA:48668005:52:3:46",
                          "wheelchair_accessible": 1
                      }
                  ]
              },
              {
                  "branch_code": "",
                  "closest_stop": {
                      "global_stop_id": "GCRTA:55457",
                      "location_type": 0,
                      "parent_station_global_stop_id": null,
                      "route_type": 3,
                      "rt_stop_id": "05890",
                      "stop_code": "05890",
                      "stop_lat": 41.45020486186532,
                      "stop_lon": -81.82112639590225,
                      "stop_name": "Lorain Av / W 178th St",
                      "wheelchair_boarding": 0
                  },
                  "direction_headsign": "Westgate TC",
                  "direction_id": 1,
                  "headsign": "Westgate TC",
                  "merged_headsign": "Westgate TC",
                  "schedule_items": [
                      {
                          "departure_time": 1749149340,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574574",
                          "scheduled_departure_time": 1749149340,
                          "trip_search_key": "GCRTA:48668005:53:3:39",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749150054,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574655",
                          "scheduled_departure_time": 1749150240,
                          "trip_search_key": "GCRTA:48668005:53:3:40",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749151092,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574611",
                          "scheduled_departure_time": 1749151140,
                          "trip_search_key": "GCRTA:48668005:53:3:41",
                          "wheelchair_accessible": 0
                      }
                  ]
              }
          ],
          "mode_name": "Bus",
          "real_time_route_id": "22",
          "route_color": "052743",
          "route_display_short_name": {
              "boxed_text": "",
              "elements": [
                  null,
                  "22",
                  null
              ],
              "route_name_redundancy": false
          },
          "route_image": "",
          "route_long_name": "Lorain",
          "route_network_id": "GCRTA|Cleveland",
          "route_network_name": "GCRTA",
          "route_short_name": "22",
          "route_text_color": "ffffff",
          "route_timezone": "America/New_York",
          "route_type": 3,
          "sorting_key": "22",
          "tts_long_name": "Lorain",
          "tts_short_name": "22",
          "vehicle": {
              "image": "bus-new",
              "name": "bus",
              "name_inflection": "n"
          }
      },
      {
          "alerts": [],
          "compact_display_short_name": {
              "boxed_text": "",
              "elements": [
                  null,
                  "55",
                  null
              ],
              "route_name_redundancy": false
          },
          "fares": [
              {
                  "fare_media_type": 0,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              },
              {
                  "fare_media_type": 1,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              },
              {
                  "fare_media_type": 4,
                  "price_max": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  },
                  "price_min": {
                      "currency_code": "USD",
                      "symbol": "$",
                      "text": "$ 2.50",
                      "value": 2.5
                  }
              }
          ],
          "global_route_id": "GCRTA:15189",
          "itineraries": [
              {
                  "branch_code": "",
                  "closest_stop": {
                      "global_stop_id": "GCRTA:46241",
                      "location_type": 0,
                      "parent_station_global_stop_id": null,
                      "route_type": 3,
                      "rt_stop_id": "09124",
                      "stop_code": "09124",
                      "stop_lat": 41.44530356603688,
                      "stop_lon": -81.85521063661744,
                      "stop_name": "Lorain Rd / W 212th St",
                      "wheelchair_boarding": 0
                  },
                  "direction_headsign": "Cleveland State",
                  "direction_id": 0,
                  "headsign": "Cleveland State",
                  "merged_headsign": "Cleveland State",
                  "schedule_items": [
                      {
                          "departure_time": 1749149635,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574881",
                          "scheduled_departure_time": 1749149580,
                          "trip_search_key": "GCRTA:48668005:149:3:13",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749151249,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574929",
                          "scheduled_departure_time": 1749151380,
                          "trip_search_key": "GCRTA:48668005:149:3:14",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749153180,
                          "is_cancelled": false,
                          "is_real_time": false,
                          "rt_trip_id": "18574900",
                          "scheduled_departure_time": 1749153180,
                          "trip_search_key": "GCRTA:48668005:149:3:15",
                          "wheelchair_accessible": 1
                      }
                  ]
              },
              {
                  "branch_code": "",
                  "closest_stop": {
                      "global_stop_id": "GCRTA:46488",
                      "location_type": 0,
                      "parent_station_global_stop_id": null,
                      "route_type": 3,
                      "rt_stop_id": "08183",
                      "stop_code": "08183",
                      "stop_lat": 41.44659858731999,
                      "stop_lon": -81.85308824062568,
                      "stop_name": "W 210th St / Lorain Rd",
                      "wheelchair_boarding": 0
                  },
                  "direction_headsign": "Lorain Co Line",
                  "direction_id": 1,
                  "headsign": "Lorain Co Line",
                  "merged_headsign": "Lorain Co Line",
                  "schedule_items": [
                      {
                          "departure_time": 1749149417,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574906",
                          "scheduled_departure_time": 1749149220,
                          "trip_search_key": "GCRTA:48668005:158:3:19",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749150871,
                          "is_cancelled": false,
                          "is_real_time": true,
                          "rt_trip_id": "18574921",
                          "scheduled_departure_time": 1749151080,
                          "trip_search_key": "GCRTA:48668005:158:3:20",
                          "wheelchair_accessible": 0
                      },
                      {
                          "departure_time": 1749152880,
                          "is_cancelled": false,
                          "is_real_time": false,
                          "rt_trip_id": "18574889",
                          "scheduled_departure_time": 1749152880,
                          "trip_search_key": "GCRTA:48668005:159:3:0",
                          "wheelchair_accessible": 1
                      }
                  ]
              }
          ],
          "mode_name": "Bus",
          "real_time_route_id": "55",
          "route_color": "006a4d",
          "route_display_short_name": {
              "boxed_text": "Cleveland State",
              "elements": [
                  null,
                  "55",
                  null
              ],
              "route_name_redundancy": false
          },
          "route_image": "",
          "route_long_name": "Cleveland State Line",
          "route_network_id": "GCRTA|Cleveland",
          "route_network_name": "GCRTA",
          "route_short_name": "55",
          "route_text_color": "ffffff",
          "route_timezone": "America/New_York",
          "route_type": 3,
          "sorting_key": "55",
          "tts_long_name": "Cleveland State Line",
          "tts_short_name": "55",
          "vehicle": {
              "image": "bus-new",
              "name": "bus",
              "name_inflection": "n"
          }
      }
  ];
    console.log('Mock data:', JSON.stringify(mockRoutes, null, 2));
    return res.json({ routes: mockRoutes });
  }

  request({
    url: `https://external.transitapp.com/v3/public/nearby_routes?lat=${lat}&lon=${lon}&max_distance=${max_distance}`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'apiKey': process.env.API_KEY,
    }
  }).pipe(res);
};
