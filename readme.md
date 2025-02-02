# Catalog Management Dashboard

## Overview

The Catalog Management Dashboard is a web application developed for Syte's clients to manage metadata about their catalogs. Users can view, add, update, and delete catalogs, as well as monitor the indexing process that runs automatically every 24 hours.

## Table of Contents

1. [Terminology](#terminology)
2. [Features](#features)
3. [Technical Stack](#technical-stack)
4. [Installation and Setup](#installation-and-setup)
5. [API Endpoints](#api-endpoints)
6. [Database Schema](#database-schema)
7. [Indexing Process](#indexing-process)
8. [Flow Diagram](#flow-diagram)
9. [Testing](#testing)
10. [Conclusion](#conclusion)

## Terminology

- **Catalog**: An entity that represents information about the client’s products.
- **Vertical**: Type of the products in the catalog (e.g., fashion, home, general).
- **Indexing Process**: An offline process that can be run on the catalog.

## Features

Users can perform the following actions through the dashboard:

- **View Catalogs**: Display a list of catalogs in a table format, showing the name, vertical, primary status, and last indexed time.
- **Add New Catalog**: Create a new catalog by specifying its name, vertical, and primary status. If a primary catalog already exists for the same vertical, it will be switched to non-primary.
- **Update Catalog**: Modify the primary status of an existing catalog.
- **Delete Catalog**: Remove a catalog from the list. (Bonus: Support for bulk deletion of multiple catalogs.)
- **Indexing Process**: Start the indexing process manually or automatically every 24 hours, with real-time status updates.

## Technical Stack

- **Backend**: TypeScript (NestJS framework)
- **Frontend**: TypeScript + React
- **Database**: MongoDB

# Installation and Setup

## Prepare before run

**Clone the Repository**:
 
   - git clone <https://github.com/masterevgeni/catalog.git>

**Add ENV files**
   - in `catalog-list-client` folder create .env file with `REACT_APP_API_URL=http://localhost:3100`
   - in `catalog-list-server` folder create .env file with `PORT=3100`, `MONGODB_URL="<your mongo url>"`

##  To run the application locally, you have two diffenrent steps:
1. Run with Docker by command `docker compose up --build`
2. 
- **Install client Dependencies** in `catalog-list-client` folder, with next command `npm install`
- **Install server Dependencies** in `catalog-list-server` folder, with next command `npm install`

## Run the Application
- **Start the server with** `npm start` in `catalog-list-server` folder 
- **Start the server with** `npm run start:dev` in `catalog-list-server` folder *for develop
- **Start the client with** `npm start` in `catalog-list-client` folder

# API Endpoints

## Catalogs
**GET /api/catalogs**: Retrieve a list of catalogs
**POST /api/catalogs**: Add a new catalog.
**PUT /api/catalogs/:id**: Update an existing catalog.
**DELETE /api/catalogs/:id**: Delete a catalog.
**DELETE /api/catalogs**: Bulk delete catalogs.

## Indexing
**POST /api/catalogs/:id/index**: Start the indexing process for a specific catalog.
**GET /api/catalogs/:id/index-status**: Retrieve the status of the indexing process for a specific catalog.


# Indexing Process
The indexing process allows users to start indexing their catalogs either manually or automatically every 24 hours. The system tracks the status of each indexing process and provides