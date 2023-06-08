from flask import Flask, request, render_template, redirect,url_for
import csv
import json
app = Flask(__name__)

ROUTES_FILE_PATH = "data/routes.txt"
STOPS_FILE_PATH = "data/stops.txt"
TRIPS_FILE_PATH = "data/trips.txt"

@app.route('/')
def main():
    bus_lines= [i for i in range(190)]
    return render_template(f"main.html",bus_lines=bus_lines)


@app.route('/get_routes')
def get_routes():
    return get_csv_data(ROUTES_FILE_PATH)

@app.route('/get_trips')
def get_trips():
    return get_csv_data(TRIPS_FILE_PATH)
@app.route('/get_stops')
def get_stops():
    return get_csv_data(STOPS_FILE_PATH)


def get_csv_data(filename):
    with open(filename, "r", encoding='utf-8') as file:
        csv_reader = csv.reader(file,)
        headers = next(csv_reader)
        # Create a list of dictionaries
        routes = []
        for row in csv_reader:
            route = {key: value for key, value in zip(headers, row)}
            routes.append(route)

    # Print the list of dictionaries
    return json.dumps(routes)

