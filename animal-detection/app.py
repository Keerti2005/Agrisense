import cv2
import numpy as np

net = cv2.dnn.readNet("yolov3.weights", "yolov3.cfg")

with open("coco.names", "r") as f:
    classes = [line.strip() for line in f.readlines()]

colors = [(0, 255, 0), (255, 0, 0), (0, 0, 255), (0, 255, 255), (255, 0, 255), (255, 255, 0)]

def detect_objects(frame):
    height, width = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(frame, 1/255.0, (416, 416), swapRB=True, crop=False)
    net.setInput(blob)
    layer_names = net.getUnconnectedOutLayersNames()
    outputs = net.forward(layer_names)

    boxes = []
    confidences = []
    class_ids = []

    for output in outputs:
        for detection in output:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]

            if confidence > 0.5:
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)

                x = int(center_x - w / 2)
                y = int(center_y - h / 2)

                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)

    indices = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
    color_index = 0

    if len(indices) > 0:
        for i in indices.flatten():
            x, y, w, h = boxes[i]
            confidence = confidences[i]
            class_id = class_ids[i]

            color = colors[color_index % len(colors)]
            cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
            cv2.putText(frame, f'{classes[class_id]}: {confidence:.2f}', (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
            color_index += 1

    return frame

cam = cv2.VideoCapture(0)
cv2.namedWindow("Object Detection")

while True:
    ret, frame = cam.read()
    if not ret:
        print("Issue reading frame")
        break

    annotated_frame = detect_objects(frame)

    cv2.imshow("Object Detection", annotated_frame)

    k = cv2.waitKey(1)
    if k % 256 == 27:  
        print("Escape hit, closing...")
        break

cam.release()
cv2.destroyAllWindows()