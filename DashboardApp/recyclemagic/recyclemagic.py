"""Welcome to Reflex! This file outlines the steps to create a basic app."""

import reflex as rx
import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore

class State(rx.State):
    """The app state."""

    ...

# Initialize Firebase with your credentials
cred = credentials.Certificate('recyclemagic/firebase-service-account.json')
firebase_admin.initialize_app(cred)

# Connect to Firestore
db = firestore.client()

# Fetch data from a Firestore collection (e.g., 'players')
def fetch_waste_data():
    players_ref = db.collection('waste_management').limit(100)
    docs = players_ref.stream()

    data = []
    for doc in docs:
        data.append(doc.to_dict())
    
    # Convert the Firestore data to a pandas DataFrame
    return pd.DataFrame(data)

def fetch_tank_data():
    players_ref = db.collection('tank_status').limit(100)
    docs = players_ref.stream()

    data = []
    for doc in docs:
        data.append(doc.to_dict())
    
    # Convert the Firestore data to a pandas DataFrame
    return pd.DataFrame(data)

# Fetch data all firestore collections except waste_management
def fetch_data():
    # Define the collections you want to read
    collection_names = ['pepsi_bottle', 'water_bottle']
    
    data = []

    # Iterate through the collection names and fetch data
    for collection_name in collection_names:
        collection_ref = db.collection(collection_name).limit(100)  # Limit the number of docs to 100 per collection
        docs = collection_ref.stream()

        # Fetch and append each document's data to the list
        for doc in docs:
            doc_data = doc.to_dict()
            doc_data['collection'] = collection_name  # Optionally, add a column to indicate the source collection
            data.append(doc_data)

    # Convert the combined data to a pandas DataFrame
    return pd.DataFrame(data)

# Load the data
bottle_data = fetch_data()

# Load the data from Firebase into pandas
waste_data = fetch_waste_data()

tank_data = fetch_tank_data()

def index() -> rx.Component:
    # Welcome Page (Index)
    return rx.box(
        rx.container(
            rx.color_mode.button(position="top-right"),
            rx.vstack(
                rx.heading("RecycleMagic Dashboard", size="20"),
                rx.spacer(),
                rx.grid(
                    rx.card(
                        rx.heading("Welcome!"),
                        rx.list.unordered(
                            rx.list.item("This is a dashboard for RecycleMagic."),
                            rx.list.item("Data on this page is updated via refresh."),
                            rx.list.item("Email us at kevin@recyclemagic.com for more information."),
                        ),
                        width="100%",  # Full width card
                    ),
                    rx.card(
                        rx.heading("Bottle Waste Management Bin Status"),
                        rx.data_table(
                            data=waste_data[["bin_id", "type", "status"]],
                            pagination=True,
                            search=True,
                            sort=True,
                        ),
                        width="100%",  # Full width card
                    ),
                    rx.card(
                        rx.heading("Bottle Status"),
                        rx.data_table(
                            data=bottle_data[["bottleID", "status"]],
                            pagination=True,
                            search=True,
                            sort=True,
                        ),
                        width="100%",  # Full width card
                    ),
                    rx.card(
                        rx.heading("Processing Plant Tank Status"),
                        rx.data_table(
                            data=tank_data[["tank", "status"]],
                            pagination=True,
                            search=True,
                            sort=True,
                        ),
                        width="100%",  # Full width card
                    ),
                    template_columns="repeat(2, 1fr)",  # Two columns of equal width
                    spacing="2",
                    width="100%",  # Ensure grid takes up full width
                ),
            ),
            width="100%",  # Ensure container takes up full width
            max_width="100vw",  # Ensure it occupies full viewport width
            padding="0",  # Remove padding around the container
            margin="0",  # Remove any extra margin
        ),
        width="100vw",  # Full viewport width for the entire box
        padding="0",  # Remove padding
    )


app = rx.App()
app.add_page(index)
