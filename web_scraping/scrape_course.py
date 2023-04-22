# NOW PRINT COURSES FOR CS
import requests
from bs4 import BeautifulSoup
import re
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import json

driver = webdriver.Chrome()
driver.get("https://catalog.registrar.ucla.edu/major/2022/ComputerScienceBS")
wait = WebDriverWait(driver, 10)
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.relationshipName')))
           
# url = "https://catalog.registrar.ucla.edu/browse/College%20and%20Schools/HenrySamueliSchoolofEngineeringandAppliedScience"
# response = requests.get(url)
soup = BeautifulSoup(driver.page_source, 'html.parser')
course_names = []

course_main_heading_divs = soup.find_all('div', class_=re.compile(r'\bStructureItem\b'))

courses = []

for div in course_main_heading_divs:

    heading_contianer_div = div.find('div', class_=re.compile(r'\bItemHeading\b'))
    heading = heading_contianer_div.find('div', class_=re.compile(r'\bItemHeadingContent\b')).find('strong').text
    print(heading)

    if heading == 'The Major':
        course_anchors = div.find_all('a') #div.find_all('a', class_=re.compile(r'\bRelationshipsListItem\b'))
        
        for course_anchor in course_anchors:
            course = {}
            # Open the link in a new tab
            # print(course_anchor)
            url = course_anchor.get('href')
            driver.execute_script("window.open('" + url + "', '_blank')")
            # open a new link
            # course_anchor.send_keys(Keys.CONTROL + Keys.RETURN)

            # Wait for the new tab to load and switch to it
            driver.switch_to.window(driver.window_handles[-1])

            # Wait for the page to fully load (you can adjust the sleep time as needed)
            time.sleep(2)

            course_html = driver.page_source
            course_soup = BeautifulSoup(course_html, 'html.parser')

            h5s = course_soup.find_all('h5', class_='introDetails__sub_heading')
            course_code = h5s[0].text
            units = int(h5s[1].text.split()[0])

            # difficulty = int(course_code.split()[2])
            division = 'upper'
            try:
                pass
                difficulty = int(course_code.split()[2])
                if difficulty >= 100:
                    division = 'upper'
                else:
                    division = 'lower'
            except:
                pass

            description_div = course_soup.find('div', id='Description')
            description = course_soup.find('p').text


            course['code'] = course_code
            course['division'] = 'upper'
            course['description'] = description
            course['units'] = units

            courses.append(course)

            driver.close()
            driver.switch_to.window(driver.window_handles[0])
            
driver.close()

print(courses)

with open('./courses.json', 'w') as f:
    json.dump(courses, f)

# course_anchors = soup.find_all('span', class_='relationshipName') #soup.find_all("div")# "div[class*=unit-title]")

# my_divs = driver.execute_script("return document.querySelectorAll('.unit-title')")

# for course in course_anchors:
#     if 'class' in course.attrs:
#         print(course.attrs['class'])
#         if '.relationshipName' in course.attrs['class']:
#             print("found", course)

# for anchor in course_anchors:
#     course_name = anchor.text.strip()
#     if course_name is not None:
#         course_names.append(course_name)
 
# # look for href with /course, click them, go the course page 
# if course_names:
#     for name in course_names:
#         print(name)
# else:
#     print('Could not find the element that contains all the courses.')