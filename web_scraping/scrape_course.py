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
           
soup = BeautifulSoup(driver.page_source, 'html.parser')
course_names = []

course_main_heading_divs = soup.find_all('div', class_=re.compile(r'\bStructureItem\b'))

courses = []

for div in course_main_heading_divs:

    heading_contianer_div = div.find('div', class_=re.compile(r'\bItemHeading\b'))
    heading = heading_contianer_div.find('div', class_=re.compile(r'\bItemHeadingContent\b')).find('strong').text
    print(heading)

    if heading == 'The Major':
        course_anchors = div.find_all('a')
        
        for course_anchor in course_anchors:
            course = {}
            # Open the link in a new tab
            url = course_anchor.get('href')
            driver.execute_script("window.open('" + url + "', '_blank')")

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
