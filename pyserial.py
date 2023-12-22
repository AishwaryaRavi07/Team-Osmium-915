import serial
import time
from PIL import ImageGrab
import webbrowser
import os


arduino_port = 'COM4'
baud_rate = 9600

# Open the serial connection
ser = serial.Serial(arduino_port, baud_rate, timeout=1)

def take_screenshot():
            # Capture the entire screen (Windows only)
        screenshot = ImageGrab.grab()
        screenshot.save("screenshot_entire_screen.png")

        # Capture a specific window by coordinates
        x1, y1, x2, y2 = 23,34,67,47  # Replace with actual coordinates
        screenshot = ImageGrab.grab(bbox=(x1, y1, x2, y2))
        screenshot.save("screenshot_window.png")


def open_browser():
     # Specify the URL you want to open in a new Chrome tab
    url = "https://www.google.com"

    # Open the URL in a new tab using the default web browser
    webbrowser.open_new(url)

def open_calculator():
     os.startfile("calc.exe")
     
try:
    while True:
        # Read a line from the Arduino
        line = ser.readline().decode('utf-8').strip()
        print(line)

        if line:
            # Extract the state of ledPin from the received line
            led_state = str(line)

            # Print messages based on ledPin state
            if line == 'LED1 IS GLOWING':
                print("Hello Osmium")
                take_screenshot()
            elif line == "LED2 IS GLOWING":
                 print("Osmium is here")
                 open_browser()
            elif line == 'LED3 IS GLOWING':
                print("Bye Osmium")
                open_calculator()

except KeyboardInterrupt:
    
    ser.close()
    print("Serial connection closed.")
