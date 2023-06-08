import pandas as pd


def stops_by_route_id(route_id):
    #route_line = routes_df.loc[(routes_df['route_short_name'] == line_number) & (routes_df['route_type'] == 3)]
    #route_id = route_line.iloc[0]['route_id']
    trip_id = trips_df.loc[trips_df['route_id'] == route_id].iloc[0]['trip_id']
    stops_for_trip_id = stop_times_df.loc[stop_times_df['trip_id'] == trip_id]
    stops_lst = []
    stop_seq = 1
    while True:
        stop = stops_for_trip_id.loc[stops_for_trip_id['stop_sequence'] == stop_seq]
        if stop.empty:
            break
        stops_lst.append(stop['stop_id'].values.tolist()[0])
        stop_seq += 1

    res = []
    for stop_id in stops_lst:
        stop_info = stops_df.loc[stops_df['stop_id'] == stop_id]
        res.append((stop_info['stop_lat'].values.tolist()[0], stop_info['stop_lon'].values.tolist()[0]))
    return res


if __name__ == "__main__":
    routes_df = pd.read_csv("data/routes.txt")
    trips_df = pd.read_csv("data/trips.txt")
    stop_times_df = pd.read_csv("data/stop_times.txt")
    stops_df = pd.read_csv("data/stops.txt")
    #stops = stops_for_line('13')
    #print(stops)
