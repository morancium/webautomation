import requests
from bs4 import BeautifulSoup
import bs4
import json
url = "https://nightwatchjs.org/guide/writing-tests/introduction.html"
base="https://nightwatchjs.org"
response = requests.get(url)
response.raise_for_status()  # Check if the request 
urls=[]
title=[]

soup = BeautifulSoup(response.content, "lxml")
tags= soup.find_all("div",id="writing-tests-collapse")
# print(tags[0])
for i, m in enumerate(tags[0].find_all("a",href=True)):
        # print(m.text)
        title.append(m.text)
        urls.append(base+m["href"])
# print(urls)
# print(title)

Meta_texts=[]
Meta_json=[]
for i, url in enumerate(urls):
    print(url)
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "lxml")
    texts=soup.find_all("div",class_="page-content")
    for x in texts[0]:
        if(isinstance(x, bs4.element.Tag)):
            # print(x.css.select("div , .sample-test"))
            # print(x)
            # break
            if (len(x.css.select("div.sample-test"))!=0):
                for xx in (x.css.select("div.sample-test")):
                    print(xx.text)
    break

json_data = json.dumps(Meta_json, indent=4)
with open('scraping\write_test.json', 'w') as outfile:
    json.dump(Meta_json, outfile)
