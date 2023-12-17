from PIL import ImageGrab
import numpy as np
import cv2
import win32api
import datetime
import pyaudio
import wave
import threading

# Get the screen width and height
screen_width = win32api.GetSystemMetrics(0)
screen_height = win32api.GetSystemMetrics(1)

print(f"Screen Width: {screen_width}")
print(f"Screen Height: {screen_height}")

# Video recording setup
SIH = cv2.VideoWriter_fourcc(*'mp4v')
ts = datetime.datetime.now().strftime('%d-%m-%Y')
video_filename = f'{ts}.mp4'
video_capture = cv2.VideoWriter(video_filename, SIH, 20.0, (screen_width, screen_height))


# Audio recording setup
def record_audio(filename):
    CHUNK = 1024
    FORMAT = pyaudio.paInt16
    CHANNELS = 1
    RATE = 44100

    p = pyaudio.PyAudio()

    stream = p.open(format=FORMAT,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)

    frames = []

    while recording_flag:
        data = stream.read(CHUNK)
        frames.append(data)

    stream.stop_stream()
    stream.close()
    p.terminate()

    wf = wave.open(filename, 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(p.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(b''.join(frames))
    wf.close()


audio_filename = f'{ts}.wav'
recording_flag = False

while True:
    img = ImageGrab.grab(bbox=(0, 0, screen_width, screen_height))
    img_np = np.array(img)
    img_np = cv2.cvtColor(img_np, cv2.COLOR_BGR2RGB)
    video_capture.write(img_np)

    key = cv2.waitKey(10)
    if key == ord('q'):
        break
    elif key == ord('k'):
        recording_flag = True
        audio_thread = threading.Thread(target=record_audio, args=(audio_filename,))
        audio_thread.start()
    elif key == ord('s'):
        recording_flag = False

# Release video writer and close OpenCV windows
video_capture.release()
cv2.destroyAllWindows()
