import requests
from bs4 import BeautifulSoup, SoupStrainer
from selenium import webdriver
import time
import datetime
import os

    ##Daily new cases
def daily_cases(sel_soup, data_time, province):
    dt = data_time.split()
    date = (dt[0]+' '+dt[1]).strip(',')
    time = dt[4]+dt[5]

    CSV_new_cases = open('data/' + province + date+' daily-new-cases.csv', 'w')
    CSV_new_cases.write('Date,Time\n'+date+','+time+'\n')
    starting_date = datetime.date(2020, 3, 10)
    x = 0
    scale_count = 0

    daily_new_data = sel_soup.find(
    "div", attrs={"class": "lego-component cd-vrl6htsz6b"}
).find_all("text")

    for new_cases in daily_new_data:
        new = new_cases.get_text()
        if ',' in new:
            new = new.split(',')
            new = new[0]+new[1]

        if new.isdigit():
            scale_count += 1
            if scale_count > 6:
                date_ = str(starting_date + datetime.timedelta(days = x)).split()[0]
                CSV_new_cases.write(date_+","+new+'\n')
                x += 1

def total_confirmed_Cases(sel_soup, data_time, province):
    dt = data_time.split()
    date = (dt[0]+' '+dt[1]).strip(',')
    time = dt[4]+dt[5]
    x = 0
    scale_count = 0
    starting_date = starting_date = datetime.date(2020, 3, 10)
    CSV_confirmed = open('data/' + province + str(date)+' confirmed-total-cases.csv', 'w')
    CSV_confirmed.write('Date,Time\n'+date+','+time+'\n')

    total_confirmed = sel_soup.find(
        "div", attrs={"class": "lego-component cd-1rl6htsz6b"}
    ).find_all("text")
    print(total_confirmed)

    for day in total_confirmed:
        #print(day)
        num = day.get_text()
        if ',' in num:
            num = num.split(',')
            num = num[0]+num[1]
            print("date" + num)
        
        if num.isdigit():
            print("digit" + num)
            scale_count += 1
            if scale_count > 0:
                date_ = str(starting_date + datetime.timedelta(days = x)).split()[0]
                CSV_confirmed.write(date_+","+num+'\n')
                x += 1




def scraping(url, province):
#url = "https://datastudio.google.com/embed/u/0/reporting/1PLVi5amcc_R5Gh928gTE8-8r8-fLXJQF/page/kfbJB"
    os.chdir('./')
    path = os.getcwd()
    driver = webdriver.Chrome(f"{os.getcwd()}/mainapp/scrapper/chromedriver1.exe")
    driver.get(url)
    time.sleep(25)

    # changing default date to 10th March (line 192-200)
    date_dropdown = driver.find_element_by_xpath('//*[@id="body"]/div/div/div/div[2]/div/div/div/div/div/lego-report/lego-canvas-container/div/file-drop-zone/span/content-section/canvas-component[29]/div/div/div/div/ga-date-range-picker/lego-date-duration-control/control-layout-wrapper/button/div[1]/span[2]')
    date_dropdown.click()
    time.sleep(1)
    driver.execute_script("document.getElementsByClassName('btn btn-default btn-sm pull-left uib-left')[0].click();")
    time.sleep(1)
    driver.execute_script("document.getElementsByClassName('btn btn-default btn-sm pull-left uib-left')[0].click();")
    time.sleep(1)
    driver.execute_script("document.getElementsByClassName('btn btn-default btn-sm')[12].click();")
    time.sleep(1)
    driver.execute_script("document.getElementsByClassName('md-button md-raised')[0].click();")
    time.sleep(10)

    html = driver.execute_script("return document.documentElement.outerHTML")
    driver.close()

    sel_soup = BeautifulSoup(
        html,
        "lxml",
        parse_only=SoupStrainer("content-section", attrs={"class": "ng-scope"}),
    )

    file_name = sel_soup.find(
            "div", attrs={"class": "lego-component small-layout cd-zkzthg4z6b"}
        ).find("div", attrs= {'class':'row'})

    file_name = file_name.get_text()

    #print(sel_soup)

    #Province_cumulative(sel_soup, file_name)
    daily_cases(sel_soup, file_name, province)
    total_confirmed_Cases(sel_soup, file_name, province)
    print("Done")



##scraping("https://datastudio.google.com/embed/u/0/reporting/1PLVi5amcc_R5Gh928gTE8-8r8-fLXJQF/page/kfbJB", "Islamabad")
##scraping("https://datastudio.google.com/embed/u/0/reporting/1PLVi5amcc_R5Gh928gTE8-8r8-fLXJQF/page/0dbJB", "Sindh")
##scraping("https://datastudio.google.com/embed/u/0/reporting/1PLVi5amcc_R5Gh928gTE8-8r8-fLXJQF/page/tebJB", "Punjab")
##scraping("https://datastudio.google.com/embed/u/0/reporting/1PLVi5amcc_R5Gh928gTE8-8r8-fLXJQF/page/GgbJB", "KPK")

def main_balochistan():
    scraping("https://datastudio.google.com/embed/u/0/reporting/1PLVi5amcc_R5Gh928gTE8-8r8-fLXJQF/page/1gbJB", "Balochistan")


##scraping("https://datastudio.google.com/embed/u/0/reporting/1PLVi5amcc_R5Gh928gTE8-8r8-fLXJQF/page/khbJB", "GB")
##scraping("https://datastudio.google.com/embed/u/0/reporting/1PLVi5amcc_R5Gh928gTE8-8r8-fLXJQF/page/DibJB", "AJK")
##



