from flask import Flask, request, render_template, redirect,url_for
import csv
import json
from utils import stops_by_route_id
app = Flask(__name__)

ROUTES_FILE_PATH = "data/routes.txt"
STOPS_FILE_PATH = "data/stops.txt"
TRIPS_FILE_PATH = "data/trips.txt"
STOP_TIMES_FILE_PATH = "data/stop_times.txt"

@app.route('/')
def main():
    return render_template(f"main.html")


@app.route('/get_routes')
def get_routes():
    return json.dumps(get_csv_data(ROUTES_FILE_PATH))

@app.route('/get_trips')
def get_trips():
    return json.dumps(get_csv_data(TRIPS_FILE_PATH))
@app.route('/get_stops')
def get_stops():
    return json.dumps(get_csv_data(STOPS_FILE_PATH))

@app.route('/get_stops_times')
def get_stops_times():
    return json.dumps(get_csv_data(STOP_TIMES_FILE_PATH))
@app.route('/get_stops_by_route_id/<route_id>')
def get_stops_by_route_id(route_id):
    stops = stops_by_route_id(int(route_id))
    return json.dumps(stops)

def get_csv_data(filename):
    with open(filename, "r", encoding='utf-8') as file:
        csv_reader = csv.reader(file,)
        headers = next(csv_reader)
        headers[0] = headers[0][1:]
        # Create a list of dictionaries
        routes = []
        for row in csv_reader:
            route = {key: value for key, value in zip(headers, row)}
            routes.append(route)

    # Print the list of dictionaries
    return routes

