# server.py

import http.server
import socketserver

# Set the directory to serve files from
directory = "D:\Osmium-915\whiteboard\tldraw\tldrawdemo\public\data"

# Configure the server to serve files from the specified directory
handler = http.server.SimpleHTTPRequestHandler

# Create the server
with socketserver.TCPServer(("", 8000), handler) as httpd:
    print("Server running on port 8000...")
    # Start the server
    httpd.serve_forever()
