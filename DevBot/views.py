from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import render
import google.generativeai as genai
from django.conf import settings
import json

# Configure Gemini API
genai.configure(api_key=settings.GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')
chat = model.start_chat(history=[])

@csrf_exempt
def bot(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_message = data.get('message', '').strip()
            if not user_message:
                return JsonResponse({'reply': 'Empty message'}, status=400)

            response = chat.send_message(user_message)
            bot_reply = response.text
            return JsonResponse({'reply': bot_reply})
        except json.JSONDecodeError:
            return JsonResponse({'reply': 'Invalid JSON'}, status=400)

    return render(request, 'bot.html')
