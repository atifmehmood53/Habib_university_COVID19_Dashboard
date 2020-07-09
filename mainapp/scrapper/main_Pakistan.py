import requests
from bs4 import BeautifulSoup, SoupStrainer
from selenium import webdriver
from selenium.webdriver.support.ui import Select
import time
import datetime
import os


def Province_cumulative(sel_soup, data_time):
    dt = data_time.split()
    date = (dt[0]+' '+dt[1]).strip(',')
    time = dt[4]+dt[5]

    CSV_file = open("province-cumulative.csv", "w")
    CSV_file.write('Date,Time\n'+date+','+time+'\n')
    province_data = sel_soup.find(
        "div", attrs={"class": "lego-component cd-u7677pbc7b"}
    ).find_all("div")
    CSV_file.write(",Confirmed Cases,Active Cases,Deaths,Recoveries\n")
    for search in range(len(province_data)):

        if province_data[search].get_text() == "AJK":
            CSV_file.write(province_data[search].get_text() + ",")
            for coma in range(1, 5):
                if "," in province_data[search + coma].get_text():
                    num = province_data[search + coma].get_text().split(",")
                    num = num[0] + num[1]
                else:
                    num = province_data[search+coma].get_text()

            
                if coma == 4:
                    CSV_file.write(num + "\n")
                else:
                    CSV_file.write(num + ",")

        elif province_data[search].get_text() == "Balochistan":
            CSV_file.write(province_data[search].get_text() + ",")
            for coma in range(1, 5):
                if "," in province_data[search + coma].get_text():
                    num = province_data[search + coma].get_text().split(",")
                    num = num[0] + num[1]
                else:
                    num = province_data[search+coma].get_text()

            
                if coma == 4:
                    CSV_file.write(num + "\n")
                else:
                    CSV_file.write(num + ",")

        elif province_data[search].get_text() == "GB":
            CSV_file.write(province_data[search].get_text() + ",")
            for coma in range(1, 5):
                if "," in province_data[search + coma].get_text():
                    num = province_data[search + coma].get_text().split(",")
                    num = num[0] + num[1]
                else:
                    num = province_data[search+coma].get_text()

            
                if coma == 4:
                    CSV_file.write(num + "\n")
                else:
                    CSV_file.write(num + ",")

        elif province_data[search].get_text() == "Islamabad":
            CSV_file.write(province_data[search].get_text() + ",")
            for coma in range(1, 5):
                if "," in province_data[search + coma].get_text():
                    num = province_data[search + coma].get_text().split(",")
                    num = num[0] + num[1]
                else:
                    num = province_data[search+coma].get_text()

            
                if coma == 4:
                    CSV_file.write(num + "\n")
                else:
                    CSV_file.write(num + ",")

        elif province_data[search].get_text() == "KPK":
            CSV_file.write(province_data[search].get_text() + ",")
            for coma in range(1, 5):
                if "," in province_data[search + coma].get_text():
                    num = province_data[search + coma].get_text().split(",")
                    num = num[0] + num[1]
                else:
                    num = province_data[search+coma].get_text()

            
                if coma == 4:
                    CSV_file.write(num + "\n")
                else:
                    CSV_file.write(num + ",")

        elif province_data[search].get_text() == "Punjab":
            CSV_file.write(province_data[search].get_text() + ",")
            for coma in range(1, 5):
                if "," in province_data[search + coma].get_text():
                    num = province_data[search + coma].get_text().split(",")
                    num = num[0] + num[1]
                else:
                    num = province_data[search+coma].get_text()

            
                if coma == 4:
                    CSV_file.write(num + "\n")
                else:
                    CSV_file.write(num + ",")

        if province_data[search].get_text() == "Sindh":
            CSV_file.write(province_data[search].get_text() + ",")
            for coma in range(1, 5):
                if "," in province_data[search + coma].get_text():
                    num = province_data[search + coma].get_text().split(",")
                    num = num[0] + num[1]
                else:
                    num = province_data[search+coma].get_text()

            
                if coma == 4:
                    CSV_file.write(num + "\n")
                else:
                    CSV_file.write(num + ",")


    ##Daily new cases
def daily_cases(sel_soup, data_time):
    dt = data_time.split()
    date = (dt[0]+' '+dt[1]).strip(',')
    time = dt[4]+dt[5]

    CSV_new_cases = open(date+' daily-new-cases.csv', 'w')
    CSV_new_cases.write('Date,Time\n'+date+','+time+'\n')
    starting_date = datetime.date(2020, 3, 10)
    x = 0
    scale_count = 0

    daily_new_data = sel_soup.find(
    "div", attrs={"class": "lego-component cd-7f17q2y06b"}
).find_all("text")

    for new_cases in daily_new_data:
        new = new_cases.get_text()
        if ',' in new:
            new = new.split(',')
            new = new[0]+new[1]

        if new.isdigit():
            scale_count += 1
            if scale_count > 2:
                date_ = str(starting_date + datetime.timedelta(days = x)).split()[0]
                CSV_new_cases.write(date_+","+new+'\n')
                x += 1

def total_confirmed_Cases(sel_soup, data_time):
    dt = data_time.split()
    date = (dt[0]+' '+dt[1]).strip(',')
    time = dt[4]+dt[5]
    x = 0
    scale_count = 0
    starting_date = starting_date = datetime.date(2020, 3, 10)
    CSV_confirmed = open(str(date)+' confirmed-total-cases.csv', 'w')
    CSV_confirmed.write('Date,Time\n'+date+','+time+'\n')

    total_confirmed = sel_soup.find(
        "div", attrs={"class": "lego-component cd-vlnpan0m7b"}
    ).find_all("text")

    for day in total_confirmed:
        num = day.get_text()
        if ',' in num:
                num = num.split(',')
                num = num[0]+num[1]
        
        if num.isdigit():
            scale_count += 1
            if scale_count > 1:
                date_ = str(starting_date + datetime.timedelta(days = x)).split()[0]
                CSV_confirmed.write(date_+","+num+'\n')
                x += 1

def main():
    os.chdir('./')
    path = os.getcwd()
    driver = webdriver.Chrome(f"{os.getcwd()}/mainapp/scrapper/chromedriver1.exe")
    url = "https://datastudio.google.com/embed/reporting/1PLVi5amcc_R5Gh928gTE8-8r8-fLXJQF/page/R24IB"

    driver.get(url)
    time.sleep(25)

    # changing default date to 10th March (line 192-200)
    date_dropdown = driver.find_element_by_xpath('//*[@id="body"]/div/div/div[1]/div[2]/div/div[1]/div[1]/div[1]/div/lego-report/lego-canvas-container/div/file-drop-zone/span/content-section/canvas-component[21]/div/div/div/div/ga-date-range-picker/lego-date-duration-control/control-layout-wrapper/button/div[1]/span[2]')
    date_dropdown.click()
    time.sleep(1)
    driver.execute_script("document.getElementsByClassName('btn btn-default btn-sm pull-left uib-left')[0].click();")
    time.sleep(1)
    driver.execute_script("document.getElementsByClassName('btn btn-default btn-sm')[12].click();")
    time.sleep(1)
    driver.execute_script("document.getElementsByClassName('md-button md-raised')[0].click();")
    time.sleep(15)

    html = driver.execute_script("return document.documentElement.outerHTML")
    driver.close()

    sel_soup = BeautifulSoup(
        html,
        "lxml",
        parse_only=SoupStrainer("content-section", attrs={"class": "ng-scope"}),
    )

    file_name = sel_soup.find(
            "div", attrs={"class": "lego-component small-layout cd-a2mtrbe86b"}
        ).find("div", attrs= {'class':'row'})

    file_name = file_name.get_text()

    Province_cumulative(sel_soup, file_name)
    daily_cases(sel_soup, file_name)
    total_confirmed_Cases(sel_soup, file_name)
    print("Done")
    return file_name

#main()