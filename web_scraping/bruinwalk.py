import requests
from bs4 import BeautifulSoup
from urllib.parse import urlencode

base_url = 'https://www.bruinwalk.com/search/'


print('encoded search url')

# course_code = 'COM SCI 31'
# url = 'https://www.bruinwalk.com/search/?q=COM+SCI+31'

import json
import time

data = {}
with open('courses.json', 'r') as f:
    data = json.load(f)

for course in data:
    search_query = course['code'] # course.code
    query_params = {'q': search_query}

    encoded_params = urlencode(query_params)

    url = f'{base_url}?{encoded_params}'

    time.sleep(2)

    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    

    result_cards = soup.select('div.result-card')

    profs = []

    for result_card in result_cards:
        class_id_div = result_card.find('div', class_='class-id')

        text = class_id_div.get_text(strip=True)
        prof = {}
        if text == search_query:
            b_tag = result_card.find('b', class_='rating')
            print("found" , text, 'rating', b_tag.get_text(strip=True))

            prof_divs = result_card.find_all('div', class_='prof-info')

            for prof_div in prof_divs:
                # print("prof div", prof_div)
                a___S = prof_div.find_all('a')
                prof_div_a = prof_div.find('a', class_='name')
                if prof_div_a:
                    prof_name = prof_div_a.find('b').text
                    print('prof name', prof_name)
                    prof_div_span = prof_div.find('span', class_='rating')
                    prof_rating = prof_div_span.find('b').text
                    prof_rating = prof_rating.replace("\n", "").replace(" ", "")
                    print('prof rating', prof_rating)
                    prof['name'] = prof_name
                    if prof_rating != 'N/A':
                        prof['rating'] = float(prof_rating)
                    else:
                        prof['rating'] = 0
                    profs.append(prof)
    
    course['profs'] = profs

with open('./courses_with_profs.json', 'w') as f:
    json.dump(data, f)
