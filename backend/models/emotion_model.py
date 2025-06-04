
from transformers import pipeline

# Load sentiment/emotion classification pipeline (can use "j-hartmann/emotion-english-distilroberta-base" or similar)
#emotion_classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", return_all_scores=False)
emotion_classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=1
)

# Map model's emotions to our simplified categories
EMOTION_MAP = {
    "joy": "happy",
    "sadness": "sad",
    "anger": "angry",
    "fear": "anxious",
    "disgust": "angry",
    "surprise": "calm",
    "neutral": "calm",
    "love": "happy"
}

def predict_emotion(text):
    try:
        result = emotion_classifier(text)[0][0]
        label = result['label'].lower()
        print("Model result:", result)
        mapped_emotion = EMOTION_MAP.get(label, "calm")
        return mapped_emotion
    except Exception as e:
        print("Error in emotion classification:", e)
        return "calm"
