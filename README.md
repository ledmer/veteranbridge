# 🪖 Veteran Bridge – Hackathon Application

**LLaMA-powered Veteran Wellness and Support Matcher**

Veteran Bridge is an AI-driven system that intelligently connects veterans to personalized support groups, peer mentors, and community services based on individual wellness profiles. Using a token-based system and similarity matching, this project ensures veterans are grouped dynamically and receive the most relevant support possible.

---

## 🔧 Key Features

### 🧠 LLaMA-Powered Dynamic Grouping
- **User Tokens Generator**: Encodes veteran profiles into structured tokens.
- **Group Tokens Generator**: Represents the makeup and capacity of groups.
- **Similarity & Compatibility Matching**: Aligns veterans with compatible groups and peers based on shared experiences and support capabilities.

### 🤝 Support Taker ⇄ Giver Matching
- Facilitates matching between veterans seeking help and those able to provide peer support.
- Encourages safe, reciprocal group dynamics.

### 📩 Personalized Veteran Group Recommendations
- Custom-tailored group and service suggestions.
- Outreach messages that reflect the veteran’s status and interests.

### 🔁 Dynamic Weights & Feedback Loop
- Priority of tags adjusts based on real-time feedback and ongoing assessments.

```python
self.priority_weights = {
    'Suicidal risk': 10,
    'Crisis risk': 10,
    'Homeless': 9,
    'Substance use': 8,
    'PTSD': 7,
    'Unemployed': 7,
    'Recently transitioned': 6,
    'Depression': 6,
    'Anxiety': 5,
    'Disabled': 5,
    'Job training': 4,
    'Seeking therapy': 4
}
