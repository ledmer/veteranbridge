
def get_action_for_emotion(emotion):
    actions = {
        "angry": "Offer breathing exercises and route to human support.",
        "sad": "Suggest VA mental health resources.",
        "anxious": "Provide calming techniques and peer group access.",
        "happy": "Log state and offer journaling prompt.",
        "hopeless": "Trigger crisis line intervention protocol.",
        "calm": "Encourage wellness goal setting."
    }
    return actions.get(emotion, "Monitor and encourage continued engagement.")
