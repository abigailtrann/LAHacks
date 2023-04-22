# NOW PRINT COURSES FOR CS

print('NOW PRINTING COURSES FOR CS MAJOR')

import requests
from bs4 import BeautifulSoup
import re
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://catalog.registrar.ucla.edu/major/2022/ComputerScienceBS")
wait = WebDriverWait(driver, 10)
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.relationshipName')))
           
# url = "https://catalog.registrar.ucla.edu/browse/College%20and%20Schools/HenrySamueliSchoolofEngineeringandAppliedScience"
# response = requests.get(url)
soup = BeautifulSoup(driver.page_source, 'html.parser')
course_names = []
course_anchors = soup.find_all('span', class_='relationshipName') #soup.find_all("div")# "div[class*=unit-title]")

# my_divs = driver.execute_script("return document.querySelectorAll('.unit-title')")

for course in course_anchors:
    if 'class' in course.attrs:
        print(course.attrs['class'])
        if '.relationshipName' in course.attrs['class']:
            print("found", course)

for anchor in course_anchors:
    course_name = anchor.text.strip()
    if course_name is not None:
        course_names.append(course_name)
 
# look for href with /course, click them, go the course page 
if course_names:
    for name in course_names:
        print(name)
else:
    print('Could not find the element that contains all the courses.')