const faceapi = require('face-api.js');
const canvas = require('canvas');
const path = require('path');
const fs = require('fs');

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const loadModels = async () => {
    const modelPath = path.join(__dirname, 'models');
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
};

const recognizeFace = async (imagePath) => {
    await loadModels();
    const image = await canvas.loadImage(imagePath);
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();

    return detections;
};

module.exports = { recognizeFace };