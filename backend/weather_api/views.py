import requests
from django.http import JsonResponse
from datetime import datetime

def get_weather(request):
    city = request.GET.get('city', 'Lahore')  # default city
    api_key = 'f3a57ad9934d55761c60e11df99c1a11'  # your working API key
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"

    response = requests.get(url)
    
    try:
        data = response.json()
        if response.status_code == 200 and 'main' in data:
            result = {
                'city': data['name'],
                'temperature': data['main']['temp'],
                'description': data['weather'][0]['description'],
                'datetime': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
        else:
            result = {'error': data.get('message', 'City not found or API failed')}
    except Exception as e:
        result = {'error': str(e)}

    return JsonResponse(result)
