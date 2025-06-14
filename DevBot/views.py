from django.shortcuts import render

# Create your views here.
def bot(request):
    """
    Render the bot page.
    """
    return render(request, 'bot.html')