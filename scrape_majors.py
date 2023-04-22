import requests
from bs4 import BeautifulSoup
import re
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://catalog.registrar.ucla.edu/browse/College%20and%20Schools/HenrySamueliSchoolofEngineeringandAppliedScience")
wait = WebDriverWait(driver, 10)
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.unit-title')))
           
# url = "https://catalog.registrar.ucla.edu/browse/College%20and%20Schools/HenrySamueliSchoolofEngineeringandAppliedScience"
# response = requests.get(url)
soup = BeautifulSoup(driver.page_source, 'html.parser')
major_names = []
major_anchors = soup.select('div[class*="unit-title"]') #soup.find_all("div")# "div[class*=unit-title]")

# my_divs = driver.execute_script("return document.querySelectorAll('.unit-title')")

for major in major_anchors:
    if 'class' in major.attrs:
        print(major.attrs['class'])
        if 'unit-title' in major.attrs['class']:
            print("found", major)

for anchor in major_anchors:
    major_name = anchor.text.strip()
    if major_name is not None:
        major_names.append(major_name)
 
# look for href with /course, click them, go the course page 
if major_names:
    for name in major_names:
        print(name)
else:
    print('Could not find the element that contains all the majors.')





